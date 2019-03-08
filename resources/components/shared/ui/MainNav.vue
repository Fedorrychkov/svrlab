<template>
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__item" v-for="item in nav" :key="item.name">
        <nuxt-link :to="item.link" class="nav__link link">{{$t(item.name)}}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      nav: [
        {link: 'musics', name: 'Musics'},
        {link: 'amplifiers', name: 'Amplifiers'},
        {link: 'about', name: 'About'},
      ]
    }
  }
};
</script>
<style lang="scss">
.nav {
  &__list {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-left: -8px;
    margin-right: -8px;
  }

  &__item {
    margin: 0 8px;
  }

  &__link {
    color: #fff;

    &:hover {
      color: #fff;
      opacity: .8;
    }

    &.nuxt-link-active {
      font-weight: 600;
    }
  }
}
</style>

