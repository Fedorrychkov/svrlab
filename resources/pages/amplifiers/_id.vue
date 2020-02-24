<template>
  <div :class="{'amplifier-page': true, 'loading': loading}" v-if="!loading">
    <div class="container">
      <div class="amplifier-page__container">
        <product-gallery class="amplifier-page__left" :item="amplifier" />
        <div class="amplifier-page__right">
          <h3 class="amplifier-page__title">{{amplifier.name}}</h3>
          <div class="amplifier-page__info">
            <p class="amplifier-page__cost field" v-if="!loading">
              <span class="key">Цена:</span>
              <span class="value" v-if="amplifier.cost">
                {{amplifier.cost | numFormat}}
                <i class="symbol rouble">₽</i>
              </span>
              <span class="value" v-else>
                Договорная
              </span>
            </p>
          </div>
          <icon-button class="amplifier-page__button" text="Добавить в корзину" icon="cart-plus" @click="addProductToBasket()" />
        </div>
      </div>
      <div class="amplifier-page__content">
        <v-card class="tabs-card">
          <v-tabs class="tabs-card-tabs" slider-color="white">
            <v-tab class="tabs-card-tab">Описание</v-tab>
            <v-tab class="tabs-card-tab" v-if="amplifier && amplifier.customFields && amplifier.customFields.length">Характеристики</v-tab>
            <v-tab-item class="tabs-card-tab-content">
              <div class="description">{{amplifier.short}}</div>
            </v-tab-item>
            <v-tab-item  class="tabs-card-tab-content" v-if="amplifier && amplifier.customFields && amplifier.customFields.length">
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr v-for="(item, i) in amplifier.customFields" :key="i">
                      <td>{{ item.fieldName }}</td>
                      <td>{{ item.fieldValue }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
import { GET_AMPLIFIER } from '@/store/actions/amplifier.js';
import { ADD_TO_BASKET } from '@/store/actions/cart.js';
import IconButton from '@/components/shared/ui/IconButton';
import ProductGallery from '@/components/shared/ui/ProductGallery';

export default {
  data() {
    return {
      loading: true,
      id: null,
    }
  },
  components: {
    IconButton,
    ProductGallery
  },
  computed: {
    amplifier() {
      return this.$store.getters[`modules/amplifier/amplifier`];
    },
  },
  created() {
    this.id = this.$router.history.current.params.id;
    this.$store.dispatch(`modules/amplifier/${GET_AMPLIFIER}`, this.id)
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    addProductToBasket() {
      this.$store.dispatch(`modules/cart/${ADD_TO_BASKET}`, this.amplifier)
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

  .description {
    white-space: pre;
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

  .tabs-card {
    background-color: transparent;
    color: #fff !important;
    border-color: transparent;
    margin: 24px 0;
    box-shadow: none;

    &-tabs {
      .v-tabs__bar, .v-tabs__div, .v-tabs-bar, .v-tabs-bar .v-tab:not(.v-tab--active), .v-tabs-items {
        background-color: transparent;
        color: #fff !important;
      }

      .v-tabs__bar, .v-tabs-bar {
        margin-bottom: 24px;
      }

      .theme--light.v-data-table {
        background-color: transparent;
        color: #fff !important;
      }
    }
  }

  &__content {
    min-height: 250px;
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

