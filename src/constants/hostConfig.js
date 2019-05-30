const host = {
  dev: {
    API_URL:'https://wx.test.com',
    AppID:'wx73a35eed72e5df50',
    AppSecret:'18e728e27a144b82dc6d1e2ad3fcb89c'
  },
  prod:
  {
    API_URL:'https://wx.prod.com',
    appId:'wxprod'

  }
}
let env = process.env.NODE_ENV == 'production'? 'prod':'dev';
const API_URL = host[env].API_URL;
const appId = host[env].appId;
export {API_URL,appId}
