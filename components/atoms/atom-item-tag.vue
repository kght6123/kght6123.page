<template>
  <li class="inline-block text-xs pr-1 mb-1">
    <nuxt-link class="block rounded-lg bg-gray-700 py-1 px-3" :to="`/tags/${name}`">
      {{ label }}
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
  }
}
</script>