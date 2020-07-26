<template>
  <FinishingMaterialSubForm
    :finishing-material-sub="finishingMaterialSub"
    :is-update="true"
    title="Update Finishing Material Form"
    endpoint="finishing-material-category"
  />
</template>

<script>
import FinishingMaterialSubForm from '../../../../components/products/finishing-material/sub-form'
export default {
  components: { FinishingMaterialSubForm },
  async asyncData({ $axios, route }) {
    return {
      finishingMaterialSub: await $axios.$get(
        'finishing-material-category/' + route.params.id
      )
    }
  }
}
</script>
