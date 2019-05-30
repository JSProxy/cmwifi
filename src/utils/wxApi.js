/*
 * @Author: yaodongyi
 * @Date: 2019-05-21 09:29:36
 * @Description: wx api
 */

import { catchInfo } from "../lib/infoCatch.js";
import { api_login } from "../utils/api.js"
/**
 * 获取code
 * @method wx.login
 * @param {String} e 用户授权信息
 * @param {String} invite_code 邀请码
 */
let login = function (e = {}, invite_code = "") {
  return new Promise((resolve, reject) => {
    if (wx.getStorageSync("loginInfo") != '' && wx.getStorageSync("loginInfo") != undefined) {//已经登陆
      return resolve(wx.getStorageSync("loginInfo"));
    } else {//未登录
      // 调用登录接口
      wx.login({
        success: (res) => {
          console.log(res);
          let data = {
            code: res.code,
            invite_code: invite_code,
            nick_name: e.nickName,
            gender: e.gender,
            avatar_url: e.avatarUrl
          };
          api_login(data).then(res => {
            try {
              wx.setStorageSync("loginInfo", res.data)
            } catch (e) {
              catchInfo("api_login用户登陆信息 setStorageSync", e);
            }
            return resolve(res);
          }).catch(err => {
            console.error("api_login 错误", err);
          });
        },
        fail(err) {
          catchInfo("wxApi-login", err);
          reject(err);
        }
      });
    };
  })
};

/**
 * 重新登录
 * @param {String} invite_code 邀请码
 */
let againLogin = function (invite_code = "") {
  return new Promise((resolve, reject) => {
    // 调用登录接口
    wx.login({
      success: (res) => {
        console.log(res);
        let data = {
          code: res.code,
          invite_code: invite_code,
        };
        api_login(data).then(res => {
          try {
            wx.setStorageSync("loginInfo", res.data)
          } catch (e) {
            catchInfo("api_login用户登陆信息 setStorageSync", e);
          }
          return resolve(res);
        }).catch(err => {
          console.error("api_login 错误", err);
        });
      },
      fail(err) {
        catchInfo("wxApi-login", err);
        reject(err);
      }
    });
  })
}

/**
 * getstorage
 * @param key
 */
let getStorageSync =  function(key){
  try {
    var value = wx.getStorageSync(key)
    if (value) {
      console.log(`wx.getStorageSync(${key})`,value)
      return value;
    }
  } catch (err) {
    catchInfo(`wx.getStorageSync(${key})`, err);
  }
}




/**
 * 封装wxapi
 * @method login wx.login
 */
export let $wx = { login, againLogin,getStorageSync }
