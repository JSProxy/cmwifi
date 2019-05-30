



const getStorage = key => new Promise((resolve, reject) => {
  wx.getStorage({
    key: key,
    success(res) {
      resolve(res);
    },
    fail(e) {
      reject(e);
    }
  })
})
const setStorage = (key, value) => new Promise((resolve, reject) => {

  wx.setStorage({
    key: key,
    data: value,
    success() {
      resolve();
    },
    fail(e) {
      reject(e);
    }
  })
})

const removeStorage = (key) => new Promise((resolve, reject) => {

  wx.removeStorage({
    key: key,
    success(res) {
      resolve(res.data);
    },
    fail(e) {
      reject(e);
    }
  })
})

const clearStorage = (key) => new Promise((resolve, reject) => {

  try {
    wx.clearStorageSync();
    resolve();
  } catch (e) {
    reject(e);
  }
})
