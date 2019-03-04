<template>
  <aside class="image-list">
    <h4 class="image-list__title">Изображения товара</h4>
    <div class="image-list__item" v-for="item in items" :key="item.name" @click="click(item.id)">
      <div class="image-item">
        <img src="/uploads/1.jpeg" alt="">
      </div>
    </div>
    <upload-img class="image-list__item" />
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
    click() {
      this.callback({mainId: id})
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

    &__item, .image-item {
      border-radius: 4px;
      margin: 15px;
      width: 80px;
      height: 80px;
      overflow: hidden;

      img {
        display: block;
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
