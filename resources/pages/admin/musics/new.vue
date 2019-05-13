<template>
  <admin-template>
    <template slot="title">
      <h2 class="title">Новый диск</h2>
    </template>
    <template slot="content">
      <pane>
        <template slot="head">
          <nuxt-link class="button v-btn" to="/admin/musics">Назад</nuxt-link>
        </template>
        <template slot="content">
          <create-music />
        </template>
      </pane>
    </template>
  </admin-template>
</template>
<script>
import AdminTemplate from '@/components/shared/AdminPageTemplate';
import Pane from '@/components/shared/Pane';
import CreateMusic from '@/components/core/admin/CreateMusic'

export default {
  layout: 'admin',
  components: {
    AdminTemplate,
    Pane,
    CreateMusic
  },
}
</script>
