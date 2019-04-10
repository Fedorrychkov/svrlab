<template>
  <div class="counter">
    <span class="counter__item" @click="decrement()">-</span>
    <span class="counter__item value">{{item.quantity}}</span>
    <span class="counter__item" @click="increment()">+</span>
  </div>
</template>
<script>
import { INCREMENT_PRODUCT, DECREMENT_PRODUCT } from '@/store/actions/cart.js';

export default {
  props: ['item'],
  methods: {
    increment() {
      this.$store.dispatch(`modules/cart/${INCREMENT_PRODUCT}`, {id: this.item.id});
    },
    decrement() {
      this.item.quantity && this.$store.dispatch(`modules/cart/${DECREMENT_PRODUCT}`, {id: this.item.id});
    }
  }
};
</script>
<style lang="scss">
.counter {
  min-width: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__item {
    display: block;
    min-width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, .3);
    border-radius: 50%;
    height: 20px;
    cursor: pointer;

    &.value {
      min-width: 30px;
      height: 30px;
      font-size: 14px;
      cursor: default;
    }
  }
}
</style>

