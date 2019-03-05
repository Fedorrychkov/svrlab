<template>
  <aside class="image-list">
    <h4 class="image-list__title">Изображения товара</h4>
    <div class="image-list__item" v-for="item in items" :key="item" @click="click(item, 'preview')">
      <div class="image-item">
        <img :src="`/uploads/${item}`" alt="">
      </div>
    </div>
    <upload-img class="image-list__item" @uploaded="uploaded" />
  </aside>
</template>
<script>
import UploadImg from './UploadImg';
export default {
  data() {
    return {
      items: []
    }
  },
  props: ['callback'],
  components: {
    UploadImg
  },
  methods: {
    uploaded(files) {
      this.items = this.items.concat(files);

      this.$emit('uploaded', files);
    },
    click(item, type) {
      this.callback({
        mainPhoto: type === 'preview' ? item : '',
        deletePhoto: ''
      });
    }
  }
}
</script>
<style lang="scss">
  .image-list {
    margin: 15px 0 0;
    margin-left: -15px;
    margin-right: -15px;
    display: flex;
    flex-wrap: wrap;

    &__title {
      width: 100%;
      margin: 0 15px;
      font-size: 16px;
      font-weight: normal;
      color: rgba(0,0,0,.54);
    }

    &__item {
      border-radius: 4px;
      margin: 15px;
      width: 80px;
      height: 80px;
      overflow: hidden;

      .image-item {
        width: 100%;
        height: 100%;
      }

      img {
        display: block;
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
