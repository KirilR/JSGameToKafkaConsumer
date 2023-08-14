const http = require('http');
const kafka = require('./kafkaProducer');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:8080', // Replace this with the actual URL of the piggame application
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  allowedHeaders: 'X-Requested-With,content-type',
};

const handleRequest = (req, res) => {
  if (req.method === 'POST' && req.url === '/trigger-kafka') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { topic, message } = JSON.parse(body);

        if (!topic || !message) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Invalid request body');
        }

        kafka.sendKafkaMessage(topic, message)
          .then(() => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Kafka message sent successfully');
          })
          .catch((error) => {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Failed to send Kafka message: ' + error);
          });
      } catch (error) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Invalid request body');
      }
    });
  } else if (req.method === 'GET' && req.url === '/test') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello from the server!');
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Game server response');
  }
};


const server1 = http.createServer((req, res) => {
  cors(corsOptions)(req, res, () => {
    handleRequest(req, res);
  });
});

server1.listen(3000, () => {
  console.log('Server 1 is running on port 3000');
});

const server2 = http.createServer((req, res) => {
  cors(corsOptions)(req, res, () => {
    handleRequest(req, res);
  });
});

server2.listen(4000, () => {
  console.log('Server 2 is running on port 4000');
});