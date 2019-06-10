<template>
    <div class="swiper">
    <swiper :indicator-dots="indicatorDots" circular=true :autoplay="autoplay" :interval="interval" :duration="duration" @change="swiperChange">
        <block v-for="(item, index) in slideData" :key="index">
            <swiper-item>
                <a :href="'/pages/detail/main?id='+item.val" v-if="item.type==2" class="aimg">
                  <image :src="item.url" class="slide-image" mode="aspectFill"/>
                </a>
                <image :src="item.url" class="slide-image" mode="aspectFill" v-else/>
            </swiper-item>
        </block>
    </swiper>
    <view class="dots">
      <block v-for="(item, index) in slideData" :key="index">
        <view class="dot" v-if="index == swiperCurrent"></view>
        <view class="dot active" v-else-if="index != swiperCurrent"></view>
      </block>
    </view>
    </div>
</template>

<script>
export default {
  props: {
    interVal:"1000",
    autoPlay:"true",
    slideData: {
      type: Array
    }
  },
  data() {
    return {
      swiperCurrent:0,
      indicatorDots: false,
      autoplay: true,
      interval: 3000,
      duration: 500
    };
  },
  methods:{
    swiperChange(e){
      this.swiperCurrent = e.target.current;
    }
  },
  computed:{
    TIME(){
      this.interval = parseInt(this.interVal || this.interval);
      return this.interval;
    },
    AUTOPLAY(){
     this.autoplay = JSON.parse(this.autoPlay || this.autoplay);
     return this.autoplay;
    }
  },
  created(){

  }
};
</script>

<style scoped lang="scss">
.swiper {
  position:relative;
  width:100%;
  ._swiper{
    height:188px;
    overflow:hidden;
    ._swiper-item{
      box-sizing: border-box;
      padding: 0rpx 20rpx;
      overflow:hidden;
    }
  }
  .dots{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10px;
    display: flex;
    justify-content: center;
  }
  .dots .dot{
    margin: 0 4px;
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 8px;
    transition: all .6s;
  }
  .dots .dot.active{
    background:rgba(0,0,0, 0.5);
  }
  image, .aimg{
    border-radius:10px;
    height: 100%;
    width: 100%;
  }
}

</style>
