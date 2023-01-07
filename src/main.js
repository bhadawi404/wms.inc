import "bootstrap/dist/css/bootstrap.css"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import store from './store';
import 'bootstrap-icons/font/bootstrap-icons.css'

axios.defaults.baseURL = 'http://149.129.233.161/api'

createApp(App).use(store).use(router, axios).mount('#app')
import "bootstrap/dist/js/bootstrap.js"