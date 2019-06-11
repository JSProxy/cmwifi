<template>
  <div class="cmlogin-wrapper">
    <div class="header-box">
      <image class="cmlogo" mode="aspectFill" src="/static/images/cmlogo@2x.png"></image>
    </div>
    <form v-if="phoneLogin" class="content-box" report-submit @submit="formPhoneSubmit">
      <input
        ref="mobile"
        name="phoneAccount"
        class="login-input"
        type="text"
        focus
        placeholder="请输入手机号"
        v-model="phone"
      >
      <div class="space-h-20"></div>
      <div class="code-box">
        <input
          name="phoneCode"
          v-model="phoneCode"
          class="login-code"
          type="text"
          placeholder="请输入验证码"
        >
        <button
          class="login-code-btn"
          @click="getCode"
          :disabled="time==-1?false:true"
          size="mini"
        >{{time==-1?'获取验证码':'请稍后'}}{{time==-1?'':time}}</button>
      </div>
      <button class="submit-btn" form-type="submit">立即登入</button>
    </form>
    <form v-if="!phoneLogin" class="content-box" report-submit @submit="formSubmit">
      <input name="account" class="login-input" type="text" focus placeholder="输入OA账号">
      <div class="space-h-20"></div>
      <input name="password" class="login-input" type="text" placeholder="输入OA密码">
      <button class="submit-btn" form-type="submit">立即登入</button>
    </form>
  </div>
</template>

<script>
import { api_aoLogin, api_phoneLogin, api_phoneCode } from "../../api/index";
export default {
  data() {
    return {
      oacount: "",
      password: "",
      phone: "",
      phoneCode: "",
      openId: "",
      phoneLogin: false,
      isCanGetCode: true,
      time: -1,
      timer: "",
      isSend: false //是否发送过code
    };
  },
  computed: {
    OPPENID() {
      this.openId = this.$store.state.openId;
      return this.openId;
    }
  },
  methods: {
    async formPhoneSubmit(e) {
      // 手机号登入
      if (!this.isSend) {
        wx.showToast({
          title: "请先获取验证码", //提示的内容,
          icon: "none", //图标,
          duration: 1500, //延迟时间,
          mask: true //显示透明蒙层，防止触摸穿透,
        });
        return;
      }
      console.log(e);
      // 登入
      let phone = e.mp.detail.value.phoneAccount;
      let code = e.mp.detail.value.phoneCode;

      if (phone && code) {
        wx.showLoading({
          title: "登入中", //提示的内容,
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: res => {}
        });
        let data = await api_phoneLogin({ openid: this.openId, phone, code });
        console.log(data);
        if (data.token) {
          //有token 就缓存一下
          wx.setStorageSync("login_Token", data.token);
          this.$store.commit("setToken", data.token);
        } else {
          wx.setStorageSync("login_Token", "");
          this.$store.commit("setToken", "");
        }
        wx.hideLoading();

        const url = "/pages/index/main";
        wx.redirectTo({
          url
        });
      } else {
        wx.showToast({
          title: "请确认手机号和验证码是否正确", //提示的内容,
          icon: "none", //图标,
          duration: 1500, //延迟时间,
          mask: true //显示透明蒙层，防止触摸穿透,
        });
      }
    },
    async formSubmit(e) {
      //账号密码登入
      let account = e.mp.detail.value.account;
      let password = e.mp.detail.value.password;
      if (account && password) {
        wx.showLoading({
          title: "登入中", //提示的内容,
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: res => {}
        });
        let data = await api_aoLogin({
          oaMiniOpenid: this.openId,
          username: account,
          password
        });
        if (data.token) {
          //有token 就缓存一下
          wx.setStorageSync("login_Token", data.token);
          this.$store.commit("setToken", data.token);
        } else {
          wx.setStorageSync("login_Token", "");
          this.$store.commit("setToken", "");
        }
        wx.hideLoading();

        const url = "/pages/index/main";
        wx.redirectTo({
          url
        });
      } else {
        wx.showToast({
          title: "请输入账号和密码", //提示的内容,
          icon: "none", //图标,
          duration: 1500, //延迟时间,
          mask: true //显示透明蒙层，防止触摸穿透,
        });
      }
    },
    isPhone(val) {
      // let Pattern = /^1[34578]\d{9}$/;
      let Pattern = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      return Pattern.test(val);
    },
    async getCode() {
      console.log(this.phone);
      if (this.isPhone(this.phone)) {
        if (this.time === -1) {
          this.isSend = true;
          this.timerStart(60);
          //获取验证码
          let data = await api_phoneCode({ phone: this.phone });
        }
      } else {
        wx.showToast({
          title: "请输入正确的手机", //提示的内容,
          icon: "none", //图标,
          duration: 1500, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: res => {}
        });
        return;
      }
    },
    timerStart(time) {
      if (!this.time) return;
      this.time = time;
      this.timer = setInterval(() => {
        this.time--;
        if (this.time === 0) {
          clearInterval(this.timer);
          this.timer = null;
          this.time = -1;
        }
      }, 1000);
    }
  },
  onLoad(e) {
    // Object.assign(this.$data, this.$options.data()) //清空data
    // this.phoneLogin = e.phoneLogin;
    // console.log(this.phoneLogin);
    //  this.$forceUpdate(); //重绘
  },
  mounted() {
    // Object.assign(this.$data, this.$options.data())
    // this.phoneLogin =  Boolean() this.$root.$mp.query.phoneLogin;
    if (
      this.$root.$mp.query.phoneLogin &&
      this.$root.$mp.query.phoneLogin == "false"
    ) {
      this.phoneLogin = false;
    } else {
      this.phoneLogin = true;
    }
    // this.$root.$mp.appOptions // app onLaunch/onShow
  }
};
</script>

<style lang='scss' scoped>
.hide {
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
