<template>
<div class="order-page">
  <div class="order-page__row field start">
    <div class="key">

    </div>
    <div class="value">

    </div>
  </div>
</div>
</template>
<script>
import { GET_ORDER } from '@/store/actions/order.js';

export default {
  data() {
    return {
      loading: true
    }
  },
  layout: 'admin',
  components: {
  },
  computed: {
    order() {
      return this.$store.getters[`modules/order/order`];
    }
  },
  created() {
    this.$store.dispatch(`modules/order/${GET_ORDER}`, this.$router.history.current.params.id)
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
.order-page {
  &__row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .field {
    &.start {
      justify-content: flex-start;
    }

    .key {
      margin-right: 10px;
    }
  }
}
</style>

