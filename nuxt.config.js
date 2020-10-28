
const modifyHtml = (html) => {
  // もし、生成されるHTMLを加工したいときはここに処理を書く
  // 長いコードを書くときは、pluginsにjsを置いてインポートする
  // html = html.replace('げぐはつ', 'げぐはつうーー')
  return html
}

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static', // Doc: https://nuxtjs.org/blog/going-full-static
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#'
    },
    titleTemplate: '%s - kght6123.page',
    title: 'げぐはつぺーじ',
    meta: [
      { charset: 'utf-8' },
      { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '趣味で開発したプログラムや開発メモを載せています。ソースコードはGithubで公開しつつ、なるべく後から分かるように解説に努めてますので、誰かのお役に立てれば嬉しいです。' },
      { hid: 'og:locale', property: 'og:locale', content: 'ja_JP' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'げぐはつぺじ' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:title', property: 'og:title', content: 'げぐはつぺじ', },
      { hid: 'og:description', property: 'og:description', content: '趣味で開発したプログラムや開発メモを載せています。ソースコードはGithubで公開しつつ、なるべく後から分かるように解説に努めてますので、誰かのお役に立てれば嬉しいです。' },
      { hid: 'og:image', property: 'og:image', content: '/images/top1.jpg' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@kght6123' },
      { hid: 'twitter:creator', name: 'twitter:creator', content: '@kght6123' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // Doc: https://github.com/nuxt-community/fontawesome-module
    '@nuxtjs/fontawesome',
  ],
  /*
  ** FontAwesome module
  */
  fontawesome: {
    icons: {
      solid: ['faHome', 'faBars', 'faHouseUser', 'faAngleRight'],
      regular: [],
      light: [],
      duotone: [],
      brands: ['faTwitter','faGithub']
    }
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    // Doc: https://github.com/nuxt-community/amp-module
    ['@nuxtjs/amp', { /* module options */ }]
  ],
  /*
  ** Content module configuration
  ** See https://content.nuxtjs.org/configuration
  */
  content: {
    // nestedProperties: ['tags'],
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-dark.css'
      },
      remarkPlugins: [
        'remark-squeeze-paragraphs',
        'remark-slug',
        /*'remark-autolink-headings',*/
        ['remark-autolink-headings', { linkProperties: { ariaHidden: true }}],
        'remark-external-links',
        'remark-footnotes',
        '~/plugins/debug-remark-plugin.js']
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  // router: {
  //   prefetchLinks: false
  // },
  generate: {
    async routes () {
      // Doc: https://content.nuxtjs.org/advanced#static-site-generation https://content.nuxtjs.org/ja/advanced/#%E9%9D%99%E7%9A%84%E3%82%B5%E3%82%A4%E3%83%88%E7%94%9F%E6%88%90
      const { $content } = require('@nuxt/content')
      const files = await $content('/', { deep: true }).only(['path']).fetch()
      return files.map(file => file.path === '/index' ? '/' : file.path)
    }
  },
  amp: {
    origin: 'https://kght6123.page/'
  },
  pwa: {
    // Doc: https://pwa.nuxtjs.org/meta
    meta: {
      name: 'げぐはつぺじ',
      author: 'kght6123',
      description: '趣味で開発したプログラムや開発メモを載せています。ソースコードはGithubで公開しつつ、なるべく後から分かるように解説に努めてますので、誰かのお役に立てれば嬉しいです。',
      lang: 'ja',
      nativeUI: true,
    },
    manifest: {
      name: 'げぐはつぺじ',
      short_name: 'げぐはつぺじ',
      lang: 'ja',
    }
  },
  hooks: {
    'render:route': (_url, page) => {
      page.html = modifyHtml(page.html)
    },
    'generate:page': (page) => {
      page.html = modifyHtml(page.html)
    }
  }
}
