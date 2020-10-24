<template>
  <div class="overflow-hidden h-32 flex-row-center mb-4">
    <amp-img :src="src" layout="intrinsic" :width="width" :height="height" class="block"></amp-img>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  }
}
</script>