<template>
  <div :class="{'amplifier-page': true, 'loading': loading}" v-if="!loading">
    <div class="container">
      <div class="amplifier-page__container">
        <aside class="amplifier-page__left">
          <ul class="amplifier-page__previews">
            <li class="item" v-for="img in music.images" :key="img.id"><img :src="`/${img.path}/${img.large}`" :alt="music.name"></li>
          </ul>
          <div class="amplifier-page__preview">
            <preview-photo :item="music" style="height: auto" />
          </div>
        </aside>
        <div class="amplifier-page__right">
          <h3 class="amplifier-page__title">{{music.name}}</h3>
          <div class="amplifier-page__info">
            <p class="amplifier-page__cost field" v-if="!loading">
              <span class="key">Цена</span>
              <span class="value">
                {{music.cost | numFormat}}
                <i class="symbol rouble">₽</i>
              </span>
            </p>
          </div>
          <icon-button class="amplifier-page__button" text="Добавить в корзину" icon="cart-plus" @click="addProductToBasket()" />
        </div>
      </div>
      <div class="amplifier-page__content">

      </div>
    </div>
  </div>
</template>
<script>
import { GET_MUSIC } from '@/store/actions/music.js';
import { ADD_TO_BASKET } from '@/store/actions/cart.js';
import IconButton from '@/components/shared/ui/IconButton';
import PreviewPhoto from '@/components/shared/ui/PreviewPhoto';

export default {
  data() {
    return {
      loading: true,
      id: null,
    }
  },
  components: {
    IconButton,
    PreviewPhoto
  },
  computed: {
    music() {
      return this.$store.getters[`modules/music/music`];
    },
  },
  created() {
    this.id = this.$router.history.current.params.id;
    this.$store.dispatch(`modules/music/${GET_MUSIC}`, this.id)
      .catch(err => {
      }).finally(() => {
        this.loading = false;
      });
  },
  methods: {
    addProductToBasket() {
      this.$store.dispatch(`modules/cart/${ADD_TO_BASKET}`, this.music).then(() => {
      });
    }
  }
}
</script>
<style lang="scss">
.amplifier-page {
  color: var(--second-color);
  padding: 15px 0;

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  &__button, &__info {
    margin: 15px 0;
  }

  &__left {
    min-width: 550px;
    max-width: 550px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    img {
      width: 100%;
      display: block;
      transition: all .15s ease-in-out;
    }
  }

  &__right {
    width: 100%;
    padding-left: 45px;
  }

  .field {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: 0 -15px;

    .key, .value {
      padding: 0 15px;
    }
  }

  &__cost {
    font-size: 20px;

    i {
      font-style: normal;
    }
  }

  &__previews {
    width: 80px;
    min-width: 80px;
    height: auto;
    margin: -15px 0;
    margin-right: 15px;

    .item {
      width: 100%;
      margin: 15px 0;
      display: block;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;

      &:hover {
        img {
          transform: scale(1.07);
        }
      }
    }
  }

  &__preview {
    height: 550px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, .15);
    overflow: hidden;
    border-radius: 4px;
  }

  @media (max-width: 992px) {
    &__container {
      display: block;
    }

    &__preview {
      height: auto;
      width: 100%;
    }

    &__left, &__right {
      width: 100%;
      min-width: auto;
      max-width: 100%;
    }

    &__right {
      padding-left: 0;
    }

    &__left {
      flex-direction: column-reverse;
    }

    &__previews {
      display: flex;
      margin: 15px -8px;
      width: 100%;

      .item {
        margin: 0 8px;
        height: 80px;
        width: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, .15);

        &:hover {
          img {
            transform: none;
          }
        }
      }
    }
  }
}
</style>

