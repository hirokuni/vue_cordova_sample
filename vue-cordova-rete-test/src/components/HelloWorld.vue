<template>
  <div>
    <div id="rete"></div>
    Hello
  </div>
</template>

<script>
import {reteTest} from './rete-test.js'

export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};

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
    if (parentElement === null) {
      console.log("null");
    }

    reteTest()
    
    // var listeningElement = parentElement.querySelector(".listening");
    // var receivedElement = parentElement.querySelector(".received");

    // listeningElement.setAttribute("style", "display:none;");
    // receivedElement.setAttribute("style", "display:block;");

    console.log("Received Event: " + id);
  }
};

app.initialize();

var zeroconf = cordova.plugins.zeroconf;

///////////////////////////////
///////////////////////////////
///////////////////////////////

///////////////////////////////
///////////////////////////////
///////////////////////////////
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
