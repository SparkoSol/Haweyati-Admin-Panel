<template>
  <FinishingMaterialForm
    title="Add Finishing Material"
    :endpoint="'finishing-materials'"
  />
</template>

<script>
import FinishingMaterialForm from '../../../../../components/products/finishing-material/form'
export default {
  components: { FinishingMaterialForm }
}
</script>

<style scoped></style>
