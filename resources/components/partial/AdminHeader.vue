<template>
  <header class="admin-header">
    <ul class="admin-header__list">
      <li class="admin-header__item">
        <nuxt-link class="admin-header__exit admin-header__link" to="/">Главная страница</nuxt-link>
      </li>
      <li class="admin-header__item">
        <button class="admin-header__exit admin-header__link" @click="exit">Выйти</button>
      </li>
    </ul>
  </header>
</template>
<script>
import { AUTH_LOGOUT } from '@/store/modules/auth'
export default {
  methods: {
    exit () {
      this.$store.dispatch(`modules/auth/${AUTH_LOGOUT}`, { component: this, isRedirect: true })
    }
  }
}
</script>
<style lang="scss">
.admin-header {
  padding: 15px;
  background-color: #fff;

  &__list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: -8px;
    margin-right: -8px;
  }

  &__exit {
    color: #2196f3 !important;
  }

  &__item {
    margin: 0 8px;
  }

  &__link {
    color: #2196f3;
    background-color: transparent;
    border: none;
    text-decoration: none;

    &:hover {
      color: #2196f3;
      text-decoration: none;
      background-color: transparent;
      opacity: .7;
    }
  }
}
</style>
