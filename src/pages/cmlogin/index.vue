<template>
  <div class="cmlogin-wrapper">
    <div class="header-box">
      <image class="cmlogo" mode="aspectFill" src="/static/images/cmlogo@2x.png"/>
    </div>
    <form v-if="phoneLogin" class="content-box"  report-submit @submit="formPhoneSubmit">
      <input name="phoneAccount" class="login-input" type="text" focus placeholder="请输入手机号">
      <div class="space-h-20"></div>
      <div class="code-box">
        <input name="phoneCode" class="login-code" type="text" placeholder="请输入验证码">
        <button class="login-code-btn" @click="getCode" :disabled='time==-1?false:true' size="mini">{{time==-1?'获取验证码':'请稍后'}}{{time==-1?'':time}}</button>
      </div>
      <button class="submit-btn" form-type="submit">立即登入</button>
    </form>
    <form  v-if="!phoneLogin" class="content-box" report-submit @submit="formSubmit">
      <input name="account" class="login-input" type="text" focus placeholder="输入OA账号">
      <div class="space-h-20"></div>
      <input name="password" class="login-input" type="text" placeholder="输入OA密码">
      <button class="submit-btn" form-type="submit">立即登入</button>
    </form>
  </div>
</template>

<script>
import { api_aoLogin } from "../../api/index";
export default {
  data() {
    return {
      oacount: "",
      password: "",
      openId: "",
      phoneLogin: false,
      isCanGetCode:true,
      time:-1,
      timer:'',
      isSend:false //是否发送过code
    };
  },
  computed: {
  },
  methods: {
    formPhoneSubmit(e) {
      //手机号登入
      if(!this.isSend){
         wx.showToast({
          title: "请先获取验证码", //提示的内容,
          icon: "none", //图标,
          duration: 1500, //延迟时间,
          mask: true //显示透明蒙层，防止触摸穿透,
        });
        return
      }

      let phone = e.mp.detail.value.phoneAccount;
      let code = e.mp.detail.value.phoneCode;
      if (phone && code) {
      } else {
        wx.showToast({
          title: "请确认手机号和验证码是否正确", //提示的内容,
          icon: "none", //图标,
          duration: 1500, //延迟时间,
          mask: true //显示透明蒙层，防止触摸穿透,
        });
      }
    },
    formSubmit(e) {
      //账号密码登入
      let account = e.mp.detail.value.account;
      let password = e.mp.detail.value.password;
      if (account && password) {
      } else {
        wx.showToast({
          title: "请输入账号和密码", //提示的内容,
          icon: "none", //图标,
          duration: 1500, //延迟时间,
          mask: true //显示透明蒙层，防止触摸穿透,
        });
      }
    },
    getCode(){
       if(this.time === -1)
       {
         this.isSend = true;
         this.timerStart(60);
      }
    },
    timerStart(time){
      if (!this.time) return;
      this.time = time;
      this.timer = setInterval(()=>{
        this.time--;
        if(this.time === 0){
          clearInterval(this.timer);
          this.timer = null;
          this.time = -1
        }
      },1000)
    }
  },
  onLoad(e){
    // Object.assign(this.$data, this.$options.data()) //清空data
    // this.phoneLogin = e.phoneLogin;
    // console.log(this.phoneLogin);
    //  this.$forceUpdate(); //重绘

  },
  mounted() {
    // Object.assign(this.$data, this.$options.data())
    // this.phoneLogin =  Boolean() this.$root.$mp.query.phoneLogin;
    if( this.$root.$mp.query.phoneLogin && this.$root.$mp.query.phoneLogin== 'false')
    { this.phoneLogin = false;

    }else{
      this.phoneLogin = true;
    }
    // this.$root.$mp.appOptions // app onLaunch/onShow
  },
};
</script>

<style lang='scss' scoped>
.hide{
  height: 0rpx;
  overflow: hidden;
}
.cmlogin-wrapper {
  .cmlogo {
    width: 247rpx;
    height: 80rpx;
    background-color: white;
  }
  .header-box {
    display: flex;
    margin-top: 100rpx;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 28rpx;
  }
  .content-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100rpx;
    .login-input {
      width: 610rpx;
      height: 100rpx;
      font-size: 28rpx;
      border-bottom: 1rpx solid rgba(204, 204, 204, 1);
    }
    .code-box {
      width: 610rpx;
      height: 100rpx;
      display: flex;
      align-items: flex-end;
      .login-code {
        width: 310rpx;
        height: 100rpx;
        font-size: 28rpx;
        border-bottom: 1rpx solid rgba(204, 204, 204, 1);
      }
      .login-code-btn {
        height: 50rpx;
        width: 200rpx;
      }
    }

    .submit-btn {
      margin-top: 80rpx;
      width: 610rpx;
      height: 88rpx;
      background: rgba(32, 149, 244, 1);
      box-shadow: 0rpx 8rpx 12rpx 0rpx rgba(32, 149, 244, 0.2);
      border-radius: 8rpx;
      color: white;
    }
  }
}
</style>
