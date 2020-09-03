<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <BuildingMaterialDetail :building-material="buildingMaterial" />
  </div>
</template>

<script>
import BuildingMaterialDetail from '../../../../../../components/products/building-material/detail'
export default {
  components: { BuildingMaterialDetail },
  async asyncData({ $axios, route }) {
    return {
      buildingMaterial: await $axios.$get(
        'building-materials/' + route.params.iid
      )
    }
  }
}
</script>

<style scoped></style>
