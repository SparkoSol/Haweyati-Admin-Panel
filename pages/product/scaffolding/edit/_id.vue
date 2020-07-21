<template>
  <ScaffoldingEdit title="Scaffolding" :scaffolding="scaffolding" />
</template>

<script>
import ScaffoldingEdit from '../../../../components/products/scaffolding/edit'
export default {
  components: { ScaffoldingEdit },
  async asyncData({ $axios, route }) {
    return {
      scaffolding: await $axios.$get('scaffoldings/' + route.params.id)
    }
  }
}
</script>

<style scoped></style>
