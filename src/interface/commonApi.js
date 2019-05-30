import {
  API_URL
} from '../constants/hostConfig'

const getStorage = key => new Promise((resolve, reject) => {
  mpvue.getStorage({
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
  mpvue.setStorage({
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

  mpvue.removeStorage({
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
    mpvue.clearStorageSync();
    resolve();
  } catch (e) {
    reject(e);
  }
})

const request = (params) => new Promise((resolve, reject) => {
  mpvue.showNavigationBarLoading();

  let header = {
    header: params.header || {
      'Content-Type': 'application/json',
      'token': mpvue.getStorageSync('token')
    }
  }
  // 支付宝 headers
  if (mpvuePlatform == 'my') {
    header = {
      headers: params.header || {
        'Content-Type': 'application/json',
        'token': mpvue.getStorageSync('token')
      }
    }
  }

  mpvue.request({
    url: API_URL + params.url,
    method: params.method,
    data: params.data,
    ...header,
    success: (res) => {
      let requestisOk = false;
      if (res.statusCode == 200)
      {
        requestisOk = true;
      }
      if (res.status == 200) {
        requestisOk = true;
      }

      if(requestisOk){
          resolve(res.data)
      }else{
          resolve({...res.data,isok:false})
      }
    },fail: (error)=>{
      reject(error);
    }
  })

})

export {
  getStorage,
  setStorage,
  removeStorage,
  clearStorage,
  request
}
