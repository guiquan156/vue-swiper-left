<template>
  <div>
    <div>
      <slot></slot>
    </div>
    <div>
      <slot name="left"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwiperLeft'


}
</script>

