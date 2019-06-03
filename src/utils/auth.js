import store from '@/store/index'
// import md5 from 'js-md5'
// import Qc from 'qs'

const API_URL = 'http://10.11.1.50:2002/';
class auth {
  setting = {
    timestamp: null, //当前时间戳
    wxCode: '', //登陆获取的微信code
    callback: () => {} //配置回调函数
  }

  //请求获取TOKEN
  getToken(callback) {

    wx.showLoading({
      title: '登入中'
    })
    let code = this.setting.wxCode;
    wx.request({
      url: API_URL + "/oaMini/loginByCode",
      method: 'post',
      // header: {
      //   'version': store.state.version,
      //   'access-token': json.data.access_token
      // },
      data: {
        code: code,
      },
      success: res => {
        if (res.data.code == 1) {
          console.log(res);
          // store.state.openId = res.data.data.openid;
          // store.state.userToken = res.data.data.user_token;
          // store.state.userAuth = res.data.data.user_type || 'guest';
          // if (store.state.userAuth != 'guest') {}
          callback && callback();
        }
      },
      complete: res => {
        wx.hideLoading();
        if (res.data.code != 1) {
          setTimeout(() => {
            wx.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 3000,
              mask: false
            })
          }, 30)
        }
      }
    });

  }

  //存储用户信息到store
  saveUserInfo(res) {
    store.state.wxCode = this.setting.wxCode;
    wx.setStorageSync('wxUserInfo', res.userInfo);
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        store.state.latitude = res.latitude;
        store.state.longitude = res.longitude;
      }
    })

    //这里实现登入漏极
    this.getToken(
      () => {
        // wx.setStorageSync('openId', store.state.openId);
        // wx.setStorageSync('userAuth', store.state.userAuth);
        // wx.setStorageSync('loginToken', store.state.loginToken);
        // let userInfo = store.state.userInfo;
        // let newUserInfo = Object.assign({}, res.userInfo, userInfo);
        // newUserInfo.sex = newUserInfo.sex == undefined ? res.userInfo.gender : newUserInfo.sex;
        // newUserInfo.nickName = newUserInfo.nickName == undefined ? res.userInfo.nickName : newUserInfo.nickName;
        // store.state.userInfo = newUserInfo;
        // wx.setStorageSync('userInfo', newUserInfo);

        const url = '/pages/index/main';
        wx.redirectTo({
          url
        })
      }
    );
  }

  //获取微信用户信息
  getUserInfo() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              this.saveUserInfo(res);
              console.log('用户已经授权过')
            }
          })
        } else {
          this.checkWeixin();
          console.log('用户还未授权过===')
        }
      }
    })
  }

  //验证用户微信版本
  checkWeixin() {
    if (wx.canIUse('button.open-type.getUserInfo')) {
      console.log('用户微信版本可用')
      store.state.wxAuthShow = true;
      // 用户版本可用
    } else {
      wx.showModal({
        title: '警告',
        content: '微信版本太低，请升级版本',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
          wx.navigateBack({
            delta: -1
          })
        }
      })
    }
  }

  //登陆微信
  login() {
    wx.showLoading({
      title: '加载中'
    })
    wx.login({
      success: (res) => {
        if (res.code) {
          this.setting.wxCode = res.code;
          wx.hideLoading();
          this.getUserInfo();
          console.log(res, '用户登陆成功')
        }
      }
    })
  }
}

export {
  auth
}
