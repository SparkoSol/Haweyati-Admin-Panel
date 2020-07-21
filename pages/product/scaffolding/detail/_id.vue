<template>
  <ScaffoldingSubMain
    title="Patented Scaffolding"
    :scaffolding="scaffolding"
    :change-route="'/product/scaffolding/edit/$id'"
  />
</template>

<script>
import ScaffoldingSubMain from '../../../../components/products/scaffolding/detail'
export default {
  components: { ScaffoldingSubMain },
  async asyncData({ $axios, route }) {
    return {
      scaffolding: await $axios.$get('scaffoldings/' + route.params.id)
    }
  }
}
</script>

<style scoped></style>
