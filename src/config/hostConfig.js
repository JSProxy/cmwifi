const host = {
  dev: {
    API_URL:'http://10.11.1.50:2002',
    appID:'wx73a35eed72e5df50',
    appSecret:'18e728e27a144b82dc6d1e2ad3fcb89c'
  },
  prod:
  {
    API_URL:'https://wx.prod.com',
    appID:'wx73a35eed72e5df50',
    appSecret:'18e728e27a144b82dc6d1e2ad3fcb89c'
  }
}
let env = process.env.NODE_ENV == 'production'? 'prod':'dev';
const API_URL = host[env].API_URL;
const appId = host[env].appId;
export {API_URL,appId,appSecret}
