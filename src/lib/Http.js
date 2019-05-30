/*
 * @Author: yaodongyi
 * @Description: http拦截器
 * @Date: 2019-05-06 14:44:56
 */
let Fly = require("flyio/dist/npm/wx");
let flyio = new Fly;
//使用表单的时候用qs转化
let qs = require("qs");

// import method from "../utils/method"
import { catchInfo, warnInfo } from "../utils/infoCatch.js"; //报错日志

// flyio.config.timeout = 5000;
// flyio.config.parseJson = false;

flyio.interceptors.request.use(
  request => {
    request.headers = {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",//表单
      // "Content-Type": "application/json; charset=UTF-8",//json
      "Accept": "application/json"
    };
    // request.body = qs.stringify(method.Fun_md5(request.body));
    console.log(request)
    return request;
  },
  err => {
    catchInfo("interceptors.request ", err)
    return Promise.reject(err);
  }
)

flyio.interceptors.response.use(
  response => {
    if (response.data.code === 0) { //数据正确返回
      console.log("responseSuccess:",response.data)
      return Promise.resolve(response.data);
    } else { //数据有误
      wx.showToast({
        title: response.data.msg,
        icon: 'none',
        duration: 2000
      })
      warnInfo("response api:" + response.request.url, "response code!==0 ", response);
      return Promise.reject("response api:" + response.request.url + ", " + response.data.msg);
    };
  },
  err => {
    /*报错处理 -->弹窗*/
    console.log(err);
    wx.showToast({
      title: err.message,
      icon: 'none',
      duration: 2000
    })
    catchInfo("response api:" + err.request.url, "response error", err)
    return Promise.reject(err)
  }
);

export default flyio;
