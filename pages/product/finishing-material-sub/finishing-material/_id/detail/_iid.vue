<template>
  <FinishingMaterialDetail :finishing-material="finishingMaterial" />
</template>

<script>
import FinishingMaterialDetail from '../../../../../../components/products/finishing-material/detail'
export default {
  components: { FinishingMaterialDetail },
  async asyncData({ $axios, route }) {
    window.console.log(
      await $axios.$get('finishing-materials/' + route.params.id)
    )
    return {
      finishingMaterial: await $axios.$get(
        'finishing-materials/' + route.params.iid
      )
    }
  }
}
</script>

<style scoped></style>
