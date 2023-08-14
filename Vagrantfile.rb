Vagrant.configure("2") do |config|
  # Web Server VM
  config.vm.define "web" do |web|
  config.vm.synced_folder ".", "/vagrant"

    web.vm.box = "centos/8"
    web.vm.hostname = "web-server"
    web.vm.network "public_network"
    web.vm.network "private_network", ip: "192.168.33.10"

    web.vm.provider "virtualbox" do |vb|
      vb.memory = 2048
      vb.cpus = 2
    end

    # Port Forwarding for Web Server
    web.vm.network "forwarded_port", guest: 80, host: 8080
	web.vm.network "forwarded_port", guest: 3000, host: 3000
	web.vm.network "forwarded_port", guest: 3001, host: 3001
	web.vm.network "forwarded_port", guest: 4000, host: 4000
  end

  # Kafka and Elasticsearch VM
  config.vm.define "kafka" do |kafka|
    kafka.vm.box = "centos/8"
    kafka.vm.hostname = "kafka-elasticsearch"
    kafka.vm.network "public_network"
    kafka.vm.network "private_network", ip: "192.168.33.11"

    kafka.vm.provider "virtualbox" do |vb|
      vb.memory = 4096
      vb.cpus = 2
    end
  end
end
