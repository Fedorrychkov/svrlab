<template>
  <page-section>
    <template slot="title">
      <h4 class="title">Усилители</h4>
    </template>
    <template slot="content">
      <template v-if="!loading && musics.length">
        <div class="list">
          <amplifier-card v-for="item in musics" :key="item.id" :item="item" :link="`/musics/${item.id}`" />
        </div>
      </template>
      <template v-if="!loading && !musics.length">
        <p class="empty">Приносим свои извинения, но список предложений ещё не готов, наши специалисты работают над этим!</p>
      </template>
    </template>
  </page-section>
</template>

<script>
import { GET_MUSICS } from '@/store/actions/music.js';
import AmplifierCard from '@/components/core/amplifiers/AmplifierCard';
import PageSection from '@/components/shared/PageSection';

export default {
  head() {
    return {
      title: 'Музыкальные композиции от композитора Рычкова Сергея Валентиновича'
    }
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    musics() {
      return this.$store.getters[`modules/music/musics`];
    }
  },
  created() {
    this.$store.dispatch(`modules/music/${GET_MUSICS}`)
      .catch(err => {
      }).finally(() => {
        this.loading = false;
      });
  },
  mounted() {
  },
  components: {
    AmplifierCard,
    PageSection
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

