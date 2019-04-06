<template>
  <aside :class="{'shopping-cart': true, 'open': showBasket}">
    <no-ssr>
      <font-awesome-icon class="icon" :icon="['fa', 'shopping-cart']" @click="toggleBasketHide($event)"/>
    </no-ssr>

    <div class="shopping-cart__body" @click="listClick()">
      <ul class="shopping-cart__products">
        <li class="shopping-cart__product" v-for="item in products" :key="item.id">
          <div class="shopping-cart__preview">
            <template v-for="img in item.images">
              <img class="img" :src="`/${img.path}/${img.large}`" :alt="`Картинка для ${item.name}`" :key="img.id" v-if="item.mainPhoto && item.mainPhoto === img.id" />
            </template>
            <img class="img" v-if="!item.mainPhoto" :src="`/${item.images[0].path}/${item.images[0].large}`" :alt="`Картинка для ${item.name}`" />
          </div>
          <div class="shopping-cart__meta">
            <span class="shopping-cart__name">{{item.name}} x{{item.quantity}}</span>
            <span class="shopping-cart__close" @click="removeProduct(item.id)">
              <no-ssr>
                <font-awesome-icon class="icon" :icon="['fa', 'times']"/>
              </no-ssr>
            </span>
          </div>
        </li>
      </ul>
      <nuxt-link to="/cart/checkout" class="checkout-button" @click="goCheckout()" v-if="this.products.length > 0">Оформить заказ</nuxt-link>
    </div>
  </aside>
</template>
<script>
import {
  REMOVE_FROM_BASKET,
  GET_BASKET
} from '@/store/actions/cart.js';
import { clearTimeout } from 'timers';

export default {
  data() {
    return {
      showBasket: false,
      timerId: null
    }
  },
  computed: {
    basketCount() {
      return this.$store.getters[`modules/cart/basketCount`];
    },
    products() {
      const products = this.$store.getters[`modules/cart/cartProducts`];
      if (products.length > 0) {
        this.showBasket = true;
        const timerId = setTimeout(() => {
          this.showBasket = false;
        }, 3000);
      }
      return products;
    },
    total() {
      return this.$store.getters[`modules/cart/cartTotalPrice`];
    }
  },
  created() {
    if (process.client) {
      document.addEventListener('scroll', () => {
        this.showBasket = false;
      });
    }
    this.$store.dispatch(`modules/cart/${GET_BASKET}`);
  },
  methods: {
    goCheckout() {
      console.log('checkout');
    },
    toggleBasketHide(e) {
      e.stopImmediatePropagation()
      const close = () => {
        this.showBasket = false;
        if (process.client) {
          document.removeEventListener('click', close);
        }
      };

      if (process.client) {
        document.removeEventListener('click', close);
      }

      if (this.products.length > 0) {
        this.showBasket = !this.showBasket;
        this.timerId = setTimeout(() => {
          this.showBasket = false;
        }, 10000);
      }
    },
    removeProduct(id) {
      this.$store.dispatch(`modules/cart/${REMOVE_FROM_BASKET}`, {id});
      if (!this.products.length) {
        this.$nextTick(() => {
          this.showBasket = false;
        });
      }
    },
    listClick() {
      // this.$nextTick(() => {
      //   this.showBasket = true;
      // });
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
      z-index: 3;
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  &__close {
    opacity: .6;
    transition: all .15s ease-in-out;

    &:hover {
      opacity: 1;
    }
  }

  .checkout-button {
    margin: 20px 0 10px;
    color: var(--primary-color);
    text-transform: uppercase;
    border: 1px solid var(--primary-color);
    border-radius: 4px;
    padding: 10px 15px;
    display: block;
    transition: all .15s ease-in-out;
    width: 100%;
    text-align: center;

    &:hover {
      text-decoration: none;
      background-color: var(--primary-color);
      color: var(--second-color);
    }
  }

  .icon {
    cursor: pointer;
  }

  &__products {
    margin: -8px 0;
  }

  &__product {
    display: flex;
    margin: 8px 0;
  }

  &__meta {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__name {
    margin: 0 15px;
    font-size: 14px;
  }

  &__preview {
    min-width: 40px;
    max-width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    .img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }
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
