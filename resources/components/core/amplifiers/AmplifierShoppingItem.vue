<template>
  <article class="shopping-item">
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
            <no-ssr>
              <font-awesome-icon class="icon" :icon="['fa', 'trash-alt']"/>
            </no-ssr>
          </span>
        </div>
      </div>
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
  border: 1px solid var(--second-color);
  margin: 40px 0;
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

  &__info {
    padding: 8px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
