<template>
  <amp-timeago
    class="text-xxs"
    :layout="layout"
    :width="width"
    :height="height"
    :datetime="datetime"
    locale="ja"
  >
    {{ datetime }}
  </amp-timeago>
</template>


<script>
export default {
  props: {
    datetime: {
      type: String,
      required: true
    },
    layout: {
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
    },
  }
}
</script>