<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <ScaffoldingEdit title="Scaffolding" :scaffolding="scaffolding" />
  </div>
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
