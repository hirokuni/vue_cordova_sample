/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
let socketId = 0

function string_to_buffer(src) {
    return (new Uint16Array([].map.call(src, function(c) {
      return c.charCodeAt(0)
    }))).buffer;
  }

var app = {
  // Application Constructor
  initialize: function() {
    document.addEventListener(
      "deviceready",
      this.onDeviceReady.bind(this),
      false
    );
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function() {
    this.receivedEvent("deviceready");


  },

  // Update DOM on a Received Event

  

  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector(".listening");
    var receivedElement = parentElement.querySelector(".received");

    listeningElement.setAttribute("style", "display:none;");
    receivedElement.setAttribute("style", "display:block;");

    console.log("Received Event: " + id);

    if (id === "deviceready") {
        console.log("setup zeroconf");
        var zeroconf = cordova.plugins.zeroconf;
        zeroconf.registerAddressFamily = "ipv4"; // or 'ipv6' ('any' by default)
        zeroconf.watchAddressFamily = "ipv4"; // or 'ipv6' ('any' by default)
        zeroconf.getHostname(function success(hostname) {
          console.log("hostname: ", hostname); // ipad-of-becvert.local.
        });

        console.log("start watch");
        zeroconf.watch('_plum._tcp.', 'local.', function(result) {
            var action = result.action;
            var service = result.service;
            if (action == 'added') {
                console.log('service added', service);
            } else if (action == 'resolved') {
                console.log('service resolved', service);
                if (service.name === 'PLUM_PU Service') {
                    console.log('Found PLUM!!')

                    //tcp ip
                    let SocketProperties = {
                        persistent: true
                    }
                    chrome.sockets.tcp.create( SocketProperties, function(createInfo) {
                        socketId = createInfo.socketId

                        chrome.sockets.tcp.connect(socketId, service.ipv4Addresses[0], 5333, function(result) {
                            console.log("result: " + result)

                            if (result >= 0) {
                                
                                var buffer = string_to_buffer("Hello")
                                chrome.sockets.tcp.send(socketId, buffer, function(sendInfo){
                                    console.log("result code: " + sendInfo.resultCode)
                                    console.log("result bytesSent: " + sendInfo.bytesSent)
                                })
                            }
                        })
                    })
                }
                /* service : {
                'domain' : 'local.',
                'type' : '_http._tcp.',
                'name': 'Becvert\'s iPad',
                'port' : 80,
                'hostname' : 'ipad-of-becvert.local',
                'ipv4Addresses' : [ '192.168.1.125' ], 
                'ipv6Addresses' : [ '2001:0:5ef5:79fb:10cb:1dbf:3f57:feb0' ],
                'txtRecord' : {
                    'foo' : 'bar'
                } */
            } else {
                console.log('service removed', service);
            }
        });
    }
  }
};

app.initialize();
