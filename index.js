//MQTT Operations
var connected_flag = 0
var mqtt = "";
var reconnectTimeout = 2000;
var map;
//var geoLonLat;
function onConnectionLost() {
    console.log("connection lost");
    document.getElementById("status").innerHTML = "Connection Lost";
    document.getElementById("messages").innerHTML = "Connection Lost";
    connected_flag = 0;
}
function onFailure(message) {
    console.log("Failed");
    document.getElementById("messages").innerHTML = "Connection Failed- Retrying";
    setTimeout(MQTTconnect, reconnectTimeout);
}
function onMessageArrived(r_message) {
    out_msg = "Message received " + r_message.payloadString + "<br>";
    out_msg = out_msg + "Message received Topic " + r_message.destinationName;
    //console.log("Message received ",r_message.payloadString);
    try{
        var obj = JSON.parse(r_message.payloadString);
        latitude = obj.latitude;
        longitude = obj.longitude;
        mymap.panTo(new L.LatLng(latitude, longitude));
        var marker = L.marker([latitude, longitude]).addTo(mymap);
        marker.bindPopup(r_message.payloadString).openPopup();
        marker.closePopup();
    }
    catch(e){
        console.log("Error in parsing JSON");
    }

    console.log(out_msg);
    document.getElementById("messages").innerHTML = out_msg;
}
function onConnected(recon, url) {
    console.log(" in onConnected " + recon);
}
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    document.getElementById("messages").innerHTML = "Connected to " + host + "on port " + port;
    connected_flag = 1
    document.getElementById("status").innerHTML = "Connected";
    console.log("on Connect " + connected_flag);
    //mqtt.subscribe("sensor1");
    //message = new Paho.MQTT.Message("Hello World");
    //message.destinationName = "sensor1";
    //mqtt.send(message);
}

function MQTTconnect() {
    document.getElementById("messages").innerHTML = "";
    //var s = document.forms["connform"]["server"].value;
    //var p = document.forms["connform"]["port"].value;
    var s = document.getElementById("server").value;
    var p = document.getElementById("port").value;
    if (p != "") {
        console.log("ports");
        port = parseInt(p);
        console.log("port" + port);
    }
    if (s != "") {
        host = s;
        console.log("host");
    }
    console.log("connecting to " + host + " " + port);
    var x = Math.floor(Math.random() * 10000);
    var cname = "orderform-" + x;
    mqtt = new Paho.MQTT.Client(host, port, cname);
    //document.write("connecting to "+ host);
    var options = {
        timeout: 3,
        onSuccess: onConnect,
        onFailure: onFailure,

    };

    mqtt.onConnectionLost = onConnectionLost;
    mqtt.onMessageArrived = onMessageArrived;
    //mqtt.onConnected = onConnected;

    mqtt.connect(options);
    return false;

}

function MQTTdisconnect() {
    mqtt.disconnect();
    document.getElementById("messages").innerHTML = "Connection Status: Disconnected Successfully";
    document.getElementById("status").innerHTML = "Connection Status: Disconnected Successfully";
    return false;
}



function sub_topics() {
    document.getElementById("messages").innerHTML = "";
    if (connected_flag == 0) {
        out_msg = "<b>Not Connected so can't subscribe</b>"
        console.log(out_msg);
        document.getElementById("messages").innerHTML = out_msg;
        return false;
    }
    var stopic = document.getElementById("Stopic").value;
    //var stopic = document.forms["subs"]["Stopic"].value;
    console.log("Subscribing to topic =" + stopic);
    mqtt.subscribe(stopic);
    document.getElementById("messages").innerHTML = "Subscribed to topic " + stopic;
    return false;
}
function send_message() {
    document.getElementById("messages").innerHTML = "";
    if (connected_flag == 0) {
        out_msg = "<b>Not Connected so can't send</b>"
        console.log(out_msg);
        document.getElementById("messages").innerHTML = out_msg;
        return false;
    }
    //var msg = document.forms["smessage"]["message"].value;
    var msg = document.getElementById("message").value;
    //var msg = (latitude, longitude);
    console.log(msg);

    //var topic = document.forms["smessage"]["Ptopic"].value;
    var topic = document.getElementById("Ptopic").value;
    var message = new Paho.MQTT.Message(msg);
    if (topic == "")
        message.destinationName = "test-topic"
    else
        message.destinationName = topic;
    mqtt.send(message);
    // mymap.panTo([latitude, longitude]);
    // marker = L.marker([latitude, longitude]).addTo(mymap);
    //mqtt.send(latitude, longitude);
    return false;
}

// function onMessageArrived(message) {
//     var dname = message.destinationName;
//         if(dname == did+'/location') {
//       write('Device "' + did + '" found! look below: ');
//       var loc = eval("(" + message.payloadString + ')');
//       if(loc && map != undefined) {
//         var center = new google.maps.LatLng(latitude, longitude);
//             map.setCenter(center, 8);
//             //var mdata = { position: center, map: map }
//             //var marker = new google.maps.Marker(mdata);
//       }
//     }
//   }

document.addEventListener("DOMContentLoaded", function () {
    mymap = L.map('mapid', {
        center: [50.5, 30.5],
        zoom: 13
    });

    var basemap = L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18
      }).addTo(mymap);

    function geoFindMe() {
      const status = document.querySelector('#status');
      const mapLink = document.querySelector('#map-link');
  
      mapLink.href = '';
      mapLink.textContent = '';
  
      function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;  
        var marker;
        var myIcon;
        var temperature = Math.random() * (60 - (-40)) -40;
        //var temperature = 50;
        var msg = "Latitude: " + latitude + "<br>"+ "Longitude: " + longitude + "<br>"+ "Temperature: " + temperature;
        status.textContent = '';
        //mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mymap.panTo(new L.LatLng(latitude, longitude));

        // L.map('mapid', {
        //     center: [45, 120],
        //     zoom: 13
        // });
        mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

        if (temperature >=-40 && temperature < 10)
            myIcon = new L.icon({
                iconUrl: 'img/marker-icon-2x-blue.png',
                shadowUrl: 'img/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            })
        else if (temperature >=10 && temperature < 30)
            myIcon = new L.icon({
                iconUrl: 'img/marker-icon-2x-green.png',
                shadowUrl: 'img/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            })
        else if (temperature >=30 && temperature < 60)
            myIcon = new L.icon({
                iconUrl: 'img/marker-icon-2x-red.png',
                shadowUrl: 'img/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

        marker = L.marker([latitude, longitude], {icon: myIcon}).addTo(mymap);
        marker.bindPopup(msg).openPopup();
        marker.closePopup();

        var topic = document.getElementById("Stopic").value;
        var message = new Paho.MQTT.Message(msg);
        if (topic == "")
            message.destinationName = "test-topic"
        else
            message.destinationName = topic;
        mqtt.send(message);
      }
  
      function error() {
        status.textContent = 'Unable to retrieve your location';
      }
  
      if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
      } else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
      }
  
    }
    var geoLonLat = document.querySelector('#find-me').addEventListener('click', geoFindMe);

  });