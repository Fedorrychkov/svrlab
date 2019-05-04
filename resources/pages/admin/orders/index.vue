<template>
  <admin-template>
    <template slot="title">
      <h2 class="title">Заказы</h2>
    </template>
    <template slot="content">
      <pane>
        <template slot="head">
        </template>
        <template slot="content">
          <div class="list">
            <order-card v-for="item in orders" :key="item.id" :item="item" />
          </div>
        </template>
      </pane>
    </template>
  </admin-template>
</template>
<script>
import AdminTemplate from '@/components/shared/AdminPageTemplate';
import Pane from '@/components/shared/Pane';
import OrderCard from '@/components/core/orders/OrderCard';
import { GET_ORDERS } from '@/store/actions/order.js';

export default {
  data() {
    return {
      loading: true
    }
  },
  layout: 'admin',
  components: {
    AdminTemplate,
    Pane,
    OrderCard
  },
  computed: {
    orders() {
      return this.$store.getters[`modules/order/orders`];
    }
  },
  created() {
    this.$store.dispatch(`modules/order/${GET_ORDERS}`)
      .catch(err => {
      }).finally(() => {
        this.loading = false;
      });
  }
}
</script>
<style lang="scss" scoped>
.list {
  margin: 15px -15px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>

