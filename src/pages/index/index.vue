<template>
  <div>
    <div class="innerBox">
      <Swiper :slideData="slideData" interVal="3000"/>
    </div>
    <div class="space-h-20"></div>
    <div class="content-box">
      <div class="content-row">
        <div @click="wifiClick">wifi</div>
        <div @click="shilianClick">食链</div>
        <div v-if="userAuth == 'cmPerson'" @click="aoClick">AO</div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "@/components/swiper";
export default {
  data() {
    return {
      userInfo: {
        nickName: "mpvue",
        avatarUrl: "http://mpvue.com/assets/logo.png"
      },
      userAuth: "", //用户类型权限
      slideData: [
        {
          url:
            "http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/newsPicture/05558951-de60-49fb-b674-dd906c8897a6",
          name: "111",
          id: "1"
        },
        {
          url:
            "http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/coursePicture/0fbcfdf7-0040-4692-8f84-78bb21f3395d",
          name: "222",
          id: "2"
        },
        {
          url:
            "http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/management-school-picture/7683b32e-4e44-4b2f-9c03-c21f34320870",
          name: "333",
          id: "3"
        }
      ]
    };
  },
  computed: {
    USERAUTH() {
      this.userAuth = this.$store.state.userAuth;
      return this.userAuth;
    }
  },
  components: {
    Swiper
  },
  methods: {
    bindGetUserInfo(e) {
      if (e.mp.detail.rawData) {
        // this.$auth.saveUserInfo(e.mp.detail);
        this.wxAuth = false;
        console.log("用户按了允许授权按钮");
        console.log(e);
        // const url = '/pages/index/main';
        // wx.redirectTo({ url })
      } else {
        wx.navigateBack({
          delta: -1
        });
        console.log("用户按了拒绝按钮");
      }
    },
    handleOk() {
      const url = "/pages/index/main";
      wx.redirectTo({ url });
      // this.$store.state.wxAuthShow = false;
    },
    wifiClick() {
    //    wx.startWifi({ success: res => {
    //     console.log('wifi is ok')
    //     wx.connectWifi({
    //     SSID: "cctv", //Wi-Fi 设备ssid,
    //     BSSID: "DC:A9:04:97:72:C5", //Wi-Fi 设备BSSID,
    //     password: "cctv123456", //Wi-Fi 设备password,
    //     success: res => {
    //     }
    //   });
    // } });

    //    //仅 Android 与 iOS 11 以上版本支持。
    //   wx.onWifiConnected(res => {
    //      wx.showToast({
    //         title: '连接成功', //提示的内容,
    //         icon: 'success', //图标,
    //         duration: 2000, //延迟时间,
    //         mask: true, //显示透明蒙层，防止触摸穿透,
    //         success: res => {}
    //       });
    //   });
      wx.navigateTo({ url: "/pages/wifi/main" });
    },
    shilianClick() {
      wx.navigateTo({ url: "/pages/shilian/main" });
    },
    aoClick() {
      wx.navigateTo({ url: "/pages/ao/main" });
    }
  },

  created() {
    // let app = getApp()
  },
  mounted() {
  },
};
</script>

<style lang='scss' scoped>
.auth_box {
  padding: 10px 20px;
  background-color: pink;
}
.innerBox {
  padding: 0 0px;
}
.content-box {
  display: flex;
  flex: 1;
  background-color: pink;
  .content-row {
    height: 100rpx;
    display: flex;
    flex: 1;
    flex-direction: row;
    background-color: orange;
    justify-content: space-around;
    align-items: center;
    div {
      border-radius: 50%;
      height: 100rpx;
      line-height: 100rpx;
      text-align: center;
      width: 100rpx;
      background-color: pink;
    }
  }
}
</style>
