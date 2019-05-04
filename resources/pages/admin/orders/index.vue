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
          <!-- <template v-for="item in filtered">
            <div class="list" :key="item.id">
              <h5 class="title">{{item.title}}</h5>
              <order-card v-for="order in item.orders" :key="order.id" :item="order" />
            </div>
          </template> -->
          <tabs :items="filtered" @clickedItem="filterOrders">
            <template slot="content">
              <div class="list" v-if="filteredOrders">
                <order-card v-for="order in filteredOrders" :key="order.id" :item="order" @updateStatus="updateStatus" :items="statuses" />
              </div>
              <div class="empty" v-if="!filteredOrders || !filteredOrders.length">
                <p>Товаров с данным статусом - нет</p>
              </div>
            </template>
          </tabs>
        </template>
      </pane>
    </template>
  </admin-template>
</template>
<script>
import AdminTemplate from '@/components/shared/AdminPageTemplate';
import Tabs from '@/components/shared/ui/Tabs';
import Pane from '@/components/shared/Pane';
import OrderCard from '@/components/core/orders/OrderCard';
import {
  GET_ORDERS,
  GET_ORDER_STATUSES,
  SET_STATUS
} from '@/store/actions/order.js';

export default {
  data() {
    return {
      loading: true,
      filtered: null,
      filteredOrders: null
    }
  },
  layout: 'admin',
  components: {
    AdminTemplate,
    Pane,
    OrderCard,
    Tabs
  },
  computed: {
    orders() {
      return this.$store.getters[`modules/order/orders`];
    },
    statuses() {
      return this.$store.getters[`modules/order/statuses`];
    }
  },
  watch: {
    orders(items) {
      this.filtered = this.statuses.map(item => {
        item.active = false;
        return item;
      });
      const filtered = this.filtered.map(item => {
        item.orders = items.filter(order => item.id === order.status_id);
        return item;
      });
      this.filtered = [
        {id: 0, name: 'ALL', title: 'Все', active: false, orders: items},
        ...filtered
      ];
      this.filterOrders(0);
    }
  },
  created() {
    this.$store.dispatch(`modules/order/${GET_ORDER_STATUSES}`)
      .then(() => {
        this.$store.dispatch(`modules/order/${GET_ORDERS}`)
          .catch(err => {
            console.log(err)
          })
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.loading = false;
      });
  },
  methods: {
    filterOrders(val) {
      this.filtered.forEach(item => {
        item.active = false;
        if (item.id === val) {
          item.active = true;
        }
      })
      this.filteredOrders = this.orders.filter(item => {
        if (item.status_id === val) {
          return item;
        }
        if (val === 0) {
          return item;
        }
      });
    },
    updateStatus(data) {
      this.$store.dispatch(`modules/order/${SET_STATUS}`, data);
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
  margin: 0 -15px;
  padding: 8px 4px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  .title {
    width: 100%;
    padding: 0 15px;
    margin-bottom: 0;
  }
}
</style>

