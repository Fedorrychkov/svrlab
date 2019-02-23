'use strict'

const resolve = require('path').resolve

module.exports = {
  /*
  ** Headers of the page
  */
  plugins: [
    {src: '~/plugins/vue-vuetify', ssr: false},
    // {src: '~/plugins/vue-particles', ssr: false},
    {src: '~/plugins/vue-scrollto', ssr: false},
    '~/plugins/vue-lang',
  ],
  pluginOptions: {
    i18n: {
      locale: "ru",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false
    }
  },
  head: {
    title: 'SVR Laboratory - авторское музыкальное оборудование и музыка',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Сайт Сергея Валентиновича Рычкова, производителя авторского музыкального оборудования и медитативной музыки.'
      },
      // OG META TAGS
      // {
        // property: 'og:image',
        // content: 'og-image.jpg'
      // },
      // {
      //   property: 'og:image:width',
      //   content: '333'
      // },
      // {
      //   property: 'og:image:height',
      //   content: '500'
      // },
      {
        property: 'og:title',
        content: 'SVR Laboratory - авторское музыкальное оборудование и музыка'
      },
      {
        property: 'og:url',
        content: 'https://svrlab.com/'
      },
      {
        property: 'og:description',
        content: 'Сайт Сергея Валентиновича Рычкова, производителя авторского музыкального оборудования и медитативной музыки.'
      }
    ],
    link: [
      {
        href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons',
        rel: 'stylesheet'
      }
      // {
      //   rel: 'icon',
      //   type: 'image/x-icon',
      //   href: 'favicon.ico'
      // }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/scss/main.scss'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#744d82' },
  /*
  ** Point to resources
  */
  srcDir: resolve(__dirname, '..', 'resources')
}
