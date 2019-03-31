<template>
  <div :class="{'amplifier-page': true, 'loading': loading}">
    <div class="container">
      <div class="amplifier-page__container">
        <aside class="amplifier-page__left">
          <ul class="amplifier-page__previews">
            <li class="item" v-for="img in amplifier.images" :key="img.id"><img :src="`/${img.path}/${img.large}`" :alt="amplifier.name"></li>
          </ul>
          <div class="amplifier-page__preview">
            <template v-for="img in amplifier.images">
              <img :src="`/${img.path}/${img.large}`" :alt="`Картинка для ${item.name}`" :key="img.id" v-if="amplifier.mainPhoto && amplifier.mainPhoto === img.id" />
            </template>
            <img v-if="!loading && !amplifier.mainPhoto" :src="`/${amplifier.images[0].path}/${amplifier.images[0].large}`" :alt="`Картинка для ${amplifier.name}`" />
          </div>
        </aside>
        <div class="amplifier-page__right">
          <h3 class="amplifier-page__title">{{amplifier.name}}</h3>
          <p class="amplifier-page__cost field" v-if="!loading">
            <span class="key">Цена</span>
            <span class="value">
              {{amplifier.cost | numFormat}}
              <i class="symbol rouble">₽</i>
            </span>
          </p>
        </div>
      </div>
      <div class="amplifier-page__content">

      </div>
    </div>
  </div>
</template>
<script>
import { GET_AMPLIFIER } from '@/store/actions/amplifier.js';

export default {
  data() {
    return {
      loading: true,
      id: null,
    }
  },
  computed: {
    amplifier() {
      return this.$store.getters[`modules/amplifier/amplifier`];
    }
  },
  created() {
    this.id = this.$router.history.current.params.id;
    this.$store.dispatch(`modules/amplifier/${GET_AMPLIFIER}`, this.id)
      .catch(err => {
      }).finally(() => {
        this.loading = false;
      });
  },
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

  &__left {
    min-width: 550px;
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
    padding-left: 15px;
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
    font-size: 24px;

    i {
      font-style: normal;
    }
  }

  &__previews {
    width: 80px;
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
}
</style>

