function login() {
  return new Promise((res, rej) => {
    wx.login({
      success: (resLogin) => {
        console.log('resLogin', resLogin, !resLogin.code);
        if (!resLogin.code) {
          rej('登录失败！' + resLogin.errMsg);
        }
        wx.setStorageSync('code', resLogin.code);
        res(resLogin.code);
      },
      fail(err) {
        console.log(err);
        rej(err);
      },
    });
  });
}
/**
 * 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。
 */
function getSetting() {
  return new Promise((res, rej) => {
    wx.getSetting({
      success(resSetting) {
        res(resSetting);
      },
      fail(err) {
        console.log(err);
        rej(err);
      },
    });
  });
}

function showModal(option) {
  return new Promise((resolve, rej) => {
    wx.showModal({
      title: '提示',
      content: '消息提示',
      ...option,
      success(res) {
        if (res.confirm) {
          resolve(true);
        } else if (res.cancel) {
          resolve(false);
        }
      },
      fail(error) {
        rej(error);
      },
    });
  });
}
export default {
  login,
  getSetting,
  showModal,
};
