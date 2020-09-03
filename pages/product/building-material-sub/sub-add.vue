<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <BuildingMaterialSubAdd
      title="Add Building Material Type"
      endpoint="building-material-category"
    />
  </div>
</template>

<script>
import BuildingMaterialSubAdd from '../../../components/products/building-material/sub-add'
export default {
  components: { BuildingMaterialSubAdd }
}
</script>

<style scoped></style>
