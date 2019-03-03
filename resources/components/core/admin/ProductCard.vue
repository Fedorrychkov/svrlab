<template>
  <article class="product-item">
    <div class="product-item__container">
      <div class="product-item__meta item">
        <h4 class="product-item__title"><nuxt-link :to="link">{{item.name}}</nuxt-link></h4>
        <p class="product-item__short">{{item.short}}</p>
      </div>
      <div class="product-item__controlls">
        <no-ssr>
          <button><nuxt-link :to="link"><font-awesome-icon :icon="['fa', 'edit']" /></nuxt-link></button>
        </no-ssr>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  props: ['item', 'link']
}
</script>
<style lang="scss">
.product-item {
  margin-left: -15px;
  margin-right: -15px;
  padding: 15px;
  transition: all .15s ease-in-out;

  &:hover {
    background-color: #ECEFF1;
  }

  &__title {
    font-size: var(--product-item-title);
  }

  &__title, a {
    color: #2c2c2c;
    transition: all .15s ease-in-out;

    &:hover {
      color: #2c2c2c;
      text-decoration: none;
    }
  }

  &__short {
    font-size: 16px;
    color: #2c2c2c;
    margin: 8px 0;
  }

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  &__meta {
    width: 100%;
  }

  &__controlls {
    min-width: 90px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>


