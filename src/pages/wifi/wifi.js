
class WifiTool {
  constructor(){}
  _canIUse() {
    const res = wx.getSystemInfoSync();
    let system = '';
    if (res.platform == 'android') system = parseInt(res.system.substr(8));
    if (res.platform == 'ios') system = parseInt(res.system.substr(4));
    if (res.platform == 'android' && system < 6) {
      console.error('手机版本暂时不支持wifi功能');
      return false;
    }
    if (res.platform == 'ios' && system < 11) {
      console.error('手机版本暂时不支持wifi功能');
      return false;
    }
    return true;
  }
  _openPermission() {
    console.log('_openPermission');
    return new Promise((resolve, rej) => {
      wx.getSetting({
        success(res) {
          console.log('user setting', res, !res.authSetting['scope.userLocation']);
          if (!res.authSetting['scope.userLocation']) {
            wx.authorize({
              scope: 'scope.userLocation',
              success(_res) {
                console.error('authorize success', _res);
                // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                resolve();
              },
              fail(error) {
                console.log('authorize error', error);
                rej(error);
              },
            });
          }
          resolve();
        },
      });
    });
  }
  /**
   * modal弹窗
   * @param {Object} {title:标题|content:内容|showCancel:显示取消按钮(默认true)|next:需要传递的参数}
   */
  _selfModal({ title, content, showCancel = true }) {
    return new Promise((resolve, rej) => {
      wx.showModal({
        title,
        content,
        showCancel,
        success(res) {
          if (res.confirm) {
            resolve(true);
          } else if (res.cancel) {
            resolve(false);
          }
        },
      });
    });
  }
}


class WifiObj extends WifiTool{
  constructor()
  {
    super()
    this.connectName='';
    this.wifiIsOk=false;
  }
  // 初始化wifi模块
   startWifi(){
    return new Promise((resolve,reject)=>{
      wx.startWifi({ success: res => {
          resolve({status:1});
      } });
    })
  }
  //获取当前连接wifi
  getConnectedWifi(){
    return new Promise((resolve,reject)=>{
      wx.getConnectedWifi(
        { success: res =>
          {
          this.connectName = res.wifi.SSID;// 设置目前连接的wifi
          console.log('this.connectName:'+this.connectName);
          resolve(res);
        },
        fail: error => {
          this.connectName = '';
          console.log('error:'+this.connectName);
          resolve(error);
        },
        complete:(data)=>{

        }
    });
    })

  }
  //连接wifi
  connectWifi({ssid,bssid,password}){

    if(!this._canIUse()){
      this._selfModal('温馨提示','手机不支持wifi链接')
      return;
    }
    return new Promise((resolve,reject)=>{
      wx.connectWifi({
        SSID: ssid, //Wi-Fi 设备ssid,
        BSSID: bssid, //Wi-Fi 设备BSSID,
        password: password, //Wi-Fi 设备password,
        success: res => {
        }
      });
    })
  }
  // 监听连接状态
  onWifiConnected(cb){
    wx.onWifiConnected(res => {
      this.connectName = res.wifi.SSID;
      cb && cb(res);
    });
  }

}

export default new WifiObj();
