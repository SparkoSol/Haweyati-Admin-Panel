<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <BuildingMaterialForm
      :building-material="buildingMaterial"
      :pricing="buildingMaterial.pricing"
      :suppliers="buildingMaterial.suppliers"
      :is-update="true"
      title="Update Building Material"
      endpoint="building-materials"
    />
  </div>
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
