<template>
  <main>
    <article class="p-8" v-if="isPageListView === true">
      <!-- 記事リストのとき -->
      <!-- NOTE:下記のタイトル作成処理をmethodsに書いて呼び出すと、関数は値を返しているのに、表示は空になる（原因不明） -->
      <atom-header-1>{{ tagName ? `${tagName} タグの付いた記事一覧`
         : category === `tags` ? `すべてのタグ一覧`
         : category === `dirs` ? `${pathMatch.replace('dirs', 'posts')} の記事一覧`
         : `${category} カテゴリの記事一覧` }}</atom-header-1>
      <ul v-if="tags" class="mt-1">
        <atom-item-tag v-for="tag in tags" :key="tag" :name="tag" :label="tag" />
      </ul>
      <ol v-if="pages" class="p-4 my-4 rounded-lg bg-gray-700">
        <molecule-item-page v-for="page in pages" :key="page.slug" :item="page" />
      </ol>
    </article>
    <article class="p-8" v-if="isPageListView === false">
      <!-- 記事のとき -->
      <atom-eyecatch-image
        v-if="page.eyecatchImage"
        :src="page.eyecatchImage[0]"
        :width="page.eyecatchImage[1]"
        :height="page.eyecatchImage[2]" />
      <atom-header-1 class="post-title">{{ page.title }}</atom-header-1>
      <atom-amp-timeago
        :datetime="page.updatedAt" 
        layout="responsive"
        :width="160"
        :height="20"
        class="text-right pr-2 pb-1" />
      <molecule-breadcrumb :path-list="parentPathList" />
      <p v-if="page.description" class="py-4">{{ page.description }}</p>
      <ul v-if="page.tags" class="mt-1">
        <atom-item-tag v-for="tag in page.tags" :key="tag" :name="tag" :label="tag" />
      </ul>
      <molecule-mokuji :toc="page.toc" />
      <nuxt-content :document="page"/>
      <div v-if="tags" class="mt-8">
        <h5 class="text-xs">関連タグ</h5>
        <ul class="mt-1">
          <atom-item-tag v-for="tag in tags" :key="tag" :name="tag" :label="tag" />
        </ul>
      </div>
      <molecule-page-control :next="next" :prev="prev" />
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
            .where({ disabled: { $ne: true } })
            .only(['tags'])
            .fetch()
            .catch(err => {
              error({ statusCode: 404, message: "Page not found" })
            })
          // タグの一覧を一意にする
          tags = new Set(tagOnlyPages.flatMap(
            tagOnlyPage => tagOnlyPage.tags ? tagOnlyPage.tags : []
          )).values()
          tags = Array.from(tags).sort()
          // console.log('tags', tags, tagOnlyPages)
        } else {
          // タグに紐づくページ一覧を取得する
          tagName = paths[1]
          page = await $content('/', { deep: true })
            .where({ 'tags': { $contains: tagName } })
            .where({ disabled: { $ne: true } })
            .sortBy('sortNo', 'desc')
            .fetch()
            .catch(err => {
              error({ statusCode: 404, message: "Page not found" })
            })
        }
        break
      case 'posts':
        // ページを取得する
        page = await $content(pathMatch)
          .where({ disabled: { $ne: true } })
          .fetch()
          .catch(err => {
            error({ statusCode: 404, message: "Page not found" })
          })
        if (page.length !== undefined) {
          error({ statusCode: 404, message: "Page not found" })
          return
        }
        // 常にページで表示する
        isPageListView = false
        // 親ページ一覧から関連タグの一覧を作成する
        const tagOnlyParentPages = await $content(nextAndPrevPagePath, { deep: true })
          .where({ disabled: { $ne: true } })
          .only(['tags'])
          .fetch()
          .catch(err => {
            error({ statusCode: 404, message: "Page not found" })
          })
        // 関連タグの一覧を一意にする
        tags = new Set(tagOnlyParentPages.flatMap(
          tagOnlyPage => tagOnlyPage.tags ? tagOnlyPage.tags : []
        )).values()
        tags = Array.from(tags).sort()
        break
      case 'dirs':
        // ディレクトリ内のページ一覧を取得する
        page = await $content(pathMatch.replace('dirs', 'posts'), { deep: true })
          .where({ disabled: { $ne: true } })
          .fetch()
          .catch(err => {
            error({ statusCode: 404, message: "Page not found" })
          })
        // 常に一覧で表示する
        isPageListView = true
        break
      default:
        // 常に投稿で表示する
        isPageListView = false
        // ページを取得する
        page = await $content(pathMatch)
          .where({ disabled: { $ne: true } })
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
        .where({ disabled: { $ne: true } })
        .sortBy('createdAt', 'asc')
        .surround(currentPath)
        .fetch()
      // データを返す
      return {
        category,
        tags, // 関連タグのリスト
        isPageListView,
        isTagListView,
        page,
        parentPathList, // パンくずリスト用のURLリスト
        prev,
        next
      }
    } else {
      // データを返す
      return {
        category,
        tagName,
        tags, // 関連タグのリスト
        isPageListView,
        isTagListView,
        pages: page,
        parentPathList, // パンくずリスト用のURLリスト
        pathMatch // dirsのときのタイトル名に使う
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
      // NOTE:下記のタイトル作成処理をmethodsに書いて呼び出すと、関数は値を返しているのに、表示は空になる（原因不明）
      title: this.page && this.page.title ? this.page.title
        : this.tagName ? `${this.tagName} タグの付いた記事一覧`
        : this.category === `tags` ? `すべてのタグ一覧`
        : this.category === `dirs` ? `${this.pathMatch.replace('dirs', 'posts')} の記事一覧`
        : `${this.category} カテゴリの記事一覧`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page.description ? this.page.description : this.tagName ? `${this.tagName} タグの付いた記事一覧` : `${this.category} カテゴリの記事一覧`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.page && this.page.title ? this.page.title
            : this.tagName ? `${this.tagName} タグの付いた記事一覧`
            : this.category === `tags` ? `すべてのタグ一覧`
            : this.category === `dirs` ? `${this.pathMatch.replace('dirs', 'posts')} の記事一覧`
            : `${this.category} カテゴリの記事一覧`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.page.description ? this.page.description : this.tagName ? `${this.tagName} タグの付いた記事一覧` : `${this.category} カテゴリの記事一覧`
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
