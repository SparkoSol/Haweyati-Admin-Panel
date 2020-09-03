<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <FinishingMaterialSub
      title="Finishing Material Type"
      endpoint="/finishing-material-category"
      create
      :create-route="'/product/finishing-material-sub/add-sub'"
      change
      :change-route="'/product/finishing-material-sub/edit-sub/$id'"
      remove
      :remove-route="'/finishing-materials/deletecategory/$id'"
      detail
      :detail-route="'/product/finishing-material-sub/sub-detail/$id'"
      :products-route="'/product/finishing-material-sub/finishing-material/$id'"
    />
  </div>
</template>

<script>
import FinishingMaterialSub from '../../../components/products/finishing-material/sub-main'
export default {
  components: { FinishingMaterialSub }
}
</script>

<style scoped></style>
