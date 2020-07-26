<template>
  <BuildingMaterialSubAdd
    :building-material-sub="buildingMaterialSub"
    :is-update="true"
    title="Update Building Material Type"
    endpoint="building-material-category"
  />
</template>

<script>
import BuildingMaterialSubAdd from '../../../../components/products/building-material/sub-add'
export default {
  components: { BuildingMaterialSubAdd },
  async asyncData({ $axios, route }) {
    return {
      buildingMaterialSub: await $axios.$get(
        'building-material-category/' + route.params.id
      )
    }
  }
}
</script>
