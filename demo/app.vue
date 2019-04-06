<template>
  <div class="app">
    <swiper-left class="item" v-for="item in list" :key="item.id">
      this is the {{item.id}} item
    </swiper-left>
  </div>
</template>

<script>
import SwiperLeft from "../src/swiper-left.vue";
export default {
  components: {
    SwiperLeft
  },
  data () {
    const list = '1'.repeat(10).split('')
      .map((item, index) => ({id: index, ctn: index}));
    return {
      list
    };
  },
  methods: {

  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.item {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #eee;
  padding: 12px;
  line-height: 35px;
}
</style>

