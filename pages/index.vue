<template>
  <div>
    <amp-carousel
      lightbox
      width="1600"
      height="900"
      layout="responsive"
      type="slides"
      class="m-0"
    >
      <amp-img src="/images/top1.jpg" layout="fixed-height" height="600"></amp-img>
      <amp-img src="/images/top2.jpg" layout="fixed-height" height="600"></amp-img>
      <amp-img src="/images/top3.jpg" layout="fixed-height" height="600"></amp-img>
    </amp-carousel>

    <ul v-if="tags" class="pt-2 px-2 mt-1">
      <li v-for="tag in tags" :key="tag" class="inline-block text-xs pr-1">
        <nuxt-link class="block rounded-lg bg-gray-700 py-1 px-3 mb-1" :to="`/tags/${tag}`">
          {{ tag }}
        </nuxt-link>
      </li>
    </ul>

    <nav class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-2 p-2">
      <nuxt-link v-for="file in newPosts" :key="file.slug" class="block shadow-sm bg-gray-100 text-gray-800 relative pb-6" :to="`${file.path}`">
        <amp-img v-if="file.thumbnailImage" :src="file.thumbnailImage[0]" layout="responsive" :width="file.thumbnailImage[1]" :height="file.thumbnailImage[2]" class="block rounded-t-sm"></amp-img>
        <article class="block rounded-b-sm p-2">
          <h2 class="block font-medium text-base">{{ file.title }}</h2>
          <p class="block text-xs">{{ file.description }}</p>
          <amp-timeago
            class="text-xxs absolute right-0 bottom-0 pr-2 pb-1"
            layout="responsive"
            width="160"
            height="20"
            :datetime="file.updatedAt"
            locale="ja"
          >
            {{ file.updatedAt }}
          </amp-timeago>
        </article>
      </nuxt-link>
    </nav>
  </div>
</template>

<script>
export default {
  async fetch() {
    // ページ一覧を取得する
    const newPosts = await this.$nuxt.context.$content('/', { deep: true })/*.limit(20)*/.sortBy('sortNo', 'desc').fetch()
    // console.log('fetch newPosts', newPosts[0], this.$fetchState)
    this.newPosts = newPosts
    // ページ一覧から全タグの一覧を作成する
    const tagOnlyPages = await this.$nuxt.context.$content('/', { deep: true })
      .only(['tags'])
      .fetch()
      .catch(err => {
        error({ statusCode: 404, message: "Page not found" })
      })
    
    // 全てのタグリストを取得する（今は使っていない）
    // const tags = new Set(tagOnlyPages.flatMap(
    //   tagOnlyPage => tagOnlyPage.tags ? tagOnlyPage.tags : []
    // )).values()
    // this.tags = Array.from(tags).sort()
    // console.log(this.tags)

    // タグごとに記事の件数を集計する
    this.tags = tagOnlyPages.reduce((results, tagOnlyPage) => {
      const tags = tagOnlyPage.tags ? tagOnlyPage.tags : []
      tags.forEach(tag => {
        // tagがresultsにあるか
        const element = results.find(result => result.tag === tag)
        if (element) {
            // ある時（下記、初期データを操作）
            element.counts++
        } else {
            // 無いとき（新規に初期データを作成）
            results.push({
                tag,
                counts: 1,
            })
        }
      })
      return results
    // 記事件数が多い順に並び替えする
    }, []).sort(
      (prev, current) => prev.counts < current.counts ? 1 : -1
    // 記事件数が多い上位の10件に絞り込み、タグ名だけのリストにする
    ).slice(0, 10).map((value) => value.tag)
    // console.log(this.tags)
  },
  amp: 'only',
  head () {
    return {
      // title: 'kght6123.page'
    }
  },
  data() {
    return {
      newPosts: [],
      tags: []
    }
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
/*
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}*/
/*
body > * {
  margin: 0.5rem 0 0.5rem 0.5rem;
}
*/
/* amp-carousel {
  margin: 0;
} */
/* input[type=number] {
  width: 2rem;
}
.red {
  color: red;
} */
</style>