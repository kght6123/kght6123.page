<template>
  <li>
    <nuxt-link class="block pb-2" :to="`${item.path}`">
      {{ item.title }}
      <atoms-atom-amp-timeago
        :datetime="item.updatedAt"
        layout="fixed"
        :width="56"
        :height="16"
        class="ml-3 align-text-bottom"
      />
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
