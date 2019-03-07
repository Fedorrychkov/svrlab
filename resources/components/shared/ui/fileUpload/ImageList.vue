<template>
  <aside class="image-list">
    <h4 class="image-list__title">Изображения товара</h4>
    <div class="image-list__item" v-for="item in items" :key="item.id">
      <div :class="{'image-item': true, 'main': mainPhoto === item.id}">
        <img :src="`/uploads/${item.large}`" alt="">
      </div>
      <div class="placeholder">
        <font-awesome-icon class="icon" :icon="['fa', 'home']" @click="main(item.id)" />
        <font-awesome-icon class="icon" :icon="['fa', 'times']"  @click="deletePhoto(item.id)"/>
      </div>
    </div>
    <upload-img class="image-list__item" @uploaded="uploaded" />
  </aside>
</template>
<script>
import UploadImg from './UploadImg';
import { DELETE_IMAGE } from '@/store/actions/images.js';


export default {
  data() {
    return {
      items: []
    }
  },
  props: ['callback', 'list', 'mainPhoto'],
  components: {
    UploadImg
  },
  mounted() {
    if (this.list) {
      this.items = this.items.concat(this.list);
    }
  },
  methods: {
    uploaded(files) {
      this.items = this.items.concat(files);

      this.$emit('uploaded', files);
    },
    main(id) {
      this.callback({
        mainPhoto: id
      });
    },
    deletePhoto(id) {
      this.$store.dispatch(`modules/images/${DELETE_IMAGE}`, id)
        .then(res => {
          const items = this.items.filter(item => item.id !== id);
          this.items = items;
          this.$emit('uploaded', items);
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
      position: relative;
      z-index: 1;

      &:hover {
        .placeholder {
          z-index: 1;
          opacity: 1;
        }
      }

      .placeholder {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, .5);
        color: #fff;
        z-index: -99;
        opacity: 0;
        transition: all .15s ease;
        margin-left: -6px;
        margin-right: -6px;

        .icon {
          display: block;
          font-size: 18px;
          cursor: pointer;
          margin: 0 6px;
        }

      }

      .image-item {
        width: 100%;
        height: 100%;
        cursor: pointer;

        &.main {
          border: 4px solid var(--footer);
        }
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
