<template>
  <ul itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" class="inline-block text-xs">
      <nuxt-link to="/" itemprop="item">
        <font-awesome-icon :icon="['fa', 'home']" />
        <span itemprop="name">ホーム</span>
      </nuxt-link>
      <meta itemprop="position" content="1" />
    </li>
    <li v-for="(parentPath, index) in pathList" :key="parentPath.path" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" class="inline-block text-xs pr-1">
      <font-awesome-icon :icon="['fa', 'angle-right']" />
      <nuxt-link v-if="index < pathList.length - 1" :to="`/${parentPath.path}`.replace('posts', 'dirs')" itemprop="item">
        <span itemprop="name">{{ parentPath.name }}</span>
      </nuxt-link>
      <nuxt-link v-if="index >= pathList.length - 1" :to="`/${parentPath.path}`" itemprop="item">
        <span itemprop="name">{{ parentPath.name }}</span>
      </nuxt-link>
      <meta itemprop="position" :content="index + 2" />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    pathList: {
      type: Array,
      required: true
    },
  }
}
</script>
