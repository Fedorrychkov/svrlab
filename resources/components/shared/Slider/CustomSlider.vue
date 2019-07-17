<template>
<section class="slider">
  <div class="slider__item" v-for="(item, i) in images" :key="i">
    <img :src="item" alt="" class="slider__image" />
  </div>
</section>
</template>
<script>
export default {
  props: {
    images: Array,
  }
}
</script>
<style lang="scss" scoped>
.slider {
  position: relative;
  max-height: 600px;
  display: flex;

  &__item {
    width: 100%;
    overflow: hidden;

    &:hover {
      .slider__image {
        transform: scale(1.02);
      }
    }
  }

  &__image {
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: 0.3s;
  }
}
</style>
