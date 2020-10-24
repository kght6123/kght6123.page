<template>
  <div v-if="Object.keys(toc).length > 1" class="p-4 my-4 rounded-lg bg-gray-700">
    <ul class="text-sm">
      <li
        v-for="link of toc"
        :key="link.id"
        :class="{ 'toc2': link.depth === 2, 'toc3': link.depth === 3 }"
        class="p-2"
      >
        <NuxtLink :to="`#${link.id}`" class="block">{{ link.text }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    toc: {
      type: Array,
      required: true
    }
  }
}
</script>