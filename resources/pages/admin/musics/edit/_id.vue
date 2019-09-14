<template>
  <admin-template>
    <template slot="title">
      <h2 class="title">Редактирование товара</h2>
    </template>
    <template slot="content">
      <pane>
        <template slot="head">
          <nuxt-link class="button v-btn" to="/admin/musics">Назад</nuxt-link>
        </template>
        <template slot="content">
          <create-music :edit="true" v-if="!loading" />
        </template>
      </pane>
    </template>
  </admin-template>
</template>
<script>
import AdminTemplate from '@/components/shared/AdminPageTemplate';
import Pane from '@/components/shared/Pane';
import CreateMusic from '@/components/core/admin/CreateMusic';
import { GET_MUSIC } from '@/store/actions/music.js';

export default {
  data() {
    return {
      loading: false
    }
  },
  layout: 'admin',
  components: {
    AdminTemplate,
    Pane,
    CreateMusic
  },
  computed: {
    pageId() {
      return this.$router.history.current.params.id;
    }
  },
  mounted() {
    this.loading = true;
    this.$store.dispatch(`modules/music/${GET_MUSIC}`, this.pageId).then(res => {
      if (res.status === 200) {
        this.loading = false;
      }
    });
  }
}
</script>
