<template>
  <main>
    <article class="p-8" v-if="isPageListView === true">
      <!-- 記事リストのとき -->
      <!-- NOTE:下記のタイトル作成処理をmethodsに書いて呼び出すと、関数は値を返しているのに、表示は空になる（原因不明） -->
      <atoms-atom-header1>{{
        tagName
          ? `${tagName} タグの付いた記事一覧`
          : category === `tags`
          ? `すべてのタグ一覧`
          : category === `dirs`
          ? `${pathMatch.replace('dirs', 'posts')} の記事一覧`
          : `${category} カテゴリの記事一覧`
      }}</atoms-atom-header1>
      <ul v-if="tags" class="mt-1">
        <atoms-atom-item-tag
          v-for="tag in tags"
          :key="tag"
          :name="tag"
          :label="tag"
        />
      </ul>
      <ol v-if="pages" class="p-4 my-4 bg-gray-700 rounded-lg">
        <molecules-molecule-item-page
          v-for="page in pages"
          :key="page.slug"
          :item="page"
        />
      </ol>
    </article>
    <article class="p-8" v-if="isPageListView === false">
      <!-- 記事のとき -->
      <atoms-atom-eyecatch-image
        v-if="page.eyecatchImage"
        :src="page.eyecatchImage[0]"
        :width="page.eyecatchImage[1]"
        :height="page.eyecatchImage[2]"
      />
      <atoms-atom-header1 class="post-title">{{
        page.title
      }}</atoms-atom-header1>
      <atoms-atom-amp-timeago
        :datetime="page.updatedAt"
        layout="responsive"
        :width="160"
        :height="20"
        class="pb-1 pr-2 text-right"
      />
      <molecules-molecule-breadcrumb :path-list="parentPathList" />
      <p v-if="page.description" class="py-4">{{ page.description }}</p>
      <ul v-if="page.tags" class="mt-1">
        <atoms-atom-item-tag
          v-for="tag in page.tags"
          :key="tag"
          :name="tag"
          :label="tag"
        />
      </ul>
      <molecules-molecule-mokuji :toc="page.toc" />
      <nuxt-content :document="page" />
      <div v-if="tags" class="mt-8">
        <h5 class="text-xs">関連タグ</h5>
        <ul class="mt-1">
          <atoms-atom-item-tag
            v-for="tag in tags"
            :key="tag"
            :name="tag"
            :label="tag"
          />
        </ul>
      </div>
      <molecules-molecule-page-control :next="next" :prev="prev" />
    </article>
  </main>
</template>

<script>
export default {
  amp: 'only',
  async asyncData({ $content, params, error }) {
    const pathMatch = params.pathMatch || 'index'
    const paths = pathMatch.split('/')
    const currentPath = paths[paths.length - 1]
    const category = paths.length > 0 ? paths[0] : 'index'
    const parentPathList = paths.map((name, idx, array) => ({
      path: array.slice(0, idx + 1).join('/'),
      name,
    }))
    const nextAndPrevPagePath =
      parentPathList.length > 1
        ? parentPathList[parentPathList.length - 2].path
        : '/'
    let isPageListView,
      isTagListView = false
    let page,
      tags,
      tagName = null
    switch (category) {
      case 'tags':
        isPageListView = true
        isTagListView = paths.length < 2
        if (isTagListView) {
          const tagOnlyPages = await $content('/', { deep: true })
            .where({ disabled: { $ne: true } })
            .only(['tags'])
            .fetch()
            .catch((err) => {
              error({ statusCode: 404, message: 'Page not found' })
            })
          tags = new Set(
            tagOnlyPages.flatMap((tagOnlyPage) =>
              tagOnlyPage.tags ? tagOnlyPage.tags : []
            )
          ).values()
          tags = Array.from(tags).sort()
        } else {
          tagName = paths[1]
          page = await $content('/', { deep: true })
            .where({ tags: { $contains: tagName } })
            .where({ disabled: { $ne: true } })
            .sortBy('sortNo', 'desc')
            .fetch()
            .catch((err) => {
              error({ statusCode: 404, message: 'Page not found' })
            })
        }
        break
      case 'posts':
        page = await $content(pathMatch)
          .where({ disabled: { $ne: true } })
          .fetch()
          .catch((err) => {
            error({ statusCode: 404, message: 'Page not found' })
          })
        if (page.length !== undefined) {
          error({ statusCode: 404, message: 'Page not found' })
          return
        }
        isPageListView = false
        const tagOnlyParentPages = await $content(nextAndPrevPagePath, {
          deep: true,
        })
          .where({ disabled: { $ne: true } })
          .only(['tags'])
          .fetch()
          .catch((err) => {
            error({ statusCode: 404, message: 'Page not found' })
          })
        tags = new Set(
          tagOnlyParentPages.flatMap((tagOnlyPage) =>
            tagOnlyPage.tags ? tagOnlyPage.tags : []
          )
        ).values()
        tags = Array.from(tags).sort()
        break
      case 'dirs':
        page = await $content(pathMatch.replace('dirs', 'posts'), {
          deep: true,
        })
          .where({ disabled: { $ne: true } })
          .fetch()
          .catch((err) => {
            error({ statusCode: 404, message: 'Page not found' })
          })
        isPageListView = true
        break
      default:
        isPageListView = false
        page = await $content(pathMatch)
          .where({ disabled: { $ne: true } })
          .fetch()
          .catch((err) => {
            error({ statusCode: 404, message: 'Page not found' })
          })
        break
    }
    if (isPageListView === false) {
      const [prev, next] = await $content(nextAndPrevPagePath, { deep: false })
        .where({ disabled: { $ne: true } })
        .sortBy('createdAt', 'asc')
        .surround(currentPath)
        .fetch()
      return {
        category,
        tags,
        isPageListView,
        isTagListView,
        page,
        parentPathList,
        prev,
        next,
      }
    } else {
      return {
        category,
        tagName,
        tags,
        isPageListView,
        isTagListView,
        pages: page,
        parentPathList,
        pathMatch,
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
      title:
        this.page && this.page.title
          ? this.page.title
          : this.tagName
          ? `${this.tagName} タグの付いた記事一覧`
          : this.category === `tags`
          ? `すべてのタグ一覧`
          : this.category === `dirs`
          ? `${this.pathMatch.replace('dirs', 'posts')} の記事一覧`
          : `${this.category} カテゴリの記事一覧`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page.description
            ? this.page.description
            : this.tagName
            ? `${this.tagName} タグの付いた記事一覧`
            : `${this.category} カテゴリの記事一覧`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            this.page && this.page.title
              ? this.page.title
              : this.tagName
              ? `${this.tagName} タグの付いた記事一覧`
              : this.category === `tags`
              ? `すべてのタグ一覧`
              : this.category === `dirs`
              ? `${this.pathMatch.replace('dirs', 'posts')} の記事一覧`
              : `${this.category} カテゴリの記事一覧`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.page.description
            ? this.page.description
            : this.tagName
            ? `${this.tagName} タグの付いた記事一覧`
            : `${this.category} カテゴリの記事一覧`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.page.eyecatchImage
            ? this.page.eyecatchImage[0]
            : '/images/top1.jpg',
        },
      ],
    }
  },
  methods: {},
}
</script>
