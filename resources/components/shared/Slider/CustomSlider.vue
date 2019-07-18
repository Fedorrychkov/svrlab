<template>
<section class="slider">
  <div class="slider__item" v-for="(item, i) in images" :key="i">
    <img :src="item" alt="" class="slider__image" />
    <div class="slider__container container">
      <div class="slider__content">
        <h1 class="slider__title">Ламповый линейный усилитель класса Hi-End</h1>
        <p class="slider__text">Усилитель однотактный сделан на новых лампах времен СССР</p>
      </div>
    </div>
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

  &__container {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
  }

  &__content {
    margin: var(--offset-xl) 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  &__title {
    background-color: var(--primary-color-alpha);
    display: inline-block;
    color: var(--second-color);
    font-weight: 400;
    letter-spacing: var(--letter-spacing-md);
    padding: 0 var(--offset-xs);
  }

  &__text {
    padding: 0 var(--offset-xs);
    background-color: var(--primary-color-alpha);
    display: inline-block;
    color: var(--second-color);
    font-weight: 400;
    letter-spacing: var(--letter-spacing-md);
    margin: var(--offset-md) 0;
  }
}
</style>
