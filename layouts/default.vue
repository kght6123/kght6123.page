<template>
  <amp-body>
    <amp-sidebar id="menu-sidebar" layout="nodisplay" side="left" class="w-full md:w-1/3 bg-gray-600">
      <amp-nested-menu layout="fill">
        <ul>
          <!--li>
            <h4 amp-nested-submenu-open>Open Sub-Menu</h4>
            <div amp-nested-submenu>
              <ul>
                <li>
                  <h4 amp-nested-submenu-close>Go back</h4>
                </li>
                <li>
                  <h4 amp-nested-submenu-open>Open Another Sub-Menu</h4>
                  <div amp-nested-submenu>
                    <h4 amp-nested-submenu-close>Go back</h4>
                  </div>
                </li>
              </ul>
            </div>
          </li-->
          <!--
          <li class="p-2">
            <input v-model="query" type="search" class="block text-gray-200 bg-gray-700 rounded-full" autocomplete="off" @input="search" />
            <ul v-if="contents.length">
              <li v-for="content of contents" :key="content.slug">
                <NuxtLink :to="`${content.path}`" class="block">{{ content.title }}</NuxtLink>
              </li>
            </ul>
          </li>
          -->
          <li v-for="file in menus" :key="file.slug" class="p-2">
            <nuxt-link class="block" :to="`${file.path}`">
              {{ file.title }}
            </nuxt-link>
          </li>
          <li class="p-2">
            <nuxt-link class="block" to="/tags">
              投稿タグの一覧
            </nuxt-link>
          </li>
          <li class="p-2">
            <a target="_blank" href="https://amp.dev/">amp.dev（外部リンク）</a>
          </li>
        </ul>
      </amp-nested-menu>
    </amp-sidebar>
    <amp-sidebar id="profile-sidebar" layout="nodisplay" side="right" class="w-full md:w-1/3 bg-gray-600">
      <article class="flex-col-center">
        <header>
          <h1>About</h1>
        </header>
        <section class="flex-col-center text-center">
          <h2>本サイトについて</h2>
          <p class="text-xs px-12">趣味で開発したプログラムや開発メモを載せています。<br />
          ソースコードはGithubで公開しつつ、なるべく後から分かるように解説に努めてますので、<br>
          誰かのお役に立てれば嬉しいです。</p>
          <h2>プロフィール</h2>
          <div class="overflow-hidden w-32 h-32 rounded-full flex-row-center bg-gray-800">
            <amp-img src="icon.png" layout="intrinsic" width="600" height="600" class="block"></amp-img>
          </div>
          <div class="text-center">
            <h3>kght6123</h3>
            <p class="text-xs px-12">佐賀県出身で1985年生まれ。<br />
            三重県四日市市在住のシステムエンジニア。家庭を大事にしたい1児の父。</p>
          </div>
          <div class="text-xs flex-row-center">
            <a href="https://twitter.com/kght6123" target="_blank" class="block mx-2"><font-awesome-icon :icon="['fab', 'twitter']" />&nbsp;Twitter</a>
            <a href="https://github.com/kght6123" target="_blank" class="block mx-2"><font-awesome-icon :icon="['fab', 'github']" />&nbsp;Github</a>
          </div>
        </section>
      </article>
    </amp-sidebar>

    <!--amp-auto-ads type="adsense" data-ad-client="ca-pub-9175345651644872">
    </amp-auto-ads-->

    <header class="bg-gray-600 flex flex-row flex-no-wrap justify-between items-center content-center shadow-md fixed top-0 w-full z-50">
      <button class="p-4 font-black" on="tap:menu-sidebar">
        <font-awesome-icon :icon="['fa', 'bars']" />
      </button>
      <nuxt-link to="/" class="no-underline">
        <h1 class="text-base font-bold mt-3">kght6123.page</h1>
      </nuxt-link>
      <button class="p-4 font-black" on="tap:profile-sidebar">
        <font-awesome-icon :icon="['fa', 'house-user']" />
      </button>
    </header>
    <Nuxt class="lg:mx-48 xl:mx-64 bg-gray-600" style="padding-top: 3.5rem;" />
    <aside class="lg:mx-48 xl:mx-64 bg-gray-600 grid grid-cols-3 grid-rows-1 gap-6 p-2 px-6 justify-center items-center content-around justify-items-center">
      <amp-social-share type="twitter" layout="fixed-height" height="40"></amp-social-share>
      <!--amp-social-share type="facebook" class="w-full bg-gray-600 rounded-sm"></amp-social-share-->
      <amp-social-share type="line" layout="fixed-height" height="40"></amp-social-share>
      <amp-social-share type="system" layout="fixed-height" height="40"></amp-social-share>
    </aside>
  </amp-body>
</template>

<script>
export default {
  async fetch() {
    const menus = await this.$nuxt.context.$content('/', { deep: false }).limit(10).sortBy('createdAt', 'asc').fetch()
    // console.log('fetch menus', menus[0], this.$fetchState)
    this.menus = menus
  },
  data() {
    return {
      menus: [],
      // query: '',
      // contents: []
    }
  },
  methods: {
    // async search({ target }) {
    //   console.log('watch', target.value)
    //   if (!target.value) {
    //     this.contents = []
    //     return
    //   }
    //   this.contents = await this.$content('/', { deep: true })
    //     .only(['title', 'slug'])
    //     .sortBy('updatedAt', 'desc')
    //     .limit(12)
    //     .search(target.value)
    //     .fetch()
    // }
  }
}
</script>