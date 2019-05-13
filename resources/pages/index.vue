<template>
  <section class="homepage">
    <page-section>
      <template slot="title">
        <h4 class="title">Усилители</h4>
      </template>
      <template slot="content">
        <template v-if="!loading && amplifiers.length">
          <div class="list">
            <amplifier-card v-for="item in amplifiers" :key="item.id" :item="item" :link="`/amplifiers/${item.id}`" />
          </div>
        </template>
        <template v-if="!loading && !amplifiers.length">
          <p class="empty">Приносим свои извинения, но список предложений ещё не готов, наши специалисты работают над этим!</p>
        </template>
      </template>
    </page-section>
    <page-section>
      <template slot="title">
        <h4 class="title">Музыка</h4>
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
  </section>
</template>
<script>
import { GET_AMPLIFIERS } from '@/store/actions/amplifier.js';
import { GET_MUSICS } from '@/store/actions/music.js';
import AmplifierCard from '@/components/core/amplifiers/AmplifierCard';
import PageSection from '@/components/shared/PageSection';

export default {
  head() {
    return {
      title: 'Музыкально оборудование от SVR'
    }
  },
  data() {
    return {
      loading: true,
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


