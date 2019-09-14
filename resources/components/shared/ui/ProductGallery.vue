<template>
  <aside class="gallery">
    <ul class="gallery__previews">
      <li class="item" v-for="img in item.images" :key="img.id" @click="selectCurrent(img)"><img :src="`/${img.path}/${img.large}`" :alt="item.name"></li>
    </ul>
    <div class="gallery__preview">
      <preview-photo :item="item" :current="currentImage" style="height: auto" />
    </div>
  </aside>
</template>
<script>
import PreviewPhoto from '@/components/shared/ui/PreviewPhoto';
import { getMainPhoto } from '@/helpers/product';

export default {
  data: () => ({
    currentImage: undefined,
  }),
  props: {
    item: Object,
  },
  components: {
    PreviewPhoto
  },
  mounted() {
    this.currentImage = getMainPhoto(this.item)
  },
  methods: {
    selectCurrent(item) {
      this.currentImage = `/${item.path}/${item.large}`
    }
  }
}
</script>
<style lang="scss" scoped>
.gallery {

  &__previews {
    width: 80px;
    min-width: 80px;
    height: auto;
    margin: -15px 0;
    margin-right: 15px;

    .item {
      width: 100%;
      margin: 15px 0;
      display: block;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;

      img {
        width: 100%;
        display: block;
        transition: all .15s ease-in-out;
      }

      &:hover {
        img {
          transform: scale(1.07);
        }
      }
    }
  }

  &__preview {
    height: 550px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, .15);
    overflow: hidden;
    border-radius: 4px;
  }
}
</style>
