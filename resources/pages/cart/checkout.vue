<template>
  <div class="checkout">
    <page-section>
      <template slot="title">
        <h4 class="title">{{products.length > 0 ? 'Оформление заказа' : 'Корзина пуста'}}</h4>
      </template>
      <template slot="content">
        <amplifier-shopping-item v-for="item in products" :key="item.id" :item="item" />
        <div class="checkout__content">
          <div class="checkout__row field">
            <div class="key"><h5>Итоговая стоимость заказа</h5></div>
            <div class="value"><h5>{{total | numFormat}} <i class="symbol rouble"> ₽</i></h5></div>
          </div>
        </div>
      </template>
    </page-section>
  </div>
</template>
<script>
import PageSection from '@/components/shared/PageSection';
import AmplifierShoppingItem from '@/components/core/amplifiers/AmplifierShoppingItem';

export default {
  data() {
    return {

    }
  },
  components: {
    PageSection,
    AmplifierShoppingItem
  },
  computed: {
    basketCount() {
      return this.$store.getters[`modules/cart/basketCount`];
    },
    products() {
      const products = this.$store.getters[`modules/cart/cartProducts`];
      if (!products.length) {
        this.$router.push('/');
      }
      return products;
    },
    total() {
      return this.$store.getters[`modules/cart/cartTotalPrice`];
    }
  },
}
</script>
<style lang="scss">
i {
  font-style: normal;
}
.checkout {
  color: var(--second-color);

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;

  }

  .field {

  }
}
</style>

