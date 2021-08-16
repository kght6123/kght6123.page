<template>
  <div>
    <amp-carousel
      lightbox
      loop
      width="1600"
      height="900"
      layout="responsive"
      type="slides"
      class="m-0"
    >
      <a
        href="https://booth.pm/ja/items/3039023"
        target="_blank"
        rel="noopener noreferrer"
      >
        <amp-img
          src="/images/Tailwind.cssの薄い本（告知用）.png"
          layout="responsive"
          width="960"
          height="600"
        ></amp-img>
      </a>
    </amp-carousel>

    <ul v-if="tags" class="px-2 pt-2 mt-1">
      <li v-for="tag in tags" :key="tag" class="inline-block pr-1 text-xs">
        <nuxt-link
          class="block px-3 py-1 mb-1 bg-gray-700 rounded-lg"
          :to="`/tags/${tag}`"
        >
          {{ tag }}
        </nuxt-link>
      </li>
    </ul>

    <nav
      class="grid grid-cols-2 gap-2 p-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4"
    >
      <nuxt-link
        v-for="file in newPosts"
        :key="file.slug"
        class="relative block pb-6 text-gray-800 bg-gray-100 shadow-sm"
        :to="`${file.path}`"
      >
        <amp-img
          v-if="file.thumbnailImage"
          :src="file.thumbnailImage[0]"
          layout="responsive"
          :width="file.thumbnailImage[1]"
          :height="file.thumbnailImage[2]"
          class="block rounded-t-sm"
        ></amp-img>
        <article class="block p-2 rounded-b-sm">
          <h2 class="block text-base font-medium">{{ file.title }}</h2>
          <p class="block text-xs">{{ file.description }}</p>
          <amp-timeago
            class="absolute bottom-0 right-0 pb-1 pr-2 text-xxs"
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
    const newPosts = await this.$nuxt.context
      .$content('/', { deep: true })
      .where({ disabled: { $ne: true } })
      .sortBy('sortNo', 'desc')
      .fetch()

    this.newPosts = newPosts
    const tagOnlyPages = await this.$nuxt.context
      .$content('/', { deep: true })
      .where({ disabled: { $ne: true } })
      .only(['tags'])
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Page not found' })
      })

    this.tags = tagOnlyPages
      .reduce((results, tagOnlyPage) => {
        const tags = tagOnlyPage.tags ? tagOnlyPage.tags : []
        tags.forEach((tag) => {
          const element = results.find((result) => result.tag === tag)
          if (element) {
            element.counts++
          } else {
            results.push({
              tag,
              counts: 1,
            })
          }
        })
        return results
      }, [])
      .sort((prev, current) => (prev.counts < current.counts ? 1 : -1))
      .slice(0, 10)
      .map((value) => value.tag)
  },
  amp: 'only',
  head() {
    return {}
  },
  data() {
    return {
      newPosts: [],
      tags: [],
    }
  },
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
