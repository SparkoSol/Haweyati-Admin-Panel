<template>
  <FinishingMaterialForm
    :finishing-material="finishingMaterial"
    :suppliers="finishingMaterial.suppliers"
    :finishing-material-options="finishingMaterial.options"
    :finishing-material-varients="finishingMaterial.varient"
    :is-update="true"
    title="Update Finishing Material"
    endpoint="finishing-materials"
  />
</template>

<script>
import FinishingMaterialForm from '../../../../../../components/products/finishing-material/form'
export default {
  name: 'Iid',
  components: { FinishingMaterialForm },
  async asyncData({ $axios, route }) {
    return {
      finishingMaterial: await $axios.$get(
        'finishing-materials/' + route.params.iid
      )
    }
  }
}
</script>

<style scoped></style>
