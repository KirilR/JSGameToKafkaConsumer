const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: '192.168.33.11:9092' });
//IP of the internal network of the othe VM where the consumer will receive the messages
const producer = new kafka.Producer(client);

const sendKafkaMessage = (topic, message) => {
  return new Promise((resolve, reject) => {
    const payloads = [
      {
        topic: topic,
        messages: message,
      },
    ];

    producer.send(payloads, (error, data) => {
      if (error) {
        console.error('Failed to send Kafka message:', error);
        reject(error);
      } else {
        console.log('Kafka message sent successfully:', data);
        resolve(data);
      }
    });
  });
};

module.exports = {
  sendKafkaMessage,
};
