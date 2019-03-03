<template>
  <admin-template>
    <template slot="title">
      <h2 class="title">Товар</h2>
    </template>
    <template slot="content">
      <pane>
        <template slot="head">
        </template>
        <template slot="content">
        </template>
      </pane>
    </template>
  </admin-template>
</template>
<script>
import AdminTemplate from '@/components/shared/AdminPageTemplate';
import Pane from '@/components/shared/Pane';

export default {
  layout: 'admin',
  components: {
    AdminTemplate,
    Pane
  },
  // head() {
  //   return {
  //     title: `[SVRLAB-ADMIN] - `
  //   }
  // }
}
</script>
