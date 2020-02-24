<template>
  <div class="auth">
    <div class="container">
      <div class="auth-container">
        <div class="auth-box">
          <h2 class="title">{{title}}</h2>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String
  }
}
</script>
<style lang="scss" scoped>
  .auth {
    color: #fff;
    
    &-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-box {
      max-width: 480px;
      width: 100%;
      margin: 20px;
    }
  }
</style>
