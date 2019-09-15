<template>
  <client-only>
    <aside :class="{'shopping-cart': true, 'open': showBasket}">
      <div class="shopping-cart__icon" @click="toggleBasketHide($event)">
        <font-awesome-icon class="icon" :icon="['fa', 'shopping-cart']"/>
        <span class="count">{{basketCount}}</span>
      </div>

      <div class="shopping-cart__body" @click="listClick()">
        <ul class="shopping-cart__products">
          <li class="shopping-cart__product" v-for="item in products" :key="item.id">
            <div class="shopping-cart__preview">
              <preview-photo :item="item" :current="getMainPhoto(item)" />
            </div>
            <div class="shopping-cart__meta">
              <span class="shopping-cart__name">{{item.name}} x{{item.quantity}}</span>
              <span class="shopping-cart__close" @click="removeProduct(item.id)">
                <font-awesome-icon class="icon" :icon="['fa', 'times']"/>
              </span>
            </div>
          </li>
        </ul>
        <div class="shopping-cart__cost field">
          <span class="key">Итого</span>
          <span class="value">{{total || 0 | numFormat}} <i class="symbol rouble"> ₽</i> </span>
        </div>
        <div @click="showBasket = false">
          <nuxt-link to="/cart/checkout" class="checkout-button" v-if="this.products.length > 0">Оформить заказ</nuxt-link>
        </div>
      </div>
    </aside>
  </client-only>
</template>
<script>
import {
  REMOVE_FROM_BASKET,
  GET_BASKET
} from '@/store/actions/cart.js';
import PreviewPhoto from '@/components/shared/ui/PreviewPhoto';
import { getMainPhoto } from '@/helpers/product';

export default {
  data() {
    return {
      showBasket: false,
      timerId: null,
      getMainPhoto: getMainPhoto
    }
  },
  components: {
    PreviewPhoto
  },
  computed: {
    basketCount() {
      return this.$store.getters[`modules/cart/basketCount`];
    },
    products() {
      return this.$store.getters[`modules/cart/cartProducts`];
    },
    total() {
      return this.$store.getters[`modules/cart/cartTotalPrice`];
    }
  },
  watch: {
    products(products) {
      if (products.length > 0) {
        this.showBasket = true;
        const timerId = setTimeout(() => {
          this.showBasket = false;
        }, 3000);
      }
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
        // this.timerId = setTimeout(() => {
          // this.showBasket = false;
        // }, 10000);
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

  &__icon {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;

    .count {
      width: 20px;
      height: 20px;
      font-size: 14px;
      background-color: var(--second-color);
      display: block;
      color: var(--primary-color);
      margin-left: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      font-weight: 500;
    }
  }

  &__close {
    opacity: .6;
    transition: all .15s ease-in-out;

    &:hover {
      opacity: 1;
    }
  }

  &__cost {
    font-weight: 500;
    font-size: 18px;
    margin: 24px 0 0;
    padding: 0 0 10px;
    border-bottom: 1px solid rgba(0, 0, 0, .3);
  }

  .field {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .value, i {
      white-space: nowrap;
      font-style: normal;
    }

    .key {
      padding-right: 10px;
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

    .img, img {
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
