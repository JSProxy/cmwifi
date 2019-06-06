<template>
  <div class="wifi-wrapper">
    <div class="title">可用WIFI列表</div>
    <div class="content">
      <div class="content-item" @click="connectWifi" v-for="item in wifiList" :key="item.id">
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
export default {
  data () {
    return {
      wifiList:[],
      connectName:''
    }
  },
  computed: {

  },
  components: {
  },
  methods: {
    async sendHttp()
    {
      let data = await api_wifiList({floor:11});
      this.wifiList =data;
      console.log(data);
    },
    connectWifi(item){

        wx.connectWifi({
        SSID: item.name, //Wi-Fi 设备ssid,
        BSSID: "DC:A9:04:97:72:C5", //Wi-Fi 设备BSSID,
        password: item.password, //Wi-Fi 设备password,
        success: res => {
        }
      });

       //仅 Android 与 iOS 11 以上版本支持。
      wx.onWifiConnected(res => {
         wx.showToast({
            title: '连接成功', //提示的内容,
            icon: 'success', //图标,
            duration: 2000, //延迟时间,
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: res => {}
          });
      });
    }
  },
  created () {

  },
  mounted() {
    this.sendHttp();

    // wx.startWifi({ success: res => {} });
    // wx.getConnectedWifi({ success: res => {} }); //获取当前连接wifi
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
