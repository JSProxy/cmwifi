import fly from '../lib/Http.js';
import { API_URL,appId,appSecret }from '../config/hostConfig'


// 登录
export const api_codeLogin = (params) => {
  return fly.get(`${API_URL}/oaMini/loginByCode`, params);
};

// AO
export const api_aoLogin = (params) => {
  return fly.post(`${API_URL}/oaMini/loginByPhone`, params);
};

// 登录
export const api_wifiList = (params) => {
  return fly.get(`${API_URL}/oaMini/wifiList`, params);
};
