<template>
  <div>
    <div class="innerBox">
      <Swiper :slideData="slideData" interVal="3000"/>
    </div>
    <div class="space-h-20"></div>
    <div class="content-box">
      <div @click="wifiClick">
        <image
          src="/static/images/wifi@2x.png"
          mode="aspectFill"
          lazy-load="false">
        </image>
        </div>
      <div @click="shilianClick">
        <image
          src="/static/images/shilian@2x.png"
          mode="aspectFill"
          lazy-load="false">
        </image>
      </div>
      <div v-if="userAuth == 'cmPerson'" @click="aoClick">
        <image
          src="/static/images/cmoa@2x.png"
          mode="aspectFill"
          lazy-load="false">
        </image>
      </div>
    </div>
    <div v-if="userAuth == 'cmPerson'" class="cm-enter-box" @click="cmlogin">
        <div>
          员工入口
        </div>
         <image
          src="/static/images/right-arrow@2x.png"
          mode="aspectFill"
          lazy-load="false">
        </image>
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
   cmlogin(){
      wx.navigateTo({ url: "/pages/cmlogin/main" });
   },
    wifiClick() {
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
  mounted() {}
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  image {
    margin-top: 20rpx;
    width: 690rpx;
    height: 210rpx;
  }
}
.cm-enter-box{
  display: flex;
  justify-content: center;
  align-items: center;
  div{
    font-size: 28rpx;
    color: #2095F4;
  }
  image{
    width: 24rpx;
    height: 24rpx;
  }
}
</style>
