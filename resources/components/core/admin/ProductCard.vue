<template>
  <article class="product-item">
    <div class="product-item__container">
      <div class="product-item__meta item">
        <nuxt-link class="product-item__preview" v-if="item.images.length > 0" :to="public">
          <template v-for="img in item.images" >
            <img :src="`/${img.path}/${img.large}`" :alt="`Картинка для ${item.name}`" :key="img.id" v-if="item.mainPhoto && item.mainPhoto === img.id" />
          </template>
          <img :src="`/${item.images[0].path}/${item.images[0].large}`" :alt="`Картинка для ${item.name}`" v-if="!item.mainPhoto" />
        </nuxt-link>
        <div class="product-item__info">
          <h4 class="product-item__title"><nuxt-link :to="link">{{item.name}}</nuxt-link></h4>
          <p class="product-item__short">{{item.short}}</p>
        </div>
      </div>
      <div class="product-item__controlls">
        <no-ssr>
          <button><nuxt-link :to="link"><font-awesome-icon class="icon" :icon="['fa', 'edit']" /></nuxt-link></button>
        </no-ssr>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  props: ['item', 'link', 'public']
}
</script>
<style lang="scss">
.product-item {
  margin-left: -15px;
  margin-right: -15px;
  padding: 15px;
  transition: all .15s ease-in-out;

  &__preview {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
    background-color: #f3f5f8;
    margin-right: 15px;
    border-radius: 4px;
    overflow: hidden;

    img {
      margin: 0 auto;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

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
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }

  &__controlls {
    min-width: 90px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>


