<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <FinishingMaterialDetail :finishing-material="finishingMaterial" />
  </div>
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
