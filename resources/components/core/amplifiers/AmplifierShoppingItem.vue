<template>
  <article :class="{'shopping-item': true, 'has-error': item.quantity > item.inventory}">
    <div class="shopping-item__preview">
      <preview-photo :item="item" />
    </div>
    <div class="shopping-item__info">
      <h6 class="shopping-item__title title">
        <span class="name">{{item.name}}</span>
      </h6>
      <div class="shopping-item__meta">
        <div class="shopping-item__counter">
          <shopping-item-counter :item="item" />
        </div>
        <div class="shopping-item__value">
          <span class="cost">
            {{ item.quantity * item.cost | numFormat }} <i class="symbol rouble"> ₽</i>
          </span>
          <span class="remove" @click="removeProduct(item.id)">
            <client-only>
              <font-awesome-icon class="icon" :icon="['fa', 'trash-alt']"/>
            </client-only>
          </span>
        </div>
      </div>
    </div>
    <div class="shopping-item__error" v-if="item.quantity > item.inventory">
      Количество товара в заказе превышает имеющийся на складе. Данный товар будет специально изготовлен для Вас.
    </div>
  </article>
</template>
<script>
import PreviewPhoto from '@/components/shared/ui/PreviewPhoto';
import ShoppingItemCounter from './ShoppingItemCounter';
import { REMOVE_FROM_BASKET } from '@/store/actions/cart.js';

export default {
  components: {
    PreviewPhoto,
    ShoppingItemCounter
  },
  props: ['item'],
  methods: {
    removeProduct(id) {
      this.$store.dispatch(`modules/cart/${REMOVE_FROM_BASKET}`, {id});
    },
  }
}
</script>
<style lang="scss">
.shopping-item {
  width: 100%;
  border: 1px solid var(--primary-color);
  background-color: var(--primary-color);
  margin: 20px 0;
  color: var(--second-color);
  border-radius: 2px;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &__title {
    width: 50%;
    font-size: 16px !important;
  }

  &__meta {
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__value {
    .cost, i {
      font-style: normal;
    }

    .remove {
      cursor: pointer;
      margin: 0 10px;
    }
  }

  &__preview {
    width: 120px;
    min-width: 120px;
    display: flex;
    justify-content: center;
    align-items: center;

    .preview {
      height: auto;
      img {
        width: 100%;
      }
    }
  }

  &.has-error {
    flex-wrap: wrap;
  }

  &__error {
    width: 100%;
    padding: 6px;
    border-top: 1px solid rgba(255, 255, 255, .05);
    background-color: var(--info-color);
  }

  &__info {
    padding: 8px;
    width: calc(100% - 120px);
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
