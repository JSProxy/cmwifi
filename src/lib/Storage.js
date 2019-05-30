/**
 * @param { String } 仓库名
 */
class Repository {
  constructor(name) {
    this.ext = name
  }
  /**
   * 储存本地数据
   * @param {String} key
   * @param {Object | String} data
   */
  setItem(key, data) {
    return new Promise((resolve, reject) => {
      mpvue.setStorage({
        key: `${this.ext}_${key}`,
        data,
        success() {
          resolve()
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  /**
   * 储存本地数据同步版本
   * @param {String} key
   * @param {Object | String} data
   */
  setItemSync(key, data) {

    if (mpvuePlatform === 'my') {
      return mpvue.setStorageSync({
        key: `${this.ext}_${key}`,
        data
      })
    } else {
      return mpvue.setStorageSync(`${this.ext}_${key}`, data)
    }

  }
  /**
   * 获取本地储存
   * @param {string} key
   */
  getItem(key) {
    return new Promise((resolve, reject) => {
      mpvue.getStorage({
        key: `${this.ext}_${key}`,
        success(result) {
          resolve(result.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  /**
   * 获取本地储存同步版
   * @param {string} key
   */
  getItemSync(key) {

    if (mpvuePlatform === 'my') {
      let result = mpvue.getStorageSync({
        key: `${this.ext}_${key}`
      })
      return result.data
    } else {
      let result = mpvue.getStorageSync(`${this.ext}_${key}`)
      return result
    }
  }
  /**
   * 删除缓存
   * @param {string} key
   */
  removeItem(key) {
    return new Promise((resolve, reject) => {
      mpvue.removeStorage({
        key: `${this.ext}_${key}`,
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
   * 删除缓存同步版
   * @param {string} key
   */
  removeItemSync(key) {

    if (mpvuePlatform === 'my') {
      return mpvue.removeStorageSync({
        key: `${this.ext}_${key}`
      })
    } else {
      return mpvue.removeStorageSync(`${this.ext}_${key}`)
    }
  }
  /**
   * 删除本地的所有缓存
   */
  removeAllItem() {
    return new Promise((resolve, reject) => {
      mpvue.clearStorage({
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
   * 删除本地的所有缓存同步版
   */
  removeAllItemSync() {
    return mpvue.clearStorageSync()
  }
  /**
   * 获取本地缓存的信息
   */
  getStorageInfo() {
    return new Promise((resolve, reject) => {
      mpvue.getStorageInfo({
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
   * 获取本地缓存的信息同步版
   */
  getStorageInfoSync() {
    return mpvue.getStorageInfoSync()
  }
}

export default class Storage {
  constructor() {
    this.repositories = {}
  }

  create(name) {
    if (!name || typeof name !== 'string') throw new Error('[Storage] 请输入仓库名-类型为String');
    if (Object.keys(this.repositories).indexOf(name) >= 0) throw new Error('[Storage] 仓库已存在');

    this.repositories[name] = new Repository(name);
  }

  getRepository(name) {

    if (Object.keys(this.repositories).indexOf(name) >= 0) {

      return this.repositories[name];
    } else {
      throw new Error('[Storage] 请先创建仓库');
    }

  }
}
