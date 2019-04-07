# vue-swiper-left

a vue component that swipe the item left and show something!!~

![demo](.demo.png)

## install

``[sudo] npm install vue-swiper-left --save``

## usage

```html
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
    const list = '1'.repeat(20).split('')
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
```

**note: some css outside should be added by you self**

## options

### props

#### width

default: 100

the right area's width


#### minWidth

default: 80

the min swipe width to show the right area


### slot

#### default

the left area


#### right

the right area
