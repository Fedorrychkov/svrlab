<template>
  <header class="header">
    <div class="container header__container">
      <nuxt-link to="/" class="header__logo"> <Logo /> </nuxt-link>
      <div class="header__right">
        <main-nav />
        <shopping-cart />
      </div>
    </div>
  </header>
</template>
<script>
import Logo from '../shared/Logo';
import MainNav from '../shared/ui/MainNav';
import ShoppingCart from '../shared/ShoppingCart';
export default {
  components: {
    Logo,
    MainNav,
    ShoppingCart
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

  &__container, &__right {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

