<template>
  <admin-template>
    <template slot="title">
      <h2 class="title">Новый товар</h2>
    </template>
    <template slot="content">
      <pane>
        <template slot="head">
          <nuxt-link class="button v-btn" to="/admin/amplifiers">Назад</nuxt-link>
        </template>
        <template slot="content">
          <create-amplifier />
        </template>
      </pane>
    </template>
  </admin-template>
</template>
<script>
import AdminTemplate from '@/components/shared/AdminPageTemplate';
import Pane from '@/components/shared/Pane';
import CreateAmplifier from '@/components/core/admin/CreateAmplifier'

export default {
  layout: 'admin',
  components: {
    AdminTemplate,
    Pane,
    CreateAmplifier
  },
  // head() {
  //   return {
  //     title: `[SVRLAB-ADMIN] - `
  //   }
  // }
}
</script>
