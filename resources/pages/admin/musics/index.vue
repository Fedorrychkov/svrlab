<template>
  <admin-template>
    <template slot="title">
      <h2 class="title">Музыка</h2>
    </template>
    <template slot="content">
      <pane>
        <template slot="head">
          <nuxt-link class="button v-btn" to="/admin/musics/new">Добавить</nuxt-link>
        </template>
        <template slot="content">

          <div class="list" v-if="musics.length > 0">
            <product-card v-for="item in musics" :key="item.id" :item="item" :public="`/musics/${item.id}`" :link="`/admin/musics/edit/${item.id}`"/>
          </div>
          <p class="content-empty" v-if="musics.length < 1 && !loading">Список музыки пуст :(</p>
          <p class="content-empty" v-if="loading">Загрузка...</p>
        </template>
      </pane>
    </template>
  </admin-template>
</template>
<script>
import AdminTemplate from '@/components/shared/AdminPageTemplate';
import Pane from '@/components/shared/Pane';
import ProductCard from '@/components/core/admin/ProductCard';
import { GET_MUSICS } from '@/store/actions/music.js';

export default {
  layout: 'admin',
  head() {
    return {
      title: '[SVRLAB-ADMIN] - музыка'
    }
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    musics() {
      return this.$store.getters[`modules/music/musics`];
    }
  },
  created() {
    this.$store.dispatch(`modules/music/${GET_MUSICS}`)
      .catch(err => {
        console.log(err);
      }).finally(() => {
        this.loading = false;
      });
  },
  components: {
    AdminTemplate,
    Pane,
    ProductCard
  }
}
</script>
<style lang="scss" scoped>
.list {
  margin: 15px 0;
}
</style>
