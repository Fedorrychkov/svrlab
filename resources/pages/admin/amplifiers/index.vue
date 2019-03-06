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

          <div class="list" v-if="amplifiers.length > 0">
            <product-card v-for="item in amplifiers" :key="item.id" :item="item" :link="`/admin/amplifiers/${item.id}`"/>
          </div>
          <p class="content-empty" v-if="amplifiers.length < 1 && !loading">Список товаров пуст :(</p>
          <p class="content-empty" v-if="loading">Загрузка...</p>
        </template>
      </pane>
    </template>
  </admin-template>
</template>

<script>
import AdminTemplate from '@/components/shared/AdminPageTemplate';
import Pane from '@/components/shared/Pane';
import ProductCard from '@/components/core/admin/ProductCard'
import { GET_AMPLIFIERS } from '@/store/actions/amplifier.js';
import gql from 'graphql-tag';

export default {
  layout: 'admin',
  head() {
    return {
      title: '[SVRLAB-ADMIN] - музыкальное оборудование'
    }
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    amplifiers() {
      return this.$store.getters[`modules/amplifier/amplifiers`];
    }
  },
  created() {
    this.$store.dispatch(`modules/amplifier/${GET_AMPLIFIERS}`)
      .catch(err => {
      }).finally(() => {
        this.loading = false;
      });
  },
  mounted() {
    // this.$apollo.query({ query: gql`{amplifiers {id, name}}`})
    //   .then(({ data }) => {
    //     console.log(data);
    //     // do what you want with data
    // });
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

