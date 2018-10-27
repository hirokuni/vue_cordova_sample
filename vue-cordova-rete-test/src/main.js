import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')



// var zeroconf = cordova.plugins.zeroconf;


window.addEventListener("gamepadconnected", e => {
  console.log("gamepad connected");
})

window.addEventListener("gamepaddisconnected", e => {
  console.log("gamepad disconnected");
})