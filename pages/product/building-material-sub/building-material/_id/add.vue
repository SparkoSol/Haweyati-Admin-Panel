<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <BuildingMaterialForm
      title="Add Building Material"
      :endpoint="'building-materials'"
    />
  </div>
</template>

<script>
import BuildingMaterialForm from '../../../../../components/products/building-material/form'
export default {
  name: 'Add',
  components: { BuildingMaterialForm }
}
</script>

<style scoped></style>
