<template>
  <article class="p-8" v-if="page">
    <h1 class="post-title">{{ page.title }}</h1>
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
      <li itemscope itemtype="https://data-vocabulary.org/Breadcrumb" class="inline-block text-xs">
        <nuxt-link to="/" itemprop="url">
          <font-awesome-icon :icon="['fa', 'home']" />
          <span itemprop="title">ホーム</span>
        </nuxt-link>
      </li>
      <li v-for="parentPath in parentPathList" :key="parentPath.path" itemscope itemtype="https://data-vocabulary.org/Breadcrumb" class="inline-block text-xs pr-1">
        <font-awesome-icon :icon="['fa', 'angle-right']" />
        <nuxt-link :to="`/${parentPath.path}`" itemprop="url">
          <span itemprop="title">{{ parentPath.name }}</span>
        </nuxt-link>
      </li>
    </ul>
    <!-- FIXME:タグ管理を入れたい -->
    <!-- FIXME:もくじを入れたい -->
    <!-- FIXME:カテゴリやタグごとのインデックスページを入れたい -->
    <p>{{ page.description }}</p>
    <div v-if="Object.keys(page.toc).length > 1" class="p-4 my-4 rounded-lg bg-gray-700">
      <ul class="text-sm">
        <li
          v-for="link of page.toc"
          :key="link.id"
          :class="{ 'toc2': link.depth === 2, 'toc3': link.depth === 3 }"
          class="p-2"
        >
          <NuxtLink :to="`#${link.id}`" class="block">{{ link.text }}</NuxtLink>
        </li>
      </ul>
    </div>
    <nuxt-content :document="page"/>
    <div class="text-xs grid justify-between grid-cols-3 mt-8">
      <NuxtLink v-if="prev" :to="`${prev.path}`" class="block">
        前の記事へ<br />（{{ prev.title }}）
      </NuxtLink>
      <span v-if="!prev"></span>
      <NuxtLink to="/" class="block text-center text-lg">
        <font-awesome-icon :icon="['fa', 'home']" />
      </NuxtLink>
      <NuxtLink v-if="next" :to="`${next.path}`" class="block text-right">
        次の記事へ<br />（{{ next.title }}）
      </NuxtLink>
      <span v-if="!next"></span>
    </div>
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
    // console.log('slug', page.slug)
    // パスを分解する
    const paths = pathMatch.split('/')
    // 親のパスリストを作る（パンくずと次へと前へのページのため）
    const parentPathList = paths.map((name, idx, array) => ({ path: array.slice(0, idx + 1).join('/'), name }))
    // 次や前のページ情報を取得するためのパスを取得する
    console.log(`next prev page path`, parentPathList[parentPathList.length - 2])
    const nextAndPrevPagePath = parentPathList.length > 1 ? parentPathList[parentPathList.length - 2].path : '/'
    console.log('nextAndPrevPagePath', nextAndPrevPagePath)
    // 次や前のページ情報を取得する
    const [prev, next] = await $content(nextAndPrevPagePath, { deep: false })
      // .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(paths[paths.length - 1])
      .fetch()
    console.log('result', {
      page,
      parentPathList,
      prev,
      next,
    })
    // データを返す
    return {
      page: page && page.length > 0 ? page[0] : page, // FIXME:pageが配列の時の暫定対応
      parentPathList,
      prev,
      next,
    }
  },
  data() {
    return {
      page: {},
      parentPathList: [],
      prev: {},
      next: {},
    }
  }
};
</script>
