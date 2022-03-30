# 651_project4
 Real-Time Geolocation Data
 
## Here is a requirement completement checklist:
### 1. Users should be able to determine the MQTT message broker host and port <br/>
The users can customize the input of broker host and port in the server and port frames. 
### 2. The web application must have a Start/End button to establish/finish a connection with the MQTT message broker. If the user pushed the start button, he would no longer be able to determine host and port values unless he/she clicks on the End button.<br/>
The users can use the connect or disconnect button to establish or finish a connection.
### 3. In case of disconnection, users should receive a proper message and the web application should automatically re-establish the connection.<br/>
The web application will try to re-establish the connection for several time, if the connection are incorrect or lost.
### 4. Users should be able to publish any messages to any topics they want and you should show in your demo if MQTTX can subscribe to the topic and read the message that users have just published.<br/>
There are several tests of messages be published on several different topics, and all of them can be published to the MQTTX.
### 5. You should include the “share my status” button in your app. When a user pushes the button, a Geojson message is generated. The Geojson includes your current location and a random value for the temperature. Then your app should publish it as an MQTT message. You should show in your demo if MQTTX can subscribe to the topic and read the message that users have just published.
Note: Your MQTT topic should be like this pattern: <your course code>/<your name>/my_temperature. Please use “_” instead of space in your topic.<br/>
Random temperature is generated in the codes, and the locations and the temperature will be published as an MQTT message. The MQTTX can subscribe to the topic and read the geolocation message.
 
### 6. Your map should show your current location by subscribing to the MQTT message broker. When the user clicks on your location icon, she/he should see the current temperature by subscribing to the message broker with the “<your course code>/<your name>/my_temperature” topic (you should use leaflet popup to show the temperature value). Your location icon color should be changed based on the current temperature. [-40,10) blue. [10,30) green. [30,60] red.<br/>
The popup will be shown when click on the icon, and the icons are setted in the required color.
 
### 7. In your demo, you should publish the Geojson message from MQTTX and your map should automatically be updated by subscribing to the “<your course code>/<your name>/my_temperature” topic.<br/>
When sending a json message as required from the MQTTX, the latitude and longitude will be received and a marker of this location will be shown on the map.
 
### 8. You are supposed to run your web application on a browser on your smartphone while you are using GPS for your location report. Therefore, your demo should include a recording of your mobile screen. You might use free screen recorder apps for iphone and android in the market or use Vysor to record your demo on your PC or laptop.<br/>
The HappyCast App is used to plot the cell phone screen to the computer for demo recording.
