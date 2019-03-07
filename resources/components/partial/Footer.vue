<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__copyright">&copy; {{ new Date().getFullYear() }}</div>
    </div>
  </footer>
</template>
<style lang="scss">
.footer {
  padding: var(--offset-md) 0;
  background-color: var(--primary-color);
  color: #fff;
  font-weight: 600;

  &__copyright {
    text-align: right;
  }
}
</style>

