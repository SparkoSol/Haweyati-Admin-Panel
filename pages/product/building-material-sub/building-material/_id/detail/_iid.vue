<template>
  <BuildingMaterialDetail :building-material="buildingMaterial" />
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
