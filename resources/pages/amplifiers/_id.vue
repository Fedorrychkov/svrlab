<template>
  <div class="amplifier-page">
    is amplifier
  </div>
</template>
<script>
import { GET_AMPLIFIER } from '@/store/actions/amplifier.js';

export default {
  data() {
    return {
      loading: false,
      id: null,
    }
  },
  computed: {
    amplifier() {
      return this.$store.getters[`modules/amplifier/amplifier`];
    }
  },
  created() {
    this.id = this.$router.history.current.params.id;
    this.$store.dispatch(`modules/amplifier/${GET_AMPLIFIER}`, this.id)
      .catch(err => {
      }).finally(() => {
        this.loading = false;
      });
  },
}
</script>
<style lang="scss">
.amplifier-page {
  color: var(--second-color);
}
</style>

