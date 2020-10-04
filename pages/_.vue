<template>
  <main>
    <article class="p-8" v-if="isPageListView === true">
      <!-- 記事リストのとき -->
      <h1 class="mt-2">{{ `${tagName} タグの付いた記事一覧` || `${category} カテゴリの記事一覧` }}</h1>
      <ul v-if="tags" class="mt-1">
        <li v-for="tag in tags" :key="tag" class="inline-block text-xs pr-1 mb-1">
          <nuxt-link class="block rounded-lg bg-gray-700 py-1 px-3" :to="`/tags/${tag}`">
            {{ tag }}
          </nuxt-link>
        </li>
      </ul>
      <ol v-if="pages" class="p-4 my-4 rounded-lg bg-gray-700">
        <li v-for="page in pages" :key="page.slug">
          <nuxt-link class="block pb-2" :to="`${page.path}`">
            {{ page.title }}
            <amp-timeago
              class="text-xxs align-text-bottom"
              layout="fixed"
              :datetime="page.updatedAt"
              width="56"
              height="16"
              locale="ja"
            >
              {{ page.updatedAt }}
            </amp-timeago>
          </nuxt-link>
        </li>
      </ol>
    </article>
    <article class="p-8" v-if="isPageListView === false">
      <!-- 記事のとき -->
      <div class="overflow-hidden h-32 flex-row-center mb-4">
        <amp-img v-if="page.eyecatchImage" :src="page.eyecatchImage[0]" layout="intrinsic" :width="page.eyecatchImage[1]" :height="page.eyecatchImage[2]" class="block"></amp-img>
      </div>
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
      <ul itemtype="https://schema.org/BreadcrumbList">
        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" class="inline-block text-xs">
          <nuxt-link to="/" itemprop="item">
            <font-awesome-icon :icon="['fa', 'home']" />
            <span itemprop="name">ホーム</span>
          </nuxt-link>
          <meta itemprop="position" content="1" />
        </li>
        <li v-for="(parentPath, index) in parentPathList" :key="parentPath.path" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" class="inline-block text-xs pr-1">
          <font-awesome-icon :icon="['fa', 'angle-right']" />
          <nuxt-link :to="`/${parentPath.path}`" itemprop="item">
            <span itemprop="name">{{ parentPath.name }}</span>
          </nuxt-link>
          <meta itemprop="position" :content="index + 2" />
        </li>
      </ul>
      <p>{{ page.description }}</p>
      <ul v-if="page.tags" class="mt-1">
        <li v-for="tag in page.tags" :key="tag" class="inline-block text-xs pr-1 mb-1">
          <nuxt-link class="block rounded-lg bg-gray-700 py-1 px-3" :to="`/tags/${tag}`">
            {{ tag }}
          </nuxt-link>
        </li>
      </ul>
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
      <div v-if="tags" class="mt-8">
        <h5 class="text-xs">関連タグ</h5>
        <ul class="mt-1">
          <li v-for="tag in tags" :key="tag" class="inline-block text-xs pr-1">
            <nuxt-link class="block rounded-lg bg-gray-700 py-1 px-3 mb-1" :to="`/tags/${tag}`">
              {{ tag }}
            </nuxt-link>
          </li>
        </ul>
      </div>
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
  </main>
</template>

<script>

export default {
  amp: 'only',
  // head () {
  //   return {
  //     title: this.page.title
  //   }
  // },
  async asyncData({ $content, params, error }) {
    const pathMatch = params.pathMatch || "index"
    // パスを分解する
    const paths = pathMatch.split('/')
    const currentPath = paths[paths.length - 1]
    // ページの種別を取得する
    const category = paths.length > 0 ? paths[0] : 'index'
    // 親のパスリストを作る（パンくずと次へと前へのページ、関連タグのため）
    const parentPathList = paths.map((name, idx, array) => ({ path: array.slice(0, idx + 1).join('/'), name }))
    // 次や前のページ情報を取得するためのパスを取得する
    const nextAndPrevPagePath = parentPathList.length > 1 ? parentPathList[parentPathList.length - 2].path : '/'
    // 一覧で表示するか判定する
    let isPageListView, isTagListView = false
    // ページ種別毎にページの取得処理を変える
    let page, tags, tagName = null
    switch (category){
      case 'tags':
        // 常に一覧表示にする
        isPageListView = true
        // タグ一覧表示にするか？
        isTagListView = paths.length < 2
        if (isTagListView) {
          // ページ一覧から全タグの一覧を作成する
          const tagOnlyPages = await $content('/', { deep: true })
            .only(['tags'])
            .fetch()
            .catch(err => {
              error({ statusCode: 404, message: "Page not found" })
            })
          tags = tagOnlyPages.flatMap(
            tagOnlyPage => tagOnlyPage.tags ? tagOnlyPage.tags : []
          )
          // console.log('tags', tags, tagOnlyPages)
        } else {
          // タグに紐づくページ一覧を取得する
          tagName = paths[1]
          page = await $content('/', { deep: true })
            .where({ 'tags': { $contains: tagName } })
            .sortBy('sortNo', 'desc')
            .fetch()
            .catch(err => {
              error({ statusCode: 404, message: "Page not found" })
            })
        }
        break
      case 'posts':
        // 一覧で表示するか判定する
        isPageListView = paths.length < 2
        // ページを取得する
        page = await $content(pathMatch)
          .fetch()
          .catch(err => {
            error({ statusCode: 404, message: "Page not found" })
          })
        // 親ページ一覧から関連タグの一覧を作成する
        const tagOnlyParentPages = await $content(nextAndPrevPagePath, { deep: true })
          .only(['tags'])
          .fetch()
          .catch(err => {
            error({ statusCode: 404, message: "Page not found" })
          })
        tags = tagOnlyParentPages.flatMap(
          tagOnlyPage => tagOnlyPage.tags ? tagOnlyPage.tags : []
        )
        break
      default:
        // 常に投稿で表示する
        isPageListView = false
        // ページを取得する
        page = await $content(pathMatch)
          .fetch()
          .catch(err => {
            error({ statusCode: 404, message: "Page not found" })
          })
        break
    }
    // 一覧表示ではないとき
    if (isPageListView === false) {
      // 次や前のページ情報を取得する
      const [prev, next] = await $content(nextAndPrevPagePath, { deep: false })
        // .only(['title', 'slug'])
        .sortBy('createdAt', 'asc')
        .surround(currentPath)
        .fetch()
      // データを返す
      return {
        category,
        tags,
        isPageListView,
        isTagListView,
        page,
        parentPathList,
        prev,
        next
      }
    } else {
      // データを返す
      return {
        category,
        tagName,
        tags,
        isPageListView,
        isTagListView,
        pages: page,
        parentPathList
      }
    }
  },
  data() {
    return {
      category: '',
      tagName: '',
      tags: [],
      isPageListView: false,
      isTagListView: false,
      page: {},
      pages: [],
      parentPathList: [],
      prev: {},
      next: {},
    }
  },
  head() {
    return {
      title: this.page.title ? this.page.title : `${this.tagName} タグの付いた記事一覧` || `${this.category} カテゴリの記事一覧`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page.description ? this.page.description : `${this.tagName} タグの付いた記事一覧` || `${this.category} カテゴリの記事一覧`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.page.title ? this.page.title : `${this.tagName} タグの付いた記事一覧` || `${this.category} カテゴリの記事一覧`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.page.description ? this.page.description : `${this.tagName} タグの付いた記事一覧` || `${this.category} カテゴリの記事一覧`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.page.eyecatchImage ? this.page.eyecatchImage[0] : '/images/top1.jpg'
        },
      ]
    }
  },
  methods: {}
};
</script>
