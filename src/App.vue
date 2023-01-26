<template>
  <div class="is-loading-bar has-text-centered" v-bind::class="{ 'is-loading': $store.state.isLoading }">
    <div class="lds-dual-ring">

    </div>
  </div>
  <section class="section">
    <router-view />
  </section>

</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

import axios from 'axios';

export default {
  name: 'App',
  beforeCreate() {
    this.$store.commit('initializerStore')

    if (this.$store.state.token) {
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.$store.state.token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  }
}
</script>

<style>
#app {
  font-family: "Plus Jakarta Sans";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #F9F9F9;
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.lds-dual-ring::after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.is-loading-bar {
  height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
  .is-loading {
    height: 80px;
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
