import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { postRequest, putRequest, getRequest, deleteRequest } from './utils/api'

Vue.config.productionTip = false

Vue.use(ElementUI)
// 插件形式使用请求
Vue.prototype.postRequest = postRequest
Vue.prototype.putResquest = putRequest
Vue.prototype.getResquest = getRequest
Vue.prototype.deleteResquest = deleteRequest

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
