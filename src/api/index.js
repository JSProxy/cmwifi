import fly from '../lib/Http.js'
let BASE_URL = 'https://mapp-t0travel.triumen.cn/'; // 测试
let appkey = 'EgDjckWzyGxwIi7e9J1A8LdruWMidFFH'; // 测试
let appsecret = '9Q8744Oe0nv8aw738b3HkjdylYZzNeZOcTz53KI4pchKpqIi';
export { BASE_URL };

// 登录
export const api_login = (params) =>
{
  return fly.post(`${BASE_URL}/api/login`, params);
};
