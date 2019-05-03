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
        </template>
      </pane>
    </template>
  </admin-template>
</template>
<script>
import AdminTemplate from '@/components/shared/AdminPageTemplate';
import Pane from '@/components/shared/Pane';
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
    Pane
  },
  computed: {
    orders() {
      console.log(this.$store.getters[`modules/order/orders`]);
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
