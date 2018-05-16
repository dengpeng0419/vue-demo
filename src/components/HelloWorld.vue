<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2 @click="clickMe">click me</h2>
    <Toast :content="cont"></Toast>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        cont: {toastMsg: ''}
      }
    },
    methods: {
      clickMe() {
        console.log('hi');
        this.cont = {toastMsg: '4', position: 'bottom', color: 'blue'};
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "../assets/scss/base.scss";
</style>
