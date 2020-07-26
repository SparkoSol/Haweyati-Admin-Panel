<template>
  <FinishingMaterialDetail :finishing-material="finishingMaterial" />
</template>

<script>
import FinishingMaterialDetail from '../../../../../../components/products/finishing-material/detail'
export default {
  components: { FinishingMaterialDetail },
  async asyncData({ $axios, route }) {
    return {
      finishingMaterial: await $axios.$get(
        'finishing-materials/' + route.params.iid
      )
    }
  }
}
</script>

<style scoped></style>
