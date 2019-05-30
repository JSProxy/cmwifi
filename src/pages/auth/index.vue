<!--  -->
<template>
  <div>
    <van-popup show="AuthShow" @close="onClose">
      <div class="auth-box">
        <button open-type='getUserInfo' class="cm-wifi" @getuserinfo="bindGetUserInfo" @click="handleOk">确定</button>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name:'auth',
  data () {
    return {
      AuthShow:true //默认显示授权
    };
  },
  components: {},

  computed: {},

  mounted: {},

  methods: {
    handleOk(){
    },
    bindGetUserInfo(e){
      console.log(e)
      }
  }
}

</script>
<style lang='scss' scoped>
</style>
