<template>
  <FinishingMaterialSub
    title="Finishing Material Type"
    endpoint="/finishing-material-category"
    create
    :create-route="'/product/finishing-material-sub/add-sub'"
    change
    :change-route="'/product/finishing-material-sub/edit-sub/$id'"
    remove
    :remove-route="'/finishing-material-category/$id'"
    detail
    :detail-route="'/product/finishing-material-sub/sub-detail/$id'"
    :products-route="'/product/finishing-material-sub/finishing-material/$id'"
  />
</template>

<script>
import FinishingMaterialSub from '../../../components/products/finishing-material/sub-main'
export default {
  components: { FinishingMaterialSub }
}
</script>

<style scoped></style>
