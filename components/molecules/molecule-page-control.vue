<template>
  <div class="text-xs grid justify-between grid-cols-3 mt-8">
    <NuxtLink v-if="prev" :to="`${prev.path}`" class="block">
      前の記事へ<br />（{{ prev.title }}）
    </NuxtLink>
    <span v-if="!prev"></span>
    <NuxtLink to="/" class="block text-center text-lg">
      <font-awesome-icon :icon="['fa', 'home']" />
    </NuxtLink>
    <NuxtLink v-if="next" :to="`${next.path}`" class="block text-right">
      次の記事へ<br />（{{ next.title }}）
    </NuxtLink>
    <span v-if="!next"></span>
  </div>
</template>

<script>
export default {
  props: {
    next: {
      type: Object,
      required: false
    },
    prev: {
      type: Object,
      required: false
    },
  }
}
</script>