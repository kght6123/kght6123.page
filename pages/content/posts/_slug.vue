<template>
  <div>
    <amp-body>
      <div class="p-3">
        <h1>{{ page.title }}</h1>
        <p>{{ page.description }}</p>
        <nuxt-content :document="page"/>
      </div>
    </amp-body>
  </div>
</template>

<script>
export default {
  amp: 'only',
  async asyncData({ $content, params, error }) {
    const slug = params.slug || "index";
    console.log('slug', slug)
    const page = await $content(`posts/${slug}`)
      .fetch()
      .catch(err => {
        error({ statusCode: 404, message: "Page not found" });
      });

    return {
      page
    };
  }
};
</script>
