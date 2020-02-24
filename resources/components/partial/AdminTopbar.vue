<template>
  <section class="topbar">
    <div class="container">
      <div class="topbar__row">
        <nuxt-link to="/admin" class="topbar__link" v-if="profile && profile.id && profile.role === 'SUPER_ADMIN_ROLE'">Панель управления</nuxt-link>
        <nuxt-link to="/login" class="topbar__link" v-if="!profile || !profile.id">Войти</nuxt-link>
        <p class="topbar__welcome">Добро пожаловать!</p>
      </div>
    </div>
  </section>
</template>
<script>
import { AUTH_CHECK } from '@/store/modules/auth'
export default {
  computed: {
    profile () {
      return this.$store.getters['modules/auth/getProfile']
    }
  },
  mounted () {
    this.$store.dispatch(`modules/auth/${AUTH_CHECK}`, { component: this, isRedirect: false })
  }
}
</script>
<style lang="scss" scoped>
.topbar {
  color: var(--third-color);
  font-size: var(--font-xs);
  padding: var(--offset-xs) 0;

  &__row {
    display: flex;
    justify-content: space-between;
  }

  &__link {
    color: inherit;
  }
}
</style>
