import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import axios from 'axios'
import Element from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import request from "./axios"
import global from './globalFun'
import axios from '_axios@0.22.0@axios'

Vue.prototype.$axios = request
Vue.config.productionTip = false

//require("./mock")
Vue.use(Element)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
