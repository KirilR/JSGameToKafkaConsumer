AT the end of the day, 
when someone is using the application (playing the game) in ori case, the game (frontend) is using the API endpoint and is sending POST HTTP request to the HTTP server run by node.js.
<img width="835" alt="image" src="https://github.com/KirilR/JSGameToKafkaConsumer/assets/7829757/65fe1bbe-9992-47ff-a9d5-bf497511298b">



<img width="266" alt="image" src="https://github.com/KirilR/JSGameToKafkaConsumer/assets/7829757/46f9627b-c9da-4959-81d0-77fb61c8cb78">


That happens here in the code:




<img width="635" alt="image" src="https://github.com/KirilR/JSGameToKafkaConsumer/assets/7829757/69c97184-1a4e-4d01-8e81-cd822e6ed824">





<img width="470" alt="image" src="https://github.com/KirilR/JSGameToKafkaConsumer/assets/7829757/800c7ddd-0a84-4f24-b249-78cb29ddc67a">









In the current case if thet init() function is called - i.e somebody is playing the game or somebody win the game a SendKafkaMEssage() function is called which imposes the kafka communication through my_topic

Following is happening on the VM2 Kafka Consumer:

<img width="917" alt="image" src="https://github.com/KirilR/JSGameToKafkaConsumer/assets/7829757/180cc93a-c098-43a3-b02a-58fb61752ef1">

As mentioned, that achievement is relative pointless at this point and should be additionally extended so that the messages to be used in some monitoring system like Elastic, Prometeus?grafana, custom made Producer, etc.


