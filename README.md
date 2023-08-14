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




