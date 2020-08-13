<template>
  <div>
    <amp-carousel
      lightbox
      width="800"
      height="600"
      layout="responsive"
      type="slides"
      class="m-0"
    >
      <amp-img src="https://www.pakutaso.com/shared/img/thumb/bobjinno7050165_TP_V4.jpg" layout="responsive" width="800" height="600"></amp-img>
      <amp-img src="https://www.pakutaso.com/shared/img/thumb/BOBSC2054_5_TP_V4.jpg" layout="responsive" width="800" height="600"></amp-img>
      <amp-img src="https://www.pakutaso.com/shared/img/thumb/BOB20614B002_TP_V4.jpg" layout="responsive" width="800" height="600"></amp-img>
    </amp-carousel>

    <nav class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 p-2">
      <nuxt-link v-for="file in newPosts" :key="file.slug" class="block shadow-sm bg-gray-100 text-gray-800 relative" :to="`${file.path}`">
        <amp-img :src="file.thumbnailImageUrl" layout="responsive" width="799"
      height="534" class="block rounded-t-sm"></amp-img>
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
    const newPosts = await this.$nuxt.context.$content('/', { deep: true }).limit(10).sortBy('updatedAt', 'desc').fetch()
    // console.log('fetch newPosts', newPosts[0], this.$fetchState)
    this.newPosts = newPosts
  },
  amp: 'only',
  head () {
    return {
      title: 'kght6123.page'
    }
  },
  data() {
    return {
      newPosts: []
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