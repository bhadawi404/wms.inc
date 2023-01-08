<template>
  <router-view />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  mounted(){
    this.$store.commit('initializeStore');
  }
}
</script>

<style>
#app {
  font-family: Plus Jakarta Sans;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@font-face {
  font-family: "Plus Jakarta Sans";
  src: local("Plus_Jakarta_Sans"),
   url(fonts/Plus_Jakarta_Sans/PlusJakartaSans-VariableFont_wght.ttf) format("truetype");
}
@font-face {
  font-family: "Inter";
  src: local("Inter"),
   url(fonts/Inter/Inter-VariableFont_slnt,wght.ttf) format("truetype");
}
</style>
