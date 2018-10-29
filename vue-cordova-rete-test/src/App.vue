<template>
  <div id="app" style="overflow: hidden; border: none; padding:0; margin:0; height:100%; width:100%">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <div style="height:15%; width:100%; display:inline-block; border-style: solid; border-left-width:0px; border-top-width:0px; border-right-width:0px; border-bottom-width:1px;">
      <ConnectionStatus style="display:inline-block; border-style: solid; border-right-width:1px; border-left-width:0px; border-top-width:0px; border-bottom-width:0px; border-color: black; float: left; height:100%; width:29%"/>
      <button v-on:click="openGraphSelector">Open Scenario</button>
    </div>
    <GraphSelector ref="graphSelector" style="height:85%; width:100%;" />
    <GraphEditor style="height:85%; width:100%" msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import GraphEditor from "./components/GraphEditor.vue";
import ConnectionStatus from "./components/ConnectionStatus.vue";
import GraphSelector from "./components/GraphSelector.vue";

export default {
  name: "app",
  data: function() {
    return {
      showFlag: false
    };
  },
  components: {
    GraphEditor,
    ConnectionStatus,
    GraphSelector
  },
  computed: {
    show: {
      get: function() {
        console.log("get: ", this.showFlag);
        return this.showFlag;
      },
      set: function(newValue) {
        console.log("set: newValue", newValue);
        this.showFlag = newValue;
      }
    }
  },
  methods: {
    openGraphSelector: function() {
      //closeは子コンポーネントで呼ばれる
      console.log("open");
      this.$refs.graphSelector.show = true;
    },
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  margin-bottom: 0px;
}

</style>
