<template>
  <div class="wifi-wrapper">
    <div class="title">可用WIFI列表</div>
    <div class="content">
      <div class="content-item" @click="connectWifi(item)" v-for="item in wifiList" :key="item.id">
        <div class="left-box">
          <div class="wifi-title" :class="connectName == item.name?'wifi-active':''">{{item.name}}</div>
          <div class="space-h-20"></div>
          <div class="wifi-desc">
            <div>{{connectName == item.name?'已连接':'可连接'}}</div>
            <div class="space-w-20"></div>
            <div>(网络质量良好)</div>
            </div>
        </div>
        <image
          src="/static/images/wifi-icon-4@2x.png"
          mode="aspectFit"
          lazy-load="false">
        </image>
      </div>
    </div>
  </div>
</template>
<script>
import { api_wifiList } from'../../api/index'
import wifiObj from './wifi'
export default {
  data () {
    return {
      wifiList:[],
      connectName:'',
      status:0
    }
  },
  computed: {

  },
  components: {
  },
  methods: {
    async sendHttp()
    {
      let data = await api_wifiList({floor:8});
      this.wifiList =data;
      console.log(data);
      // this.wifiList = [
      // {
      //   name:"cctv",
      //   bssid:"DC:A9:04:97:72:C5",
      //   password:"cctv123456",
      // }
      // ];
    },
    connectWifi(item)
    {
        if(item.name == this.connectName)
        {
          wx.showToast({
            title: 'wifi已经连接成功', //提示的内容,
            icon: 'success', //图标,
            duration: 2000, //延迟时间,
            mask: true, //显示透明蒙层，防止触摸穿透,
          });
        }else{
        wifiObj.connectWifi({
        ssid: item.name, //Wi-Fi 设备ssid,
        bssid: item.bssid, //Wi-Fi 设备BSSID,
        password: item.password, //Wi-Fi 设备password,
        })
        }

    }
  },
  async onLoad(){
    Object.assign(this.$data,this.$options.data()); //清空data

    this.sendHttp();
    let data = await wifiObj.startWifi();
    this.status = data.status;
    if(data.status)
    {
      console.log('wifi初始化成功');
    }
    // 监听wifi连接仅 Android 与 iOS 11 以上版本支持。
    wifiObj.onWifiConnected((res)=>
    {
      console.log('已经连接');
      console.log(res);
      this.connectName = wifiObj.connectName;
      wx.showToast({
            title: 'wifi已经连接成功', //提示的内容,
            icon: 'success', //图标,
            duration: 2000, //延迟时间,
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: res => {}
          });
    })
  },
  async onShow()
  {
  // 显示页面时获取当前连接的wifi
  let data = await wifiObj.getConnectedWifi();
  if(data.errMsg == "getConnectedWifi:ok")
    {
    this.connectName = data.wifi.SSID
    }else
    {
      console.log('wifi error');
      this.connectName = "";
    };
  },
}
</script>

<style lang='scss' scoped>
.wifi-wrapper{
  .title{
  height:80rpx;
  line-height: 80rpx;
  padding-left: 30rpx;
  background:rgba(247,247,247,1);
  color:#999999;
  font-size: 29rpx;
  }
  .content{
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 0rpx 30rpx;
    box-sizing: border-box;
    .content-item{
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 35rpx 0rpx;
      border-radius: 15rpx;
      &:hover{
        background-color: rgba(32,149,244,0.3);
      }
      .left-box{
        display: flex;
        flex: 1;
        flex-direction: column;
        .wifi-title{
          font-size:32rpx;
          font-family:PingFang-SC-Bold;
          font-weight:bold;
        }
        .wifi-active{
          color:rgba(32,149,244,1);
        }
        .wifi-desc{
          font-size:28rpx;
          font-family:PingFang-SC-Medium;
          font-weight:500;
          color:rgba(153,153,153,1);
          display: flex;
        }
      }
      image{
        width: 40rpx;
        height: 29rpx;
      }
    }
  }
}
</style>
