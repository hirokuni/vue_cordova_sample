//import Vue from 'vue'
//  https://cli.vuejs.org/config/#lintonsave ここのパラメータをtrueにするとWarningが消えた。
import Vue from 'vue/dist/vue.esm.js'
//import Vue from 'vue/dist/vue.js'
//import Vue from 'vue/dist/vue.common.js'

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