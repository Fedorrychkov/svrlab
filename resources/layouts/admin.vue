{{{{raw}}}}
<template>
  <div class="page page__with-sidenav admin">
    <side-nav />
    <div class="page__content page__admin">
      <admin-header />
      <main class="page__container">
        <nuxt />
      </main>
    </div>
  </div>
</template>
{{{{/raw}}}}
<script>
import SideNav from '@/components/shared/ui/SideNav';
import AdminHeader from '@/components/partial/AdminHeader';

export default {
  components: {
    SideNav,
    AdminHeader
  },
  head() {
    return {
      title: '[SVRLAB-ADMIN] - система управления интернет магазином'
    }
  }
}
</script>
<style lang="scss">
.admin {
  background-color: #f3f5f8;
}
</style>

