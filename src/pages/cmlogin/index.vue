<template>
  <div class="cmlogin-wrapper">
    <div class="header-box">
      <image class="cmlogo" mode="aspectFill" src="/static/images/cmlogo@2x.png"></image>
    </div>
    <form  class="content-box" bindsubmit="formSubmit" bindreset="formReset">
      <input name="account" class="login-input"  type="text" placeholder="输入OA账号" />
      <div class="space-h-20"></div>
      <input name="password" class="login-input" type="text" placeholder="输入OA密码"/>
      <button class="submit-btn" form-type="submit">立即登入</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
  },
  components: {
  },
  methods: {
  },

  created () {

  }
}
</script>

<style lang='scss' scoped>
.cmlogin-wrapper{
  .cmlogo{
    width: 247rpx;
    height: 80rpx;
    background-color: white;
  }
  .header-box{
    display: flex;
    margin-top: 100rpx;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 28rpx;
  }
  .content-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100rpx;
    .login-input{
      width: 610rpx;
      height: 100rpx;
      font-size: 28rpx;
      border-bottom: 1rpx solid rgba(204,204,204,1);
    }
    .submit-btn{
      margin-top: 80rpx;
      width:610rpx;
      height:88rpx;
      background:rgba(32,149,244,1);
      box-shadow:0rpx 8rpx 12rpx 0rpx rgba(32,149,244,0.2);
      border-radius:8rpx;
      color: white;
    }
  }
}


</style>
