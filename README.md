# JSGameToKafkaConsumer
Simple partially front end example of how to make you JS app to send messages via Kafka to Kafka consumer, the project is done with #Vagrant in order the environment to be set up, #NodeJS, #Kafka, etc
Firstly the Vagrat file is started in order to set the initial environemnt, afterwards in orde the nginx to set start working the following was made:
yum update was not working so the repos folders were updated
14  sudo cat /etc/yum.repos.d/CentOS-AppStream.repo

cd /etc/yum.repos.d
   20  ls
   21  cd CentOS-Linux-AppStream.repo
   22  sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
   23  whoami
   24  sudo sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
   25  sudo sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*
   26  yum clean all
   27  yum update -y

setting up the nginx with our project/js game 

 38  systemctl nginx status
   39  sudo yum update -y
   40  sudo yum install nginx -y
   41  sudo systemctl start nginx
   42  sudo systemctl status nginx
   43  cd /vagrant
   44  ls
   45  locate /var/www/html
   46  yum install mlocate
   47  sudo yum install mlocate
   48  updatedb
   49  sudo updatedb
decided to move the whole project folder and the js game into /var/www/html which actually did not existed.
nginx will later need a bit of settings to be able to host from there:

 53  cd /var
   54  ls
   55  mkdir www
   56  sudo mkdir www
   57  ls
   58  cd www
   59  ls
   60  sudo mkdir html
   61  ls
   62  cd html
   63  pwd
   64  sudo mkdir piggame
   65  ls
   66  cd piggame
   67  ls
   68  pwd
   69  cd /vagrant
Setting the configuration to use another folder - not the one usualy used by nginx, setting up also some owner/rights issues:

79  sudo nano /etc/nginx/nginx.conf
   80  sudo vi /etc/nginx/nginx.conf
   81  sudo systemctl restart nginx
   82  sudo chown -R nginx:nginx /var/www/html/piggame/starter
   83  sudo systemctl restart nginx
   84  cd /var/www/html/piggame
   85  ls -la
   86  cat sudo chown -R nginx:nginx /var/www/html/piggame/starter

setting up also the so called context so that the linux itself to make the /var/www/html folder available for hosting.

 87  cat /etc/nginx/nginx.conf
   88  ls -la
   89  pwd
   90  ls -la /var/www/html/piggame/starter
   91  sudo tail -f /var/log/nginx/error.log
   92  ls -la /var/www/html
   93  ls -la /var/www
   94  getenforce
   95  ls -Z /var/www/html
   96  sudo chcon -Rv --type=httpd_sys_content_t /var/www/html/piggame
   97  ls -Z /var/www/html![image](https://github.com/KirilR/JSGameToKafkaConsumer/assets/7829757/bc1c35df-f091-4893-9dcd-a27654666481)

Installing node.js/kafka-node (kafka-js cousd also be used), python, etc for using the node.js capabilities and later set up of the kafka producer

  102  sudo npm install kafka-node
  103  sudo dnf install -y nodejs
  104  npm install kafka-node
  105  sudo npm install kafka-node
  106  sudo chmod -R 777 /var/www/html/piggame/starter
  107  sudo dnf install -y python3
  108  sudo npm install kafka-node
  109  ls
  110  cd node_modules
  111  ls
  112  cd ..
  113  ls -la
  114  sudo chown -R vagrant:vagrant /var/www/html/piggame/starter/node_modules![image](https://github.com/KirilR/JSGameToKafkaConsumer/assets/7829757/d2b08f8e-43c9-4949-9558-17ba597e85aa)

Installation of kafka-node
130  sudo npm install kafka-node![image](https://github.com/KirilR/JSGameToKafkaConsumer/assets/7829757/0e7cd97a-cbc9-4200-8857-dc3e10cd5aef)

Once we have nginx installed and set up the JS Piggame is running, we have the Kafka producer set up in the front end  - i.e in the game, that is NOT the best practise, but later the producer could be moved to teh backend and executed via node.js.
setting u and installing node js, setting up the API connection point which is going to be started with node.js
135  service nginx start
  136  sudo service nginx start
  137  service nginx status
  138  sudo jps
  139  sudo yum update
  140  sudo yum install java-1.8.0-openjdk-devel
  141  sudo jps
  142  cd /opt/kafka
  143  locate kafka
  144  cd /var/www/html/piggame/starter/
  145  ls
  146  cd  node_modules
  147  ls
  148  cd kafka-node
  149  ls
  150  pwd
  151  locate kafka-server-start.sh
  152  pwd
  153  locate script.js
  154  sudo vi /vagrant/starter/script.js
  155  service nginx restart
  156  sudo service nginx restart
![image](https://github.com/KirilR/JSGameToKafkaConsumer/assets/7829757/228ea6cb-1c47-4370-9a4c-724578975bd5)

SO, HOW DOES IT WORK,
the fornt end is making a POST request to port 4000 which is a HTTP server run by node.js on the VM1 - Web where the http server is listening on port 4000 and also on port 3000 for test purposes.
Once "taken" the POST request is proceeded from the node.js http server (see file server.js) and with the help of the additional custom module file kafkaProducer.js (which is actually NOT the producer it sned the kafka message to the cosnumer listening on the other side - the second VM - kafka VM2)
How do we start the HTTP server:
 204  sudo node server.js
![image](https://github.com/KirilR/JSGameToKafkaConsumer/assets/7829757/b4bde47c-0c5b-4b4d-8a62-dd37779537d2)
How does it look started:
<img width="481" alt="image" src="https://github.com/KirilR/JSGameToKafkaConsumer/assets/7829757/59dea339-3553-4516-9822-07f5e85e0d25">
How do we check whether the server is running fine from the VM1 - web: we are doing it from the windows host:

<img width="425" alt="image" src="https://github.com/KirilR/JSGameToKafkaConsumer/assets/7829757/88abcc91-7ea3-432a-8a43-da64998a61e9">
Also how does it look to check the node.js runnable server.js from the windows host:
<img width="324" alt="image" src="https://github.com/KirilR/JSGameToKafkaConsumer/assets/7829757/d1a3ffb2-25d4-431e-94ba-3b58e096b131">
The kafka messages sent from the front end :
<img width="1141" alt="image" src="https://github.com/KirilR/JSGameToKafkaConsumer/assets/7829757/fb4e9411-2c3d-4895-99e0-3c0fcf613357">

Keep in mind that all those functionalities work because have the communications via ports 3000 and 400 opened in the very beginning:
<img width="466" alt="image" src="https://github.com/KirilR/JSGameToKafkaConsumer/assets/7829757/28c3342a-c959-4da8-a4ab-ee0483ad1389">
ON THE vm2:
INSTALLATION OF KAFKA
1  sudo yum update -y
   12  wget https://downloads.apache.org/kafka/2.8.0/kafka_2.8.0.tgz
   13  sudo yum groupinstall "Development Tools"
   14  sudo wget https://downloads.apache.org/kafka/2.8.0/kafka_2.8.0.tgz
   15  sudo yum install wget
   16  sudo wget https://downloads.apache.org/kafka/2.8.0/kafka_2.8.0.tgz
   17  ping abv.bg
   18  sudo wget https://downloads.apache.org/kafka/3.5.0/kafka_3.5.0.tgz
   19  sudo wget https://downloads.apache.org/kafka/3.4.1/kafka_3.4.1.tgz
   20  sudo yum install java
   21  java -version
   22  wget https://archive.apache.org/dist/kafka/3.0.0/kafka_2.13-3.0.0.tgz
   23  wget https://archive.apache.org/dist/kafka/3.4.1/kafka_2.13-3.4.1.tgz
   24  sudo wget https://archive.apache.org/dist/kafka/3.4.1/kafka_2.13-3.4.1.tgz
   25  sudo tar -xzf kafka_2.13-3.4.1.tgz
   26  sudo mv kafka_2.13-3.4.1 /opt/kafka
   27  cd /opt/kafka
Setting up the server.properties where we will set up the kafka to listen on ur private network:192.168.33.11
 32  sudo vi config/server.properties
   33  sudo systemctl restart kafka
   34  sudo systemctl status kafka
   35  bin/kafka-server-start.sh config/server.properties
How the server.properties file looks like:
listeners=PLAINTEXT://192.168.33.11:9092
cat /opt/kafka/config/server.properties

Zookeeper instalation - kafka could not work without zookeeper![image](https://github.com/KirilR/JSGameToKafkaConsumer/assets/7829757/8f719a4f-4b38-40de-acbf-2d691affb6b4)
Zookeeper instalation - kafka could not work without zookeeper
71  sudo wget https://dlcdn.apache.org/zookeeper/zookeeper-3.7.1/apache-zookeeper-3.7.1-bin.tar.gz
   72  tar -xzf apache-zookeeper-3.7.0-bin.tar.gz
   73  ls
   74  tar -xzf apache-zookeeper-3.7.1-bin.tar.gz
   75  sudo tar -xzf apache-zookeeper-3.7.1-bin.tar.gz
   76  ls
   77  sudo rm apache-zookeeper-3.7.1-bin
   78  sudo rm -r apache-zookeeper-3.7.1-bin
   79  ls
   80  sudo tar -xzf apache-zookeeper-3.7.1-bin.tar.gz
   81  ls
   82  cd zookeeper/apache-zookeeper-3.7.1-bin/conf/
   83  cd apache-zookeeper-3.7.1-bin
   84  ls
   85  cd conf
   86  ls
   87  cp zoo_sample.cfg zoo.cfg
   88  ls
   89  ls -la

![image](https://github.com/KirilR/JSGameToKafkaConsumer/assets/7829757/e1d71634-e097-48fe-abaa-fd977299e294)
See the zoo.cfg configuration file.
STARTING THE KAFKA AND ZOOKEEPER:

C:\Users\********\Documents\Kiro\KiroNewKafkaTest>vagrant ssh kafka
Last login: Thu Jul 20 18:12:05 2023 from 10.0.2.2
[vagrant@kafka-elasticsearch ~]$ sudo /opt/zookeeper/apache-zookeeper-3.7.1-bin/bin/zkServer.sh start
/bin/java
ZooKeeper JMX enabled by default
Using config: /opt/zookeeper/apache-zookeeper-3.7.1-bin/bin/../conf/zoo.cfg
Starting zookeeper ... STARTED
[vagrant@kafka-elasticsearch ~]$ sudo nohup /opt/kafka/bin/kafka-server-start.sh /opt/kafka/config/server.properties > /dev/null 2>&1 &
[vagrant@kafka-elasticsearch ~]$ sudo /opt/kafka/bin/kafka-console-consumer.sh --bootstrap-server 192.168.33.11:9092 --t
opic my_topic --group my_consumer_group
[vagrant@kafka-elasticsearch ~]$ sudo /opt/kafka/bin/kafka-topics.sh --bootstrap-server 192.168.33.11:9092 --list
__consumer_offsets
my_topic![image](https://github.com/KirilR/JSGameToKafkaConsumer/assets/7829757/a73906d9-3a6d-412b-bd38-a0fe9a63a3f9)
<img width="797" alt="image" src="https://github.com/KirilR/JSGameToKafkaConsumer/assets/7829757/7d69d63e-bbb8-45e3-b031-f95ecb0afee2">

Creating the first topic "my_topic"
8  sudo ./kafka-topics.sh --bootstrap-server 192.168.33.11:9092 --create --topic my_topic --partitions 1 --replication-factor 1![image](https://github.com/KirilR/JSGameToKafkaConsumer/assets/7829757/5ed67367-14e2-4081-8e21-00c1cde9b7b1)
''
NOW ONCE WE HAVE THE KAFKA SERVER AND ZOOKEEPER RUNNING AND ALSO A TOPIC "RUNNING" WE COULD EXPECT THAT A KAFKA MESSAGES COULD BE PROBABLY TRANSFERRED BETWEEN BOTH VMS THROUGH THE ALREADY CREATED TOPIC
SIMPLE EXPLANATION FOR THE RELATION BETWEEN KAFKA AND ZOOKKEEPER AND WHY ARE THEY BOTH NEEDED:



{Kafka and ZooKeeper are two distinct components, each with its own role, in a Kafka cluster. They work together to provide a reliable and distributed stream processing platform.

ZooKeeper:

ZooKeeper is a centralized service that is used to manage and coordinate distributed systems. It provides essential functionalities like configuration management, distributed synchronization, leader election, and maintaining metadata about the cluster.
Kafka uses ZooKeeper for various tasks, such as maintaining a list of available brokers, leader election for partitions, and managing the state of consumers.
In a Kafka cluster, ZooKeeper helps to ensure the availability, reliability, and consistency of the overall system.
Kafka:

Kafka is a distributed streaming platform that allows you to publish and subscribe to streams of records. It is designed for high-throughput, fault-tolerant, and scalable data streaming.
Kafka maintains topics, which are used to categorize and store records. Each topic can have multiple partitions, and each partition is replicated across multiple Kafka brokers for fault tolerance.
Kafka brokers handle the storage, distribution, and replication of records.
Producers publish records to Kafka topics, and consumers subscribe to topics to read records.}
Check test connection between VM1 WEB and VM2 - Kafka through topic "my_topic":

 214  curl -X POST -H "Content-Type: application/json" -d '{"topic": "my_topic", "message": "Hello, Kafka!"}' http://localhost:3000/trigger-kafka![image](https://github.com/KirilR/JSGameToKafkaConsumer/assets/7829757/2bcecd12-2392-4232-8829-78569de0e6d0)
 That works because we have the server.js running and using the kafkaProducer.js to send kafka messages.

That also works only after the kafka-consumer.sh is started!!!
![image](https://github.com/KirilR/JSGameToKafkaConsumer/assets/7829757/3e7b76ce-3644-4c2a-b103-56bde0ac2eb1)

Normally the fucntionality of the whole thing is pointless if we do n ot use it with elasticsearch or prometeus/grafana in order to visualize those messages












