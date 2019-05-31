import fly from '../lib/Http.js';
import { API_URL,appId,appSecret }from '../config/hostConfig'


// 登录
export const api_login = (params) => {
  return fly.post(`${API_URL}/api/login`, params);
};
