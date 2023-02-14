import "bootstrap/dist/css/bootstrap.css"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import store from './store';
import 'bootstrap-icons/font/bootstrap-icons.css'
import "bootstrap/dist/js/bootstrap.js"

axios.defaults.baseURL = 'http://104.248.153.142:8000/api'
// axios.defaults.baseURL = 'http://127.0.0.1:8000/api'


createApp(App).use(store).use(router, axios).mount('#app')
