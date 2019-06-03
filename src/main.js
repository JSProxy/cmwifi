import Vue from 'vue'
import App from './App'
import { auth } from '@/utils/auth'
import Store from './store/index'
// mpvue-router-patch
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
Vue.prototype.$auth = new auth()
Vue.prototype.$store = Store
