import { createApp, isProxy } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mitt from 'mitt'
import axios from 'axios'
import VueCookies from 'vue-cookies'
axios.defaults.timeout = 50000
axios.defaults.withCredentials = true

const app = createApp(App)
app.config.globalProperties.$bus = new mitt()
app.config.globalProperties.$http = axios
app.config.globalProperties.$cookies = VueCookies
app.use(router).use(store)

app.mount('#app')
