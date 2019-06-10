import fly from '../lib/Http.js';
import { API_URL }from '../config/hostConfig'

// code登录
export const api_codeLogin = (params) => {
  return fly.get(`${API_URL}/oaMini/loginByCode`, params);
};
// 手机号登入
// {
//   "openid":"fsss",  //3接口中返回的openid
//   "iv":"xx",	//小程序调用授权获取手机号返回的iv
//   "session_key":"xxx"  //3接口中返回的session_key
//   "encryptedData":"xx"//小程序调用授权获取手机号返回的encryptedData
//   }
export const api_phoneLogin = (params) => {
  return fly.post(`${API_URL}/oaMini/loginByPhone`, params);
};
// OA
// 参数（全部必传）：
// {
// "oaMiniOpenid":"fsss", //openid
// "username":"xx",  //oa账号
// "password":"xxx" //oa密码
// }
export const api_aoLogin = (params) => {
  return fly.post(`${API_URL}/oaMini/users/login`, params);
};
// 获取wifilist
// floor=11 楼层
export const api_wifiList = (params) => {
  return fly.get(`${API_URL}/oaMini/wifiList`, params);
};
//获取banner 图片
export const api_bannerlist = () => {
  return fly.get(`${API_URL}/oaMini/bannerList`);
};
