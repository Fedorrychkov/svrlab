<template>
  <article class="order-card">
    <div class="order-card__row field start">
      <div class="key">№ заказа:</div>
      <div class="value">
        <nuxt-link v-if="item.id" :to="`/admin/orders/${item.id}`"> {{item.id}} </nuxt-link>
      </div>
    </div>
    <div class="order-card__row field start">
      <div class="key">Имя:</div>
      <div class="value">{{item.name}}</div>
    </div>
    <div class="order-card__row field start">
      <div class="key">Телефон:</div>
      <div class="value">
        <nuxt-link v-if="item.customer && item.customer.phone" :to="`/admin/orders?phone=${item.customer && item.customer.phone}`"> {{item.customer && item.customer.phone}} </nuxt-link>
      </div>
    </div>
    <div class="order-card__row field start">
      <div class="key">E-mail:</div>
      <div class="value">
        <nuxt-link v-if="item.customer && item.customer.email" :to="`/admin/orders?email=${item.customer && item.customer.email}`"> {{item.customer && item.customer.email}} </nuxt-link>
      </div>
    </div>
    <div class="order-card__row field start">
      <div class="key">Индекс:</div>
      <div class="value">
        <nuxt-link v-if="item.zip" :to="`/admin/orders?zip=${item.zip}`"> {{item.zip}} </nuxt-link>
      </div>
    </div>
    <div class="order-card__row field start">
      <div class="key">Адрес:</div>
      <div class="value">
        <nuxt-link
          v-if="item.country || item.city || item.address"
          :to="`/admin/orders?address=${item.country},${item.city},${item.address}`"> {{item.country}}, {{item.city}}, {{item.address}} </nuxt-link>
      </div>
    </div>
    <div class="order-card__row field start">
      <div class="key">Комментарий к заказу:</div>
      <div class="value">{{item.short.slice(0, 200)}}{{item.short.length > 200 ? '...' : ''}}</div>
    </div>
    <div class="order-card__row field start">
      <div class="key">Общая стоимость:</div>
      <div class="value">{{item.total | numFormat}} руб.</div>
    </div>
  </article>
</template>
<script>
export default {
  props: {
    item: Object
  },
}
</script>
<style lang="scss" scoped>
.order-card {
  margin: 15px;
  max-width: calc(50% - 30px);
  width: 100%;
  padding: 15px;
  background-color: #f4f4f4;
  overflow: hidden;
  border-radius: 4px;

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
