<template>
  <aside class="sidenav blue elevation-12">
    <div class="sidenav__head">
      <div class="sidenav__logo">
        <span class="logo">SVR<i>lab</i></span>
        <span class="panel">Управление</span>
      </div>
    </div>
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
        { name: 'Заказы', link: '/admin/orders', icon: 'shopping-basket' },
        { name: 'Усилители', link: '/admin/amplifiers', icon: 'archive' },
        { name: 'Музыка', link: '/admin/musics', icon: 'music' },
        { name: 'Настройки', link: '/admin/settings', icon: 'cog' }
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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;

  &__head {
    padding: 6px 0 5px;
    padding-left: 16px;
    background-color: rgba(255, 255, 255, .2);
  }

  &__logo {
    margin: 0 auto;
    display: inline-block;

    .logo, .panel {
      display: block;
      color: #fff;
      line-height: 1;
    }

    .logo {
      font-size: 24px;
      font-weight: 600;

      i {
        font-style: normal;
        font-size: 16px;
      }
    }

    .panel {
      font-size: 14px;
    }
  }

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
      width: 16px;
    }

  }
}
</style>
