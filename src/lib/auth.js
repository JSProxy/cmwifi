import store from '../store/index'

import { setCookie, getCookie, removeCookie } from './cookie'
import md5 from 'js-md5'
import Qc from 'qs'

class auth {
  setting = {
    timestamp: null,  //当前时间戳
    wxCode:'',        //登陆获取的微信code
    callback: ()=>{}  //配置回调函数
  }

  //随机字符串
  randomString(len, charSet) {
    len = len || 10;
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
    var randomString = '';
    for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
  }

  //请求获取TOKEN
  getAccessToken(callback){
      let code = this.setting.wxCode;
      let timestamp = this.setting.timestamp;
      let rand_str = this.randomString();
      let device_id = md5(rand_str);
      let appid = '63630250';
      var json = {
        app_id: appid,
        app_secret: 'OQqTJGfhcIfurXbSydKHoceEaSHOoKux',
        device_id: device_id,
        rand_str: rand_str,
        timestamp: timestamp
      }
      let md_5 = md5(Qc.stringify(json));
      wx.showLoading({
        title: '加载中'
      })

      //获取token
      wx.request({
        url: process.env.BASE_API + "/5c0601d5904dc",
        method:'post',
        header: {
          'version': store.state.version
        },
        data: {
          app_id: appid,        //app_id服务器颁发的应用ID
          signature: md_5,      //app_id=服务器颁发的应用ID&app_secret=服务器颁发的应用秘钥&device_id=设备唯一ID&rand_str=随机字符串×tamp=当前系统时间戳
          device_id: device_id, //设备id
          rand_str: rand_str,   //包含字母数字下划线的随机字符
          timestamp: timestamp  //当前调用时间戳
        },
        success: res => {
          let json = res.data;
          if (json.code == 1) {
            store.state.accessToken = json.data.access_token;
            let time = parseInt(timestamp) + parseInt(json.data.expires_in) * 1000;
            setCookie("accessToken", json.data.access_token);
            setCookie("expired", time);
            removeCookie('indexToken');
            //拿到code和access_token去请求微信openid
            wx.request({
              url: process.env.BASE_API + "/5c0e8c6c2859f",
              method:'post',
              header: {
                'version': store.state.version,
                'access-token': json.data.access_token
              },
              data:{
                code:code,
              },
              success: res => {
                if (res.data.code == 1) {
                  store.state.openId = res.data.data.openid;
                  store.state.userToken = res.data.data.user_token;
                  store.state.userAuth = res.data.data.user_type || 'guest';
                  if(store.state.userAuth != 'guest'){
                    store.state.userInfo = {
                      username: res.data.data.username,                               //姓名
                      nickName: res.data.data.nickName,                               //昵称
                      sex: res.data.data.sex,                                         //性别
                      avatarUrl: res.data.data.h_icon_url,                            //头像
                      mobile: res.data.data.mobile,                                   //用户手机
                      address: res.data.data.address,                                 //地址
                      balance: res.data.data.balance,                                 //账户余额
                      hadSetPwd: res.data.data.hadSetPwd,                             //是否已修改密码

                      country: '',          //国家
                      province: '',         //省
                      city: '',             //市
                      latitude: '',         //经度
                      longitude: '',        //纬度
                      language: '',         //语言

                      children: res.data.data.children || [],                         //家长小孩

                      signature: res.data.data.signature || '',      //教师签名
                      companyName: res.data.data.work_unit,         //教师工作单位
                      course: res.data.data.course || '',           //教师任课课程
                      areaId: res.data.data.area_id,                //区域id
                      area: res.data.data.area,                     //
                      storeName: res.data.data.store_name,
                      storeId: res.data.data.store_id               //学校名称id/公司名称id
                    }
                  }
                  callback && callback();
                }
              },
              complete: res => {
                wx.hideLoading();
                if (res.data.code != 1) {
                  setTimeout(()=>{
                    wx.showToast({
                      title: res.data.msg,
                      icon: "none",
                      duration: 3000,
                      mask: false
                    })
                  },30)
                }
              }
            });

          }
          this.setting.callback();
        },
        complete: res => {
          wx.hideLoading();
          if (res.data.code != 1) {
            setTimeout(()=>{
              wx.showToast({
                title: res.data.msg,
                icon: "none",
                duration: 3000,
                mask: false
              })
            },30)
          }
        }
      });
  }

  //存储用户信息到store
  saveUserInfo(res){
    store.state.wxCode = this.setting.wxCode;
    setCookie('wxUserInfo', res.userInfo);
    wx.getLocation({
      type: 'wgs84',
      success: (res)=> {
        store.state.latitude = res.latitude;
        store.state.longitude = res.longitude;
      }
    })
    this.getAccessToken(()=>{
      setCookie('openId', store.state.openId);
      setCookie('userAuth', store.state.userAuth);
      setCookie('userToken', store.state.userToken);
      let userInfo = store.state.userInfo;
      let newUserInfo = Object.assign({}, res.userInfo, userInfo);
      newUserInfo.sex = newUserInfo.sex == undefined ? res.userInfo.gender : newUserInfo.sex;
      newUserInfo.nickName = newUserInfo.nickName == undefined ? res.userInfo.nickName : newUserInfo.nickName;
      store.state.userInfo = newUserInfo;
      setCookie('userInfo', newUserInfo);
      const url = '/pages/index/main';
      wx.redirectTo({ url })
    });
  }

  //获取微信用户信息
  getUserInfo(){
     wx.getSetting({
      success: (res)=>{
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res)=> {
              this.saveUserInfo(res);
              console.log('用户已经授权过')
            }
          })
        }else{
          this.checkWeixin();
          console.log('用户还未授权过===')
        }
      }
    })
  }

  //验证用户微信版本
  checkWeixin (){
    if(wx.canIUse('button.open-type.getUserInfo')){
      console.log('用户微信版本可用')
      store.state.wxAuthShow = true;
      // 用户版本可用
    }else{
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
  login(){
    wx.login({
      success: (res)=>{
        if(res.code){
          this.setting.wxCode = res.code;
          this.getUserInfo();
          console.log(res, '用户登陆成功')
        }
      }
    })
  }

  //Token是否过期或不存在
  verify(callback){
    let timestamp = parseInt(new Date().getTime());
    let accessToken = getCookie("accessToken");
    let expired = parseInt(getCookie('expired')); //获取上一次token时间

    this.setting.callback = callback;
    this.setting.timestamp = timestamp;

    let pages = getCurrentPages(); //获取加载的页面
    let currentPage = pages[pages.length-1];//获取当前页面对象
    if(accessToken){
      if(expired > timestamp){
        store.state.openId = getCookie('openId');
        store.state.userAuth = getCookie('userAuth');
        store.state.userToken = getCookie('userToken');
        store.state.userInfo = getCookie('userInfo');
        this.setting.callback();
      }else{ //Token是否过期或不存在
        if(currentPage.route == 'pages/auth/main')
        {
          this.login();
        }else{
          const url = '/pages/auth/main'
          wx.redirectTo({ url });
        }
      }
    }else{//Token不存在
      if(currentPage.route == 'pages/auth/main'){
        this.login();
      }else{
        let index = getCookie('indexToken') || 1;
        if(index > 3){
          wx.showModal({
            title: '警告',
            content: '接口获取accessToken三次失败',
            success: function (res) {
              if (res.confirm) {
              }
            }
          })
        }else{
          index++;
          setCookie('indexToken', index);
          const url = '/pages/auth/main'
          wx.redirectTo({ url });
        }
      }
    }
  }
}

export { auth }
