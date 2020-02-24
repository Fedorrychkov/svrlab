<template>
  <v-app>
    <div class="page page__full page__default">
      <div class="page__content">
        <top-bar />
        <my-header/>
        <nuxt/>
      </div>
      <my-footer/>
    </div>
  </v-app>
</template>

<script>
import MyFooter from '~/components/partial/Footer'
import MyHeader from '~/components/partial/Header'
import TopBar from '~/components/partial/AdminTopbar';

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
    MyHeader,
    TopBar,
  },
}
</script>
