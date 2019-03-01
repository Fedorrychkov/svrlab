<template>
  <aside class="sidenav blue elevation-12">
    <ul class="sidenav__list">
      <li class="sidenav__item" v-for="(item, i) in nav" :key="i">
        <nuxt-link class="sidenav__link" :to="item.link">
          <span class="icon">
            <no-ssr>
              <font-awesome-icon :icon="['fa', item.icon]" />
            </no-ssr>
          </span>
          <span class="text">{{item.name}}</span>
        </nuxt-link>
      </li>
    </ul>
  </aside>
</template>
<script>
export default {
  data() {
    return {
      nav: [
        { name: 'Доска', link: '/admin/dashboard', icon: 'columns' },
        { name: 'Усилители', link: '/admin/amplifiers', icon: 'columns' },
      ]
    }
  }
}
</script>
<style lang="scss">
.sidenav {
  min-width: var(--admin-sidenav-md-width);
  transition: all .15s ease-in-out;
  height: 100vh;

  &.small {
    min-width: var(--admin-sidenav-sm-width);
  }

  &__link {
    transition: background 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
    padding: 12px 16px;
    margin: 0;
    color: #fff;

    &:hover {
      background-color: rgba(255, 255, 255, .2);
      color: #fff;
      text-decoration: none;
    }

    .text {
      white-space: nowrap;
    }

    .icon {
      margin-right: 12px;
    }

  }
}
</style>
