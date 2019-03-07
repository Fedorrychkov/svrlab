<template>
  <admin-template>
    <template slot="title">
      <h2 class="title">Настройка</h2>
    </template>
    <template slot="content">
      <pane>
        <template slot="head">
        </template>
        <template slot="content">
          <p>Способы оплаты</p>
          <p>Способы доставки</p>
          <p>Сменить пароль администратора</p>
          <p>Почта магазина</p>
          <p>Телефон магазина</p>
          <p>Адрес магазина</p>
        </template>
      </pane>
    </template>
  </admin-template>
</template>
<script>
import AdminTemplate from '@/components/shared/AdminPageTemplate';
import Pane from '@/components/shared/Pane';

export default {
  layout: 'admin',
  components: {
    AdminTemplate,
    Pane
  }
}
</script>
