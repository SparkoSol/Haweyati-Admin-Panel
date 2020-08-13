<template>
  <TestFinishingMaterial
    title="Add Finishing Material"
    :endpoint="'finishing-materials'"
    :finishing-material="finishingMaterial"
  />
</template>

<script>
import TestFinishingMaterial from '../../components/test/test'
export default {
  components: { TestFinishingMaterial },
  async asyncData({ $axios, route }) {
    return {
      finishingMaterial: await $axios.$get(
        'finishing-materials/5f2102b07051d8220474e13c'
      )
    }
  }
}
</script>

<style scoped></style>
