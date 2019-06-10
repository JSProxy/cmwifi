import store from '@/store/index'
import {
  api_codeLogin,
  api_phoneLogin
} from '../api/index'
// import Qc from 'qs'
class auth {
  setting = {
    timestamp: null, //当前时间戳
    wxCode: '', //登陆获取的微信code
    callback: () => {} //配置回调函数
  }

  //请求获取TOKEN
  async getToken(callback) {

    wx.showLoading({
      title: '登入中'
    })
    let code = this.setting.wxCode;
    let data = await api_codeLogin({
      code
    });
    console.log(data);
    // 第一次登入或者访客登入都需要调用 授权手机 登入

    store.state.openId = data.openid;
    store.state.userToken = data.token;
    store.state.sessionKey = data.sessionKey;
    callback && callback();
  }
  //手机登入
  async getTokenByPhone(res) {
    let data = await api_phoneLogin({
      "openid":store.state.openId,
      "iv": res.iv, //小程序调用授权获取手机号返回的iv
      "session_key":store.state.sessionKey,
      "encryptedData":res.encryptedData  //小程序调用授权获取手机号返回的encryptedData
    })
    store.state.userToken = data.token;

    const url = '/pages/index/main';
    wx.redirectTo({
      url
    })
  }
  //存储用户信息到store
  saveUserInfo(res) {
    store.state.wxCode = this.setting.wxCode;
    console.log(res);
    wx.setStorageSync('wxUserInfo', res.userInfo);
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        store.state.latitude = res.latitude;
        store.state.longitude = res.longitude;
      }
    })
    this.getToken(
      () => {
        // wx.setStorageSync('userAuth', store.state.userAuth);
        // wx.setStorageSync('loginToken', store.state.loginToken);
        // let userInfo = store.state.userInfo;
        // let newUserInfo = Object.assign({}, res.userInfo, userInfo);
        // newUserInfo.sex = newUserInfo.sex == undefined ? res.userInfo.gender : newUserInfo.sex;
        // newUserInfo.nickName = newUserInfo.nickName == undefined ? res.userInfo.nickName : newUserInfo.nickName;
        // store.state.userInfo = newUserInfo;
        // wx.setStorageSync('userInfo', newUserInfo);
        wx.setStorageSync('open_id', store.state.openId)
        wx.setStorageSync('login_Token', store.state.loginToken)
        wx.setStorageSync('session_Key', store.state.sessionKey)
        wx.hideLoading();

        const url = '/pages/index/main';
        wx.redirectTo({
          url
        })
        //如果没有token 这里再调用手机登入
        // if (!data.token) {
        //   console.log('token 不存在')
        //   //显示手机号授权按钮
        //   store.state.wxAuthPhoneShow = true;
        // } else {
        //   // 已经登入过的员工之间push 界面
        //   const url = '/pages/index/main';
        //   wx.redirectTo({
        //     url
        //   })
        // }
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
