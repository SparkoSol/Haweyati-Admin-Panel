<template>
  <DumpsterDetail :construction-dumpster="constructionDumpster" />
</template>

<script>
import DumpsterDetail from '../../../../components/products/construction-dumpster/detail'
export default {
  components: { DumpsterDetail },
  async asyncData({ $axios, route }) {
    return {
      constructionDumpster: await $axios.$get('dumpsters/' + route.params.id)
    }
  }
}
</script>

<style scoped></style>
