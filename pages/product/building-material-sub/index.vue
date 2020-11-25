<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <BuildingMaterialSub
      title="Building Material Type"
      endpoint="/building-material-category"
      create
      :create-route="'/product/building-material-sub/sub-add'"
      change
      :change-route="'/product/building-material-sub/edit-sub/$id'"
      remove
      :remove-route="'/building-materials/delete-category/$id'"
      detail
      :detail-route="'/product/building-material-sub/sub-detail/$id'"
      :products-route="
        '/product/building-material-sub/building-material-sub-sub/$id'
      "
    />
  </div>
</template>

<script>
import BuildingMaterialSub from '../../../components/products/building-material/sub'
export default {
  components: { BuildingMaterialSub }
}
</script>

<style scoped></style>
