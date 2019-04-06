<template>
  <div class="swiper-left" :style="swiperStyle">
    <div class="swp-right">
      <slot></slot>
    </div>
    <div class="swp-left" :style="leftStyle">
      <slot name="left"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwiperLeft',
  props: {
    width: {
      default () {
        return '25%';
      }
    },
    defaultSlid: {
      default () {
        return false
      }
    }
  },
  data () {
    return {
      slid: this.defaultSlid // 是否已滑动
    }
  },
  computed: {
    swiperStyle () {
      return {
        transform: `translateX(${this.slid ? '-' + this.width : 0})`
      }
    },
    leftStyle () {
      return {
        width: this.width,
        marginRight: '-' + this.width,
      }
    }
  }
}
</script>

<style lang="css">
.swiper-left {
  width: 100%;
  overflow: hidden;
}
.swiper-left .swp-right,
.swiper-left .swp-left {
  height: 100%;
  float: left;
}
.swiper-left .swp-right {
  width: 100%;
}
</style>


