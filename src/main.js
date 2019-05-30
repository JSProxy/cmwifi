import Vue from 'vue'
import App from './App'
import './global/index'
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()


// this.$forceUpdate(); //重绘
// Object.assign(this.$data, this.$options.data()) //清空data
