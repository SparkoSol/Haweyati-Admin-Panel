<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <ScaffoldingDetail
      title="Patented Scaffolding"
      :scaffolding="scaffolding"
      :change-route="'/product/scaffolding/edit/$id'"
    />
  </div>
</template>

<script>
import ScaffoldingDetail from '../../../../components/products/scaffolding/detail'
export default {
  components: { ScaffoldingDetail },
  async asyncData({ $axios, route }) {
    return {
      scaffolding: await $axios.$get('scaffoldings/' + route.params.id)
    }
  }
}
</script>

<style scoped></style>
