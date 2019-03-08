<template>
  <article class="amplifier-card">
    <div class="amplifier-card__container">
      <div class="amplifier-card__meta item">
        <nuxt-link class="amplifier-card__preview" v-if="item.images.length > 0" :to="`/amplifiers/${item.id}`">
          <template v-for="img in item.images" >
            <img :src="`/${img.path}/${img.large}`" :alt="`Картинка для ${item.name}`" :key="img.id" v-if="item.mainPhoto && item.mainPhoto === img.id" />
          </template>
          <img :src="`/${item.images[0].path}/${item.images[0].large}`" :alt="`Картинка для ${item.name}`" v-if="!item.mainPhoto" />
        </nuxt-link>
        <div class="amplifier-card__info">
          <h4 class="amplifier-card__title"><nuxt-link :to="`/amplifiers/${item.id}`">{{item.name}}</nuxt-link></h4>
          <p class="amplifier-card__short">{{item.short}}</p>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  props: ['item'],
}
</script>
<style lang="scss">
.amplifier-card {
  color: #fff;
  width: 33.33%;
  padding: 15px;

  &__title, &__title a {
    color: #fff;
    font-size: 22px;

    &:hover {
      text-decoration: none;
    }
  }

  &__info {
    margin: 8px 0;
  }
  &__preview {
    width: 100%;
    height: 320px;
    overflow: hidden;
    transition: all .3s ease-in-out;
    display: block;
    border-radius: 4px;
    position: relative;
    z-index: 1;

    &:hover {
      img {
        transform: scale(1.07);
      }

      .amplifier-card__controlls {
        z-index: 2;
        opacity: 1;
      }
    }

    img {
      width: 100%;
      object-fit: cover;
      height: 100%;
      transition: all .15s ease-in-out;
    }
  }

  &__controlls {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    opacity: 0;
    transition: all .15s ease-in-out;

    .button {
      margin: 0 8px;
    }
  }
}
</style>
