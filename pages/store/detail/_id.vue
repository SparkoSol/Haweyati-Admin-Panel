<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <SupplierDetail :supplier="supplier" />
  </div>
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
