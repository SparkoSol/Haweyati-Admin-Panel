<template>
  <SupplierDetail :supplier="supplier" />
</template>

<script>
import SupplierDetail from '../../../components/store/detail'
export default {
  components: { SupplierDetail },
  async asyncData({ $axios, route }) {
    return {
      supplier: await $axios.$get('suppliers/' + route.params.id)
    }
  }
}
</script>

<style scoped></style>
