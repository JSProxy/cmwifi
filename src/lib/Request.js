
let defaultConfig = {
    baseUrl: '',
    header:{'Content-Type':'application/json'},
    dataType:'json',
    responesType:'text'
}

const REQUEST_CONFIG = Symbol('requestConfig');
const INTERCEPTOR_CALLBACK = Symbol('interceptorCallBack');
const INTERCEPTOR_SUCCESS_CALLBACK = Symbol('interceptorSuccessCallBack');
const INTERCEPTOR_FAIL_CALLBACK = Symbol('interceptorFailCallBack');

class Request {
    constructor(config={}){
      this[REQUEST_CONFIG] = Object.assign({},defaultConfig,config)
      this[INTERCEPTOR_CALLBACK] = ''
      this[INTERCEPTOR_SUCCESS_CALLBACK] = ''
      this[INTERCEPTOR_FAIL_CALLBACK] = ''
    }

    //请求拦截
    interceptorRequest(func){
      this[INTERCEPTOR_CALLBACK] = func
    }
    //返回会拦截
    interceptorResponse(success,fail){
      this[INTERCEPTOR_SUCCESS_CALLBACK] = success
      this[INTERCEPTOR_FAIL_CALLBACK] = fail
    }

    get(url,data){

      return this.request('GET',url,data);
    }

    post(url,data){

      return this.request('POST',url,data);
    }

    async request(method,url,data){

      return new Promise((resolve,reject)=>{
        url = /^(http|https)/.test(url)?url:this[REQUEST_CONFIG].baseUrl+url;
      let mergeConfig = Object.assign({},this[REQUEST_CONFIG],{method,url,data});
        // 检查是否有请求拦截器
        let cbconfig = {}
        if(this[INTERCEPTOR_CALLBACK])
        {
          cbconfig = await this[INTERCEPTOR_CALLBACK](clone(mergeConfig));
        }

        let currentConfig = Object.assign({},cbconfig,{
          success:(result)=>{

          },fail(error){

          }
        })

        if(mpvuePlatform =='my'){

        }
        mpvue.request(currentConfig);
      })
    }
}
function isPromise(fn)
{
}

function chone(){
}

