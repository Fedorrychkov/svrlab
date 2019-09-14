<template>
  <div class="preview height">
    <img :src="current" :alt="`Картинка для ${item.name}`"/>
  </div>
</template>
<script>
export default {
  props: {
    item: Object,
    current: String
  }
}
</script>
<style lang="scss" scoped>
.height {
  height: 100%;
}
.preview {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
</style>

