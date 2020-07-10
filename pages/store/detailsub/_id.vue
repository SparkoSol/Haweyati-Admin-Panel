<template>
  <SupplierSubDetail :supplier="supplier" />
</template>

<script>
import SupplierSubDetail from '../../../components/store/subdetail'
export default {
  components: { SupplierSubDetail },
  async asyncData({ $axios, route }) {
    return {
      supplier: await $axios.$get('suppliers/' + route.params.id)
    }
  }
}
</script>

<style scoped></style>
