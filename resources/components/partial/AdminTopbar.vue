<template>
  <section class="topbar">
    <div class="container">
      <div class="topbar__row">
        <nuxt-link to="/admin" class="topbar__link">Панель управления</nuxt-link>
        <p class="topbar__welcome">Добро пожаловать!</p>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  
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
