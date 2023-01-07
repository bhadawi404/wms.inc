<template>
    <div class="home">
        <h1>Home</h1>
    </div>
  </template>
  
  <script>
 
  export default {
    name: "HomeView",
    components: {},
    mounted(){
      console.log(this.$store.state.isAuthenticated);
      if(this.$store.state.isAuthenticated == false){
        this.$router.replace({ name: "login"});
      }
  }
  };
  </script>
  