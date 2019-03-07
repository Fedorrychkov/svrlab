<template>
  <div class="page page__full page__default">
    <div class="page__content">
      <my-header/>
      <nuxt/>
    </div>
    <my-footer/>
  </div>
</template>

<script>
import MyFooter from '~/components/partial/Footer'
import MyHeader from '~/components/partial/Header'

export default {
  data() {
    return {
      locale: 'ru'
    }
  },
  mounted() {
    var userLang = localStorage.getItem('svrlab.language') || navigator.language || navigator.userLanguage;
    this.locale = userLang.substring(0, 2);
  },
  watch: {
    locale (val) {
      this.$i18n.locale = val;
    }
  },
  components: {
    MyFooter,
    MyHeader
  },
}
</script>
