<template>
  <div class="wrapper">

    <div class="header-box">
      <image class="cmlogo" mode="aspectFill" src="/static/images/cmlogo@2x.png"></image>
      <div class="space-h-20"></div>
      <div class="space-h-10"></div>
      <div>深圳市超盟金服技术信息服务有限公司</div>
    </div>
     <i-modal  :visible="wxAuth" :show-ok="showButton" :show-cancel="false">
        <div class="auth_box">
          <div>小程序需要登入才能进行提供更多服务,是否授权登陆？</div>
           <div class="space-h-20"></div>
            <div class="space-h-20"></div>
          <div class="btn-box">
             <button open-type="getUserInfo" plain='true' size="mini" class="dingdang-btn"  @getuserinfo="bindGetUserInfo" @click="handleOk">授权登陆</button>
          </div>
        </div>
    </i-modal>
     <i-modal  :visible="wxAuthPhone" :show-ok="showButton" :show-cancel="false">
        <div class="auth_box">
          <div>小程序需要获取您的手机号</div>
           <div class="space-h-20"></div>
            <div class="space-h-20"></div>
          <div class="btn-box">
             <button open-type="getPhoneNumber" plain='true' size="mini" class="dingdang-btn"  @getuserinfo="getPhoneNumber" @click="handleOk">允许</button>
          </div>
        </div>
    </i-modal>
  </div>
</template>

<script>
export default {
  name:'auth',
  data () {
    return {
      showButton: false, //不显示组件按钮
      wxAuth: false,      //微信授权按钮
      wxAuthPhone:false //手机授权按钮
    }
  },
  computed: {
    WXAUTH(){
      wx.hideLoading();
      this.wxAuth = this.$store.state.wxAuthShow;
      return this.wxAuth;
    },
    WXAUTHPHONE(){
      this.wxAuthPhone = this.$store.state.wxAuthPhoneShow;
      return this.wxAuthPhone;
    }
  },
  methods: {
    bindGetUserInfo (e) {
      console.log(e);
      if (e.mp.detail.rawData)
      {
        this.$auth.saveUserInfo(e.mp.detail);
        this.wxAuth = false;
      } else {
        wx.navigateBack({
          delta: -1
        })
        console.log('用户按了拒绝按钮')
      }
    },
    getPhoneNumber(e){
       if (e.mp.detail.rawData)
      {
        this.$auth.getTokenByPhone(e.mp.detail);
        this.wxAuthPhone = false;
      } else {
        wx.navigateBack({
          delta: -1
        })
        console.log('用户按了拒绝按钮')
      }
    },
    handleOk()
    {
      this.$store.state.wxAuthShow = false;
      this.$store.state.wxAuthPhoneShow = false;
      console.log('sss');
    }
  },
  mounted(){
    // this.$root.$mp.appOptions // app onLaunch/onShow
    // this.$root.$mp.query
    // console.log( this.$root.$mp.appOptions)
    // console.log( this.$root.$mp.query)
    // this.$store.state.floor = this.$root.$mp.query.floor;
    // console.log(this.$store.state.floor);
    // console.log(this.$root.$mp.appOptions)
     wx.setStorageSync('floor',this.$root.$mp.appOptions.query.floor);
     this.$store.commit('setFloor',this.$root.$mp.appOptions.query.floor)
    // 扫码进入 后进行跳转
    this.$auth.login();
    //  let data = wx.getStorageSync('logininfo');
    // if(data){
    //   wx.redirectTo({ url: '/pages/index/main' });
    // }else
    // {
    //     wx.redirectTo({ url:  '/pages/cmlogin/main' });
    //     //  wx.redirectTo({ url: '/pages/index/main' });
    // }
  },
}
</script>

<style lang='scss' scoped>
  .auth_box{
    padding:20rpx 20rpx;
    text-align: left;
  }
  .btn-box{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
    .dingdang-btn{
      margin-right: 0px;
      color:#2095F4;
      border: 0px solid transparent;
    }
  }
  .wrapper{
    position: absolute;
    top: 0rpx;
    bottom: 0rpx;
    left: 0rpx;
    right: 0rpx;
    background-color: white;
  }
  .cmlogo{
    width: 247rpx;
    height: 80rpx;
    background-color: white;;
  }
  .header-box{
    display: flex;
    margin-top: 100rpx;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 28rpx;
  }
</style>
