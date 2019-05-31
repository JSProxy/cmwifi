/**
 * 转换地址栏参数
 * @param {Object} data 需转换的参数
 * @returns {String} 返回的值 如A=a&B=b
 */
function encoderPath (data) {
  const tempArr = []
  for (let key in data) {
    tempArr.push(`${key}=${data[key]}`)
  }
  return tempArr.join('&')
}
/**
 * @param { Object } op
 * @param { Number } op.pageLimit 跳转深度
 */
export default class Router {
  constructor ({ pageLimit }) {
    this.pageLimit = pageLimit || 10
  }
  /**
   * 跳转
   * @param { String } url 跳转地址
   * @param { Object } data 跳转参数
   * @returns {Promise}
   */
  push (url, data) {
    if (!url || typeof url !== 'string') {
      throw new Error(`[Router.push] url 不能为空且必须是字符`)
    }
    if (!!data && typeof data === 'string') {
      throw new Error(`[Router.push] data 必须是一个对象`)
    }

    // 保持原有的地址, 用于重定向是使用
    let tempUrl = url

    if (data) {
      url += `?${encoderPath(data)}`
    }

    return new Promise((resolve, reject) => {
      const pageArr = getCurrentPages()

      // 如果大于设置的页面临界值, 则用重定向, 否则正常跳转
      if (pageArr.length >= this.pageLimit) {
        this.redirect(tempUrl, data)
          .then(resolve)
          .catch(reject)
      } else {
        mpvue.navigateTo({
          url,
          success (res) {
            resolve(res)
          },
          fail (err) {
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
  redirect (url, data) {
    if (!url || typeof url !== 'string') {
      throw new Error(`[Router.redirect] url 不能为空且必须是字符`)
    }
    if (!!data && typeof data === 'string') {
      throw new Error(`[Router.redirect] data 必须是一个对象`)
    }

    if (data) {
      url += encoderPath(data)
    }

    return new Promise((resolve, reject) => {
      mpvue.redirectTo({
        url,
        success (res) {
          resolve(res)
        },
        fail (err) {
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
  back (delta) {
    return new Promise((resolve, reject) => {
      mpvue.navigateBack({
        delta,
        success (res) {
          resolve(res)
        },
        fail (err) {
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
  reLaunch (url, data) {
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
        success (res) {
          resolve(res)
        },
        fail (err) {
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
  switchTab (url) {
    return new Promise((resolve, reject) => {
      mpvue.switchTab({
        url,
        success (res) {
          resolve(res)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  }
}
