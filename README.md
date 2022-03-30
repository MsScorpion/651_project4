# 651_project4
 Real-Time Geolocation Data
 
## Here is a requirement completement checklist:
### Users should be able to determine the MQTT message broker host and port
### The web application must have a Start/End button to establish/finish a connection with the MQTT message broker. If the user pushed the start button, he would no longer be able to determine host and port values unless he/she clicks on the End button.
### In case of disconnection, users should receive a proper message and the web application should automatically re-establish the connection.
### Users should be able to publish any messages to any topics they want and you should show in your demo if MQTTX can subscribe to the topic and read the message that users have just published.
### You should include the “share my status” button in your app. When a user pushes the button, a Geojson message is generated. The Geojson includes your current location and a random value for the temperature. Then your app should publish it as an MQTT message. You should show in your demo if MQTTX can subscribe to the topic and read the message that users have just published.
●Note: Your MQTT topic should be like this pattern: <your course code>/<your name>/my_temperature. Please use “_” instead of space in your topic.
### Your map should show your current location by subscribing to the MQTT message broker. When the user clicks on your location icon, she/he should see the current temperature by subscribing to the message broker with the “<your course code>/<your name>/my_temperature” topic (you should use leaflet popup to show the temperature value). Your location icon color should be changed based on the current temperature. [-40,10) blue. [10,30) green. [30,60] red.
### In your demo, you should publish the Geojson message from MQTTX and your map should automatically be updated by subscribing to the “<your course code>/<your name>/my_temperature” topic.
### You are supposed to run your web application on a browser on your smartphone while you are using GPS for your location report. Therefore, your demo should include a recording of your mobile screen. You might use free screen recorder apps for iphone and android in the market or use Vysor to record your demo on your PC or laptop.
