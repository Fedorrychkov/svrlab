<template>
  <section class="homepage">
    <custom-slider :images="sliderImages" />
    <page-section v-if="!loading && amplifiers.length">
      <template slot="title">
        <h4 class="title">Усилители</h4>
      </template>
      <template slot="content">
        <div class="list">
          <amplifier-card v-for="item in amplifiers" :key="item.id" :item="item" :link="`/amplifiers/${item.id}`" />
        </div>
      </template>
    </page-section>
    <page-section v-if="!loading && musics.length">
      <template slot="title">
        <h4 class="title">Музыка</h4>
      </template>
      <template slot="content">
        <div class="list">
          <amplifier-card v-for="item in musics" :key="item.id" :item="item" :link="`/musics/${item.id}`" />
        </div>
      </template>
    </page-section>
  </section>
</template>
<script>
import { GET_AMPLIFIERS } from '@/store/actions/amplifier.js';
import { GET_MUSICS } from '@/store/actions/music.js';
import AmplifierCard from '@/components/core/amplifiers/AmplifierCard';
import PageSection from '@/components/shared/PageSection';
import CustomSlider from '@/components/shared/Slider/CustomSlider';

export default {
  head() {
    return {
      title: 'Музыкально оборудование от SVR'
    }
  },
  data() {
    return {
      loading: true,
      sliderImages: [
        'corrector.jpg',
      ],
    }
  },
  computed: {
    amplifiers() {
      return this.$store.getters[`modules/amplifier/amplifiers`];
    },
    musics() {
      return this.$store.getters[`modules/music/musics`];
    }
  },
  created() {
    this.$store.dispatch(`modules/amplifier/${GET_AMPLIFIERS}`)
      .then(() => {
        this.$store.dispatch(`modules/music/${GET_MUSICS}`);
      }).catch(err => {
      }).finally(() => {
        this.loading = false;
      });
  },
  components: {
    AmplifierCard,
    PageSection,
    CustomSlider,
  }
}
</script>
<style lang="scss" scoped>
.list {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: -15px;
  margin-right: -15px;
  flex-wrap: wrap;
}

.empty {
  color: #fff;
  font-size: 20px;
  text-align: center;
  width: 100%;
}
</style>


