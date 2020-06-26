<template>
  <FinishingMaterialSubForm
    title="Add Finishing Material Type"
    endpoint="finishing-material-category"
  />
</template>

<script>
import FinishingMaterialSubForm from '../../../components/products/finishing-material/sub-form'
export default {
  name: 'AddSub',
  components: { FinishingMaterialSubForm }
}
</script>

<style scoped></style>
