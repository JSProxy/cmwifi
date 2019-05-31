const DEFAULT_CONFIG = {
  baseUrl: '',
  header: {'content-type': 'application/json'},
  dataType: 'json',
  responseType: 'text'
}
const CONFIG = Symbol('config') // 默认配置
const REQUEST_INTERCEPT_CALLBACK = Symbol('requestInterceptCallback') // 请求拦截函数
const RESPONSE_INTERCEPT_CALLBACK_SUCCESS = Symbol('responseInterceptCallbackSuccess') // 响应成功拦截函数
const RESPONSE_INTERCEPT_CALLBACK_ERROR = Symbol('responseInterceptCallbackError') // 响应失败拦截函数

export default class Request {
  constructor (config = {}) {
    this[CONFIG] = Object.assign({}, DEFAULT_CONFIG, config)

    this[REQUEST_INTERCEPT_CALLBACK] = ''
    this[RESPONSE_INTERCEPT_CALLBACK_SUCCESS] = ''
    this[RESPONSE_INTERCEPT_CALLBACK_ERROR] = ''
  }
  /**
 * 请求拦截函数
 * @param {function} fn
 */
  requestInterceptor (fn) {
    if (typeof fn !== 'function') {
      throw new Error('requestIntercept 的参数必须是一个函数')
    }

    this[REQUEST_INTERCEPT_CALLBACK] = fn
  }
  /**
   * 响应拦截函数
   * @param {function} funcSuccess
   * @param {function} funcError
   */
  responseInterceptor (funcSuccess, funcError) {
    if (typeof funcSuccess !== 'function') {
      throw new Error('responseIntercept 的参数必须是一个函数')
    }

    if (!!funcError && typeof funcError !== 'function') {
      throw new Error('responseIntercept 的参数必须是一个函数')
    }

    this[RESPONSE_INTERCEPT_CALLBACK_SUCCESS] = funcSuccess
    this[RESPONSE_INTERCEPT_CALLBACK_ERROR] = funcError
  }
  /**
   * post请求
   * @param {string} url
   * @param {Object | string} data
   */
  post (url, data) {
    return this.request('POST', url, data)
  }
  /**
   * get请求
   * @param {string} url
   * @param {Object | string} data
   */
  get (url, data) {
    return this.request('GET', url, data)
  }
  /**
   * 请求函数
   * @param {String} method
   * @param {String} url
   * @param {Object | String} data
   */
  async request (method, url, data) {
    return new Promise(async (resolve, reject) => {
      url = /^(http)|^(https)/.test(url) ? url : this[CONFIG].baseUrl + url
      let mergeConfig = Object.assign({}, this[CONFIG], { method, url, data })

      if (this[REQUEST_INTERCEPT_CALLBACK]) {
        if (isPromise(this[REQUEST_INTERCEPT_CALLBACK])) {
          mergeConfig = await this[REQUEST_INTERCEPT_CALLBACK](clone(mergeConfig))
        } else {
          mergeConfig = this[REQUEST_INTERCEPT_CALLBACK](clone(mergeConfig))
        }
      }

      mergeConfig = Object.assign({}, mergeConfig, {
        success: (result) => {
          const statusCode = result.status ? result.status : result.statusCode // 兼容微信和支付宝
          if (isHttpSuccess(statusCode)) {
            // 响应拦截, 所有请求不为200的触发err回调, 只有200的触发成功回调
            if (this[RESPONSE_INTERCEPT_CALLBACK_SUCCESS]) {
              let callback = this[RESPONSE_INTERCEPT_CALLBACK_SUCCESS](formateResult(result))

              if (isPromise(callback)) {
                callback.then(resolve).catch(reject)
              } else {
                resolve(callback)
              }
            }
          } else {
            if (this[RESPONSE_INTERCEPT_CALLBACK_ERROR]) {
              let callback = this[RESPONSE_INTERCEPT_CALLBACK_ERROR]({ response: formateResult(result) })
              if (isPromise(callback)) {
                callback.then(resolve).catch(reject)
              } else {
                reject(callback)
              }
            } else {
              reject(formateResult(result))
            }
          }
        },
        fail: (err) => {
          if (this[RESPONSE_INTERCEPT_CALLBACK_ERROR]) {
            let callback = this[RESPONSE_INTERCEPT_CALLBACK_ERROR](clone(err))
            if (isPromise(callback)) {
              callback.then(resolve).catch(reject)
            } else {
              reject(callback)
            }
          } else {
            reject(clone(err))
          }
        }
      })

      let cpConfig = clone(mergeConfig)

      // 支付宝的需要转换一下
      if (mpvuePlatform === 'my') {
        cpConfig['headers'] = cpConfig.header
        delete cpConfig.header
        delete cpConfig.responseType
      }
      // 发送请求
      mpvue.request(cpConfig)
    })
  }
}

function formateResult (result) {
  const statusCode = result.status ? result.status : result.statusCode
  return {
    status: statusCode,
    data: typeof result.data === 'string' ? result.data : clone(result.data),
    header: clone(result.headers ? result.headers : result.header)
  }
}

function isHttpSuccess (status) {
  return (status >= 200 && status < 300) || status === 304
}

function isPromise (fun) {
  return !!fun && (typeof fun === 'object' || typeof fun === 'function') && typeof fun.then === 'function'
}

const isType = (obj, type) => {
  if (typeof obj !== 'object') return false
  // 判断数据类型的经典方法：
  const typeString = Object.prototype.toString.call(obj)
  let flag
  switch (type) {
    case 'Array':
      flag = typeString === '[object Array]'
      break
    case 'Date':
      flag = typeString === '[object Date]'
      break
    case 'RegExp':
      flag = typeString === '[object RegExp]'
      break
    default:
      flag = false
  }
  return flag
}

const getRegExp = re => {
  let flags = ''
  if (re.global) flags += 'g'
  if (re.ignoreCase) flags += 'i'
  if (re.multiline) flags += 'm'
  return flags
}

const clone = parent => {
  // 维护两个储存循环引用的数组
  const parents = []
  const children = []

  const _clone = parent => {
    if (parent === null) return null
    if (typeof parent !== 'object') return parent

    let child, proto

    if (isType(parent, 'Array')) {
      // 对数组做特殊处理
      child = []
    } else if (isType(parent, 'RegExp')) {
      // 对正则对象做特殊处理
      child = new RegExp(parent.source, getRegExp(parent))
      if (parent.lastIndex) child.lastIndex = parent.lastIndex
    } else if (isType(parent, 'Date')) {
      // 对Date对象做特殊处理
      child = new Date(parent.getTime())
    } else {
      // 处理对象原型
      proto = Object.getPrototypeOf(parent)
      // 利用Object.create切断原型链
      child = Object.create(proto)
    }

    // 处理循环引用
    const index = parents.indexOf(parent)

    if (index !== -1) {
      // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
      return children[index]
    }
    parents.push(parent)
    children.push(child)

    for (let i in parent) {
      // 递归
      child[i] = _clone(parent[i])
    }

    return child
  }
  return _clone(parent)
}
