<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <DumpsterDetail :construction-dumpster="constructionDumpster" />
  </div>
</template>

<script>
import DumpsterDetail from '../../../../components/products/construction-dumpster/detail'
export default {
  components: { DumpsterDetail },
  async asyncData({ $axios, route }) {
    return {
      constructionDumpster: await $axios.$get(
        'dumpsters/' + route.params.id + '?withSuppliers=true'
      )
    }
  }
}
</script>

<style scoped></style>
