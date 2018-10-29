<template>
  
    <div class="modal" v-show="showFlag" @click="close">
        <div class="modal__close" @click="close"></div>
        <div class="modal__content">
          <p>Click here and check nothing happens</p>
        </div>
    </div>
  
</template>

<script>
import Vue from "vue"
let eventHub = new Vue()

export default {
  name: "GraphSelector",
  eventHub: eventHub,
  props: {
    msg: String,
  },
  data:  function() {
      return {
        showFlag: false
      }
  },
  computed: {
    show : {
      get: function() {
        console.log('get: ', this.showFlag)
        return this.showFlag
      },
      set: function(newValue) {
        console.log('set: newValue', newValue)
        this.showFlag = newValue
      }
    }
  },
  methods: {
    open: function() {
      this.show = true
      console.log("show", this.show)
    },
    close: function() {
      this.show = false
    }
  },
  
};
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

/* https://liginc.co.jp/374210 */
.modal {
  position: fixed; top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 10;
  background: rgba(0, 0, 0, .7);
  transform: translate3d(0, 0, 0);
}
/* 往路のアニメーション全体に対して設定をするためのクラス */
.modal-enter-active {transition: opacity .2s;}
/* 往路の開始状態を設定するためのクラス */
.modal-enter        {opacity: 0;}
/* 往路の終了状態を設定するためのクラス */
.modal-enter-to     {opacity: 1;}
/* 復路のアニメーション全体に対して設定をするためのクラス */
.modal-leave-active {transition: opacity .6s;}
/* 復路の開始状態を設定するためのクラス */
.modal-leave        {opacity: 1;}
/* 復路の終了状態を設定するためのクラス */
.modal-leave-to     {opacity: 0;}

.modal__content {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}
.modal__content > p {
  margin: 0;
  width: 600px;
  vertical-align: middle;
  text-align: center;
  font: bold 12px/100px sans-serif;
  letter-spacing: .1em;
  color: #aaa;
  background: #fff;
}
</style>
