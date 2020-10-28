<template>
  <div>
    No to AMP
  </div>
</template>

<script>
export default {
  amp: false,
  mounted() {
    // No AMPでScriptが動くかテスト
    console.log(`no amp mounted!!!`)
  }
}
</script>
