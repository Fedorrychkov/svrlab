<template>
  <page-section>
    <template slot="title">
      <h4 class="title">Усилители</h4>
    </template>
    <template slot="content">
      <template v-if="!loading && amplifiers.length > 0">
        <div class="list">
          <amplifier-card v-for="item in amplifiers" :key="item.id" :item="item" />
        </div>
      </template>
    </template>
  </page-section>
</template>

<script>
import { GET_AMPLIFIERS } from '@/store/actions/amplifier.js';
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
    }
  },
  created() {
    this.$store.dispatch(`modules/amplifier/${GET_AMPLIFIERS}`)
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
</style>

