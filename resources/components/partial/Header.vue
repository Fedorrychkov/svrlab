<template>
  <header class="header">
    <div class="container header__container">
      <nuxt-link to="/" class="header__logo"> <Logo /> </nuxt-link>
      <main-nav />
    </div>
  </header>
</template>
<script>
import Logo from '../shared/Logo';
import MainNav from '../shared/ui/MainNav';
export default {
  components: {
    Logo,
    MainNav
  }
}
</script>
<style lang="scss">
.header {
  padding: var(--offset-md) 0;
  background-color: var(--primary-color);

  &__logo {
    &:hover {
      text-decoration: none;
    }
  }

  .logo {
    font-weight: 600;
    font-size: 24px;
  }

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

