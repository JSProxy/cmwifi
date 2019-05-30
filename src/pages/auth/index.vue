<template>
  <div class="wrapper">
     <i-modal title="微信授权获信息" :visible="wxAuth" :show-ok="showButton" :show-cancel="false">
        <div class="auth_box">
          <button open-type="getUserInfo" class="dingdang-btn"  @getuserinfo="bindGetUserInfo" @click="handleOk">确定</button>
        </div>
    </i-modal>
  </div>
</template>

<script>
// import { removeCookie } from '@/router/cookie'
export default {
  name:'auth',
  data () {
    return {
      userAuth:'cmperson', //用户类型权限
      showButton: true, //不显示组件按钮
      wxAuth: true      //微信授权按钮
    }
  },
  computed: {
    WXAUTH(){
      // wx.hideLoading();
      // this.wxAuth = this.$store.state.wxAuthShow;
      return this.wxAuth;
    }
  },
  methods: {
    bindGetUserInfo (e) {
      if (e.mp.detail.rawData){

        // this.$auth.saveUserInfo(e.mp.detail);
        this.wxAuth = false;
        console.log('用户按了允许授权按钮')
        console.log(e)
      const url = '/pages/index/main';
      wx.redirectTo({ url })
      } else {
        wx.navigateBack({
          delta: -1
        })
        console.log('用户按了拒绝按钮')
      }
    },
    handleOk(){
       const url = '/pages/index/main';
      wx.redirectTo({ url })
      // this.$store.state.wxAuthShow = false;
    }
  },
  mounted(){
    // removeCookie("accessToken")
    // wx.showLoading({
    //   title: '加载中'
    // })
    // this.$auth.verify(()=>{
    //   if(this.$route.query.page){
    //     wx.navigateBack({
    //       delta: -1
    //     })
    //   }else{
    //     const url = '/pages/index/main'
    //     wx.redirectTo({ url })
    //   }
    // });
  }
}
</script>

<style lang='scss' scoped>
  .auth_box{
    padding:10px 20px;
    background-color: pink;
  }
  .dingdang-btn{
    background:#f99000;
    color:#fff;
    font-size:16px;
  }
  .wrapper{
    position: absolute;
    top: 0rpx;
    bottom: 0rpx;
    left: 0rpx;
    right: 0rpx;
    background-color: red;
  }
</style>
