'use strict'

const resolve = require('path').resolve
const Env = use('Env')
const PORT = Env.get('PORT');
module.exports = {
  /*
  ** Headers of the page
  */
  plugins: [
    {src: '~/plugins/vue-vuetify', ssr: true},
    // {src: '~/plugins/vue-particles', ssr: false},
    {src: '~/plugins/vue-scrollto', ssr: false},
    {src: '~/plugins/vue-fontawesome', ssr: false},
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
  modules: ['@nuxtjs/apollo'],
  apollo: {
    tokenName: 'yourApolloTokenName', // optional, default: apollo-token
    tokenExpires: 10, // optional, default: 7 (days)
    includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
    authenticationType: 'Basic', // optional, default: 'Bearer'
    // optional
    errorHandler (error) {
      console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
    },
    // required
    clientConfigs: {
      default: {
        // required
        httpEndpoint: `http://localhost:${PORT}/api/graphql`,
        // optional
        // See https://www.apollographql.com/docs/link/links/http.html#options
        httpLinkOptions: {
          credentials: 'same-origin'
        },
        // You can use `wss` for secure connection (recommended in production)
        // Use `null` to disable subscriptions
        wsEndpoint: null, //'ws://localhost:3000', // optional
        // LocalStorage token
        tokenName: 'apollo-token', // optional
        // Enable Automatic Query persisting with Apollo Engine
        persisting: false, // Optional
        // Use websockets for everything (no HTTP)
        // You need to pass a `wsEndpoint` for this to work
        websocketsOnly: false // Optional
      },
      test: {
        httpEndpoint: `http://localhost:${PORT}/api/graphql`,
        wsEndpoint: null,
        tokenName: 'apollo-token'
      },
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
