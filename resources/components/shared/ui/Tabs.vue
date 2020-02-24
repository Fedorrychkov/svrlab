<template>
  <div class="tabs">
    <ul class="tabs__head">
      <li :class="{'tabs__tab': true, 'active': item.active}" v-for="item in items" :key="item.id" @click="$emit('clickedItem', item.id)">
        <span>{{item.title}}</span>
        <span class="value" v-if="item.orders.length"> {{item.orders.length}}</span>
      </li>
    </ul>
    <div class="tabs__content">
      <div :class="{'tabs__block': true}">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: Array
  }
}
</script>
<style lang="scss" scoped>
.tabs {
  margin: 30px 0;

  &__head {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin: 0 -8px;
    padding-left: 0;
  }

  &__tab {
    padding: 8px;
    border-radius: 4px 4px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    &.active {
      background-color: rgba(0, 0, 0, .05);
    }

    .value {
      margin-left: 2px;
      font-size: 14px;
      color: #999;
    }
  }

  &__content {
    background-color: rgba(0, 0, 0, .05);
    padding: 8px;
    margin: 0 -8px;
    border-radius: 0 0 4px 4px;
    min-height: 60px;
  }
}
</style>
