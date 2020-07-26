<template>
  <BuildingMaterialForm
    :building-material="buildingMaterial"
    :pricing="buildingMaterial.pricing"
    :suppliers="buildingMaterial.suppliers"
    :is-update="true"
    title="Update Building Material"
    endpoint="building-materials"
  />
</template>

<script>
import BuildingMaterialForm from '../../../../../../components/products/building-material/form'
export default {
  components: {
    BuildingMaterialForm
  },
  async asyncData({ $axios, route }) {
    return {
      buildingMaterial: await $axios.$get(
        'building-materials/' + route.params.iid
      )
    }
  }
}
</script>
