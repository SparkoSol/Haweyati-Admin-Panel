<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <FinishingMaterialSubForm
      title="Add Finishing Material Type"
      endpoint="finishing-material-category"
    />
  </div>
</template>

<script>
import FinishingMaterialSubForm from '../../../components/products/finishing-material/sub-form'
export default {
  name: 'AddSub',
  components: { FinishingMaterialSubForm }
}
</script>

<style scoped></style>
