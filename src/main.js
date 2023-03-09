import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import CodeEditor from 'bin-code-editor'
import VCharts from 'v-charts'
import store from './store'

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://127.0.0.1:8082'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.use(ElementUI)
Vue.use(CodeEditor)
Vue.use(VCharts)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// axios.interceptors.request.use((config) => {
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })
