class WifiObj{
  constructor(){
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
