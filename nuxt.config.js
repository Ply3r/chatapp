import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - chatapp',
    title: 'chatapp',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/avatar.scss',
    '~/assets/scss/index.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-image-upload.js', mode: 'client' },
    {src: '~/plugins/Vuelidate'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  router: {
    middleware: ['checkToken']
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/composition-api/module',
    ['@pinia/nuxt', { disableVuex: false }],
    'vue-sweetalert2/nuxt',
  ],

  sweetalert: {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674'
  },

  bootstrapVue: {
    icons: true,
    components: ['BContainer', 'BRow', 'BCol', 'BFormInput', 'BButton', 'BTable', 'BModal'],
    directives: ['VBModal', 'VBPopover', 'VBTooltip', 'VBScrollspy'],
    componentPlugins: [
      'LayoutPlugin',
      'FormPlugin',
      'FormCheckboxPlugin',
      'FormInputPlugin',
      'FormRadioPlugin',
      'ToastPlugin',
      'ModalPlugin',
    ],
    directivePlugins: ['VBPopoverPlugin', 'VBTooltipPlugin', 'VBScrollspyPlugin']
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
