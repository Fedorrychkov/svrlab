<template>
  <admin-template>
    <template slot="title">
      <h2 class="title">Музыкальное оборудование</h2>
    </template>
    <template slot="content">
      <pane>
        <template slot="head">
          <nuxt-link class="button v-btn" to="/admin/amplifiers/new">Добавить</nuxt-link>
        </template>
        <template slot="content">

          <div class="list" v-if="products.length > 0">
            <product-card v-for="item in products" :key="item.id" :item="item" :link="`/admin/amplifiers/${item.id}`"/>
          </div>
          <p class="content-empty" v-if="products.length < 1">Список товаров пуст :(</p>

        </template>
      </pane>
    </template>
  </admin-template>
</template>

<script>
import AdminTemplate from '@/components/shared/AdminPageTemplate';
import Pane from '@/components/shared/Pane';
import ProductCard from '@/components/core/admin/ProductCard'

export default {
  layout: 'admin',
  head() {
    return {
      title: '[SVRLAB-ADMIN] - музыкальное оборудование'
    }
  },
  data() {
    return {
      products: [
        {
          id: "1",
          name: 'Однотактный усилитель',
          short: 'Однотактный усилитель для небольших помещений',
        },
        {
          id: "2",
          name: 'Двухтактный усилитель',
          short: 'Двухтактный усилитель для малых и средних помещений',
        }
      ]
    }
  },
  components: {
    AdminTemplate,
    Pane,
    ProductCard
  }
}
</script>
<style lang="scss">
.list {
  margin: 15px 0;
}
</style>

