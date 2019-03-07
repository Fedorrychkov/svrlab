<template>
  <admin-template>
    <template slot="title">
      <h2 class="title">Редактирование товара</h2>
    </template>
    <template slot="content">
      <pane>
        <template slot="head">
          <nuxt-link class="button v-btn" to="/admin/amplifiers">Назад</nuxt-link>
        </template>
        <template slot="content">
          <create-amplifier :edit="true" v-if="!loading" />
        </template>
      </pane>
    </template>
  </admin-template>
</template>
<script>
import AdminTemplate from '@/components/shared/AdminPageTemplate';
import Pane from '@/components/shared/Pane';
import CreateAmplifier from '@/components/core/admin/CreateAmplifier';
import { GET_AMPLIFIER } from '@/store/actions/amplifier.js';

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
    CreateAmplifier
  },
  computed: {
    pageId() {
      return this.$router.history.current.params.id;
    }
  },
  mounted() {
    this.loading = true;
    this.$store.dispatch(`modules/amplifier/${GET_AMPLIFIER}`, this.pageId).then(res => {
      if (res.status === 200) {
        this.loading = false;
      }
    });
  }
}
</script>
