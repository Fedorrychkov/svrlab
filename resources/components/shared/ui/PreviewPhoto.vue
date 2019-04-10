<template>
  <div class="preview height">
    <template v-for="img in item.images" >
      <img :src="`/${img.path}/${img.large}`" :alt="`Картинка для ${item.name}`" :key="img.id" v-if="item.mainPhoto && item.mainPhoto === img.id" />
    </template>
    <img :src="`/${item.images[0].path}/${item.images[0].large}`" :alt="`Картинка для ${item.name}`" v-if="!item.mainPhoto" />
  </div>
</template>
<script>
export default {
  props: ['item']
}
</script>
<style lang="scss" scoped>
.height {
  height: 100%;
}
</style>

