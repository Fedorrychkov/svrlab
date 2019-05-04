<template>
  <article class="order-card">
    <div class="order-card__head">
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            class="order-card__menu"
            v-on="on"
          >
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile
            v-for="el in items"
            :key="el.id"
            @click="item.status_id !== el.id && $emit('updateStatus', {statusId: el.id, orderId: item.id})"
          >
            <v-list-tile-title>{{ el.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </div>
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
    item: Object,
    items: Array
  },
}
</script>
<style lang="scss" scoped>
.order-card {
  margin: 15px;
  max-width: calc(33% - 60px);
  width: 100%;
  padding: 15px;
  background-color: #fff;
  overflow: hidden;
  border-radius: 4px;
  position: relative;

  &__menu {
    position: absolute;
    top: 5px;
    right: 5px;
    max-width: 20px;
    min-width: 20px;
    background-color: transparent !important;
    box-shadow: none !important;
  }

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
