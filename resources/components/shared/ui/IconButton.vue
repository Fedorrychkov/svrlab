<template>
  <button class="icon-button" @click="$emit('click')">
    <client-only>
      <font-awesome-icon class="icon-button__icon" :icon="['fa', icon]" />
    </client-only>
    <span class="icon-button__text">{{text}}</span>
  </button>
</template>
<script>
export default {
  props: ['icon', 'text'],
}
</script>
<style lang="scss" scoped>
.icon-button {
  font-size: 18px;
  color: var(--second-color);
  border-radius: 4px;
  border: 1px solid var(--second-color);
  padding: 10px 15px;
  transition: all .15s ease-out;

  &:hover {
    color: var(--primary-color);
    background-color: var(--second-color);
  }

  &__icon {
    margin-right: 8px;
  }

  &__text {
    font-size: 18px;
  }
}
</style>
