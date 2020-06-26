<template>
  <building-material-main
    :endpoint="'building-materials/getbyparent/' + this.$route.params.id"
    :route="
      'product/building-material-sub/building-material/' + this.$route.params.id
    "
    title="Building Materials"
  />
</template>

<script>
import BuildingMaterialMain from '../../../../../components/products/building-material/building-material'
export default {
  name: 'Index',
  components: { BuildingMaterialMain }
}
</script>

<style scoped></style>
