<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <DumpsterForm
      :construction-dumpster="constructionDumpster"
      :pricing="constructionDumpster.pricing"
      :suppliers="constructionDumpster.suppliers"
      :is-update="true"
      title="Update Construction Dumpster"
      endpoint="dumpsters"
    />
  </div>
</template>

<script>
import DumpsterForm from '../../../../components/products/construction-dumpster/form'
export default {
  components: {
    DumpsterForm
  },
  async asyncData({ $axios, route }) {
    return {
      constructionDumpster: await $axios.$get('dumpsters/' + route.params.id)
    }
  }
}
</script>
