<template>
  <auth-container title="Авторизация">
    <v-form
      ref="form"
      @submit.prevent="submit"
      v-model="valid"
      :lazy-validation="lazy"
    >
      <v-text-field
        v-model="login"
        label="Логин"
        :rules="[v => !!v || 'Поле обязательно для заполнения']"
        required
        dark
      />
      <v-text-field
        type="password"
        v-model="password"
        :rules="[v => !!v || 'Поле обязательно для заполнения']"
        label="Пароль"
        required
        dark
      />
      <div class="buttons">
        <v-btn class="ma-2" outlined color="white" large :loading="loading" @click="submit">Войти</v-btn>
      </div>
    </v-form>
  </auth-container>
</template>
<script>
import AuthContainer from '@/components/partial/AuthContainer'
import { AUTH_START } from '@/store/modules/auth'
import logger from '@/utils/logger'

export default {
  middleware: ['isauth'],
  data: () => ({
    valid: true,
    lazy: true,
    loading: false,
    login: '',
    password: ''
  }),
  components: {
    AuthContainer
  },
  methods: {
    validate () {
      return this.$refs.form.validate()
    },
    submit () {
      if (!this.validate()) return
      this.loading = true
      const payload = {
        component: this,
        email: this.login,
        password: this.password,
        isAdmin: true,
        isRedirect: true,
        redirect: this.$router.history.current.query.redirect || null
      }

      try {
        this.$store.dispatch(`modules/auth/${AUTH_START}`, payload)
      } catch (error) {
        logger.error(error)
      } finally {
        this.login = ''
        this.password = ''
        this.loading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.auth {
  .buttons {
    margin: 0 -8px;
  }
}
</style>
