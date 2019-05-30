/**
 *
 * @param {Object} data 需要转换的参数
 * @returns {String} 返回的值 如 a=1&b=2
 */
function encoderPath(data) {
  if (typeof (data) != 'Object') {
    throw new Error('请传入一个对象')
  }
  let arr = []
  for (let key in data) {
    arr.push(`${key}=${data[key]}`)
  }
  return arr.join('&')
}

export default class Router {
  constructor({
    limitPage
  }) {
    this.limitPage = limitPage || 10
  }

  push(url, data) {
    if (!url || typeof url !== 'string') throw new Error('[Router.push]请传入String类型url')
    if (!!data && typeof data != 'Object') throw new Error('[Router.push]请传入Object类型data')
    let currentPages = getCurrentPages()

    let tempUrl = url;

    if (data) {
      url += `?${encoderPath(data)}`
    }

    return new Promise((resolve, reject) => {

      if (currentPages.length >= this.limitPage)
      {

      } else {
        mpvue.navigateTo({
          url,
          success(res) {
            resolve(res)
          },
          fail(err) {
            reject(err)
          }
        })
      }

    })
  }
  /**
   * 重定向
   * @param { String } url 跳转地址
   * @param { Object } data 跳转参数
   * @returns {Promise}
   */
  redirect(url, data) {
    if (!url || typeof url !== 'string') throw new Error('[Router.push]请传入String类型url');
    if (!!data && typeof data != 'Object') throw new Error('[Router.push]请传入Object类型data');

    if (data) {
      url += encoderPath(data)
    }

    return new Promise((resolve, reject) => {
      mpvue.redirectTo({
        url,
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  /**
   * 返回
   * @param {Number} delta 返回页数
   * @returns {Promise}
   */
  back(delta) {
    return new Promise((resolve, reject) => {
      mpvue.navigateBack({
        delta,
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  /**
   * 删除所有页面,跳转到指定页面
   * @param { String } url 跳转地址
   * @param { Object } data 跳转参数
   * @returns {Promise}
   */
  reLaunch(url, data) {
    if (!url || typeof url !== 'string') {
      throw new Error(`[Router.reLaunch] url 不能为空且必须是字符`)
    }
    if (!!data && typeof data === 'string') {
      throw new Error(`[Router.reLaunch] data 必须是一个对象`)
    }

    if (data) {
      url += encoderPath(data)
    }

    return new Promise((resolve, reject) => {
      mpvue.reLaunch({
        url,
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  /**
   * 跳转到tab页
   * @param { String } url 跳转地址
   * @returns {Promise}
   */
  switchTab(url) {
    return new Promise((resolve, reject) => {
      mpvue.switchTab({
        url,
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
}
