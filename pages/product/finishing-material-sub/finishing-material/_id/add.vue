<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <FinishingMaterialForm
      title="Add Finishing Material"
      :endpoint="'finishing-materials'"
    />
  </div>
</template>

<script>
import FinishingMaterialForm from '../../../../../components/products/finishing-material/form'
export default {
  components: { FinishingMaterialForm }
}
</script>

<style scoped></style>
