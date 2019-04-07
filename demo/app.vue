<template>
  <div class="app">
    <swiper-left class="item" v-for="item in list" :key="item.id">
      <div class="content">this is the {{item.id}} item</div>
      <template slot="right">
        <span class="delete">delete</span>
      </template>
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
      list,
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
  height: 70px;
  border-bottom: 1px solid #eee;
  line-height: 45px;
}

.content {
  padding: 12px;
}

.delete {
  display: block;
  width: 100%;
  height: 100%;
  color: #fff;
  background: #ed3f3f;
  text-align: center;
  line-height: 69px;
}
</style>

