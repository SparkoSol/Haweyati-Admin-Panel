<template>
  <BuildingMaterialForm
    title="Add Building Material"
    :endpoint="'building-materials'"
  />
</template>

<script>
import BuildingMaterialForm from '../../../../../components/products/building-material/form'
export default {
  name: 'Add',
  components: { BuildingMaterialForm }
}
</script>

<style scoped></style>
