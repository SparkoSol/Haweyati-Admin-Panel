<template>
  <BuildingMaterialSub
    title="Building Material Type"
    endpoint="/building-material-category"
    create
    :create-route="'/product/building-material-sub/sub-add'"
    change
    :change-route="'/product/building-material-sub/edit-sub/$id'"
    remove
    :remove-route="'/building-materials/deletecategory/$id'"
    detail
    :detail-route="'/product/building-material-sub/sub-detail/$id'"
    :products-route="'/product/building-material-sub/building-material/$id'"
  />
</template>

<script>
import BuildingMaterialSub from '../../../components/products/building-material/sub'
export default {
  components: { BuildingMaterialSub }
}
</script>

<style scoped></style>
