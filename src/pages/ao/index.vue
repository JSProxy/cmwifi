<template>
  <div>
     <web-view
      src="https://www.baidu.com/index.php?tn=monline_3_dg"
      @message="message"
      @load="load"
      @error="error"
      >
     </web-view>
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
    load(e){
      console.log('加载完成')
      console.log(e);
    },
    error(e){
       console.log('加载失败')
      console.log(e);
    },
    message(e){
      console.log('接受的数据')
      console.log(e);
    }
  },
  created () {

  }
}
</script>

<style lang='scss' scoped>

</style>
