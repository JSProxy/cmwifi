import Request from '../lib/Request'
import Vue from 'vue'
const http = new Request()

http.requestInterceptor((config) => {
  // config.headers = {
  //   // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  //   'Content-Type': 'application/json; charset=UTF-8',
  //   Accept: 'application/json',
  // };
  // const userAuth = wx.getStorageSync('userAuth') || {};
  // config.body = { ...config.body, ...userAuth };
  // console.log(config);
  return config
})

http.responseInterceptor((result) => {
  // 只返回服务器 200 的数据
  return Promise.reject(result)
}, (err) => {
  // 这里处理, 服务器400, 500 和 api 的 fail事件, 区分服务器错误和fail错误 判断err.response 是否存在
  if (err.response) {
    // 服务器错误
  } else {
    // fail
  }
})
Vue.prototype.$request = http;
