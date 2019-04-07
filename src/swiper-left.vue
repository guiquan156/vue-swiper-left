<template>
  <div class="swiper-left">
    <div class="swp-item"
      :style="swiperStyle"
      ref="swp">
      <div class="swp-left">
        <slot></slot>
      </div>
      <div class="swp-right" :style="leftStyle">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { parse } from 'path';
export default {
  name: 'SwiperLeft',
  props: {
    width: {
      default () {
        return 100;
      }
    },
    minWidth: {
      default () {
        return 80;
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
        transform: `translateX(${this.slid ? '-' + this.width : 0}px)`
      }
    },
    leftStyle () {
      return {
        width: this.width + 'px',
        marginRight: `-${this.width}px`,
      }
    }
  },
  mounted () {
    const $swp = this.$refs.swp;
    let startTouch = null;
    let startStamp = 0;
    let direction = ''; // 滑动方向，水平'hor'或垂直'ver'
    let pos = 0;
    let deltaX = 0;
    let deltaY = 0;

    // reset
    $swp.addEventListener('click', () => {
      if (this.slid) this.slid = false;
    });

    $swp.addEventListener('touchstart', (e) => {
      startStamp = new Date().getTime();
      startTouch = e.touches[0];
      $swp.style.transition = 'none';
    });

    $swp.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];

      // 处理滑动
      deltaX = touch.clientX - startTouch.clientX;
      deltaY = touch.clientY - startTouch.clientY;

      if (!direction) {
        direction = Math.abs(deltaX) - Math.abs(deltaY) > 5 ? 'hor' : 'ver';
      }

      if (direction !== 'hor') return;

      if (this.slid) {
        pos = Math.min(Math.max(deltaX, 0), this.width) - this.width;
      } else {
        pos = Math.max(Math.min(deltaX, 0), -this.width);
      }
      $swp.style.transform = 'translateX(' + pos + 'px)';
    });

    $swp.addEventListener('touchend', (e) => {
      const stamp = new Date().getTime();
      const touch = e.touches[0];

      // 持续时间短，考虑滑动的情况
      if (stamp - startStamp < 300) {
        if (deltaX > 5) {
          $swp.style.transform = 'translateX(0)';
          this.slid = false;
          pos = 0;
        } else if (deltaX < -5) {
          $swp.style.transform = `translateX(-${this.width}px)`;
          this.slid = true;
          pos = `-${this.width}`;
        }
      } else {
        if (Math.abs(pos) < this.minWidth) {
          $swp.style.transform = 'translateX(0)';
          this.slid = false;
          pos = 0;
        } else {
          $swp.style.transform = `translateX(-${this.width}px)`;
          this.slid = true;
          pos = `-${this.width}`;
        }
      }

      // 重置初始值
      $swp.style.transition = 'transform .3s ease';
      direction = '';
      startTouch = null;
      deltaX = 0;
    });

  }
}
</script>

<style lang="css">
.swiper-left {
  width: 100%;
  overflow: hidden;
}
.swiper-left .swp-item {
  height: 100%;
  transition: transform .3s ease;
}
.swiper-left .swp-item::after {
  content: '';
  display: block;
  font-size: 0;
  height: 0;
  width: 0;
  clear: both;
  overflow: hidden;
}
.swiper-left .swp-left,
.swiper-left .swp-right {
  height: 100%;
  float: left;
}
.swiper-left .swp-left {
  width: 100vw;
}
</style>


