<template>
  <article class="p-8">
    <h1>{{ page.title }}</h1>
    <amp-timeago
      class="text-xxs text-right pr-2 pb-1"
      layout="responsive"
      width="160"
      height="20"
      :datetime="page.updatedAt"
      locale="ja"
    >
      {{ page.updatedAt }}
    </amp-timeago>
    <ul>
      <li itemscope itemtype="https://data-vocabulary.org/Breadcrumb" class="inline-block text-xxs">
        <nuxt-link to="/" itemprop="url">
          <font-awesome-icon :icon="['fa', 'home']" />
          <span itemprop="title">ホーム</span>
        </nuxt-link>
      </li>
      <li v-for="parentPath in parentPathList" :key="parentPath.path" itemscope itemtype="https://data-vocabulary.org/Breadcrumb" class="inline-block text-xxs pr-1">
        <font-awesome-icon :icon="['fa', 'angle-right']" />
        <nuxt-link :to="`/${parentPath.path}`" itemprop="url">
          <span itemprop="title">{{ parentPath.name }}</span>
        </nuxt-link>
      </li>
    </ul>
    <!-- FIXME:タグ管理を入れたい -->
    <!-- FIXME:もくじを入れたい -->
    <p>{{ page.description }}</p>
    <nuxt-content :document="page"/>
  </article>
</template>

<script>
export default {
  amp: 'only',
  head () {
    return {
      title: this.page.title
    }
  },
  async asyncData({ $content, params, error }) {
  // async fetch() {
    // console.log(`params`, params)
    const pathMatch = params.pathMatch || "index"
    // console.log('pathMatch', pathMatch)
    const page = await /*this.$nuxt.context.*/ $content(pathMatch)
      .fetch()
      .catch(err => {
        error({ statusCode: 404, message: "Page not found" })
      })
    // console.log(`post`, page)
    // this.page = page
    // console.log(pathMatch.split('/'))
    return {
      page,
      parentPathList: pathMatch.split('/').map((name, idx, array) => ({ path: array.slice(0, idx + 1).join('/'), name }))
    }
  },
  data() {
    return {
      page: {}
    }
  }
};
</script>
