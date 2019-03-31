<template>
  <aside :class="{'shopping-cart': true, 'open': showBasket}" @click="toggleBasketHide($event)">
    <no-ssr>
      <font-awesome-icon class="icon" :icon="['fa', 'shopping-cart']" />
    </no-ssr>

    <div class="shopping-cart__body">
      <ul class="shopping-cart__products">
        <li class="shopping-cart__product" v-for="item in products" :key="item.id">
          {{item.name}}
        </li>
      </ul>
    </div>
  </aside>
</template>
<script>
export default {
  data() {
    return {
      showBasket: false
    }
  },
  computed: {
    products() {
      return this.$store.getters[`modules/cart/cartProducts`];
    }
  },
  created() {
    // this.$el.addEventListener('scroll', () => {
    //   this.showBasket = false;
    // });

    // this.$store.dispatch(GET_BASKET);
  },
  methods: {
    toggleBasketHide(e) {
      e.stopImmediatePropagation()
      const close = () => {
        this.showBasket = false;
        // this.$el.removeEventListener('click', close);
      };

      // this.$el.addEventListener('click', close);

      // if (this.products.length > 0) {
      //   this.showBasket = !this.showBasket;
      // }
        this.showBasket = !this.showBasket;
    }
  }
};
</script>
<style lang="scss">
.shopping-cart {
  color: var(--second-color);
  font-size: 18px;
  margin-left: 15px;
  line-height: 1;
  position: relative;
  padding: 5px;
  transition: all .15s ease;

  &.open {
    background-color: var(--second-color);
    color: var(--primary-color);
    border-radius: 2px 2px 0 0;

    .shopping-cart__body {
      z-index: 1;
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  .icon {
    cursor: pointer;
  }

  &__body {
    position: absolute;
    background-color: var(--second-color);
    color: var(--primary-color);
    right: 0;
    top: 25px;
    min-width: 240px;
    border-radius: 2px;
    padding: 10px 15px;
    z-index: -11;
    opacity: 0;
    transition: all .15s ease;
    transform: translate3d(0, -20px, 0);
  }
}
</style>
