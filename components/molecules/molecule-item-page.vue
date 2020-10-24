<template>
  <li>
    <nuxt-link class="block pb-2" :to="`${item.path}`">
      {{ item.title }}
      <atom-amp-timeago
        :datetime="item.updatedAt"
        layout="fixed"
        :width="56"
        :height="16"
        class="align-text-bottom ml-3" />
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
  }
}
</script>