<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <SupplierSubDetail :supplier="supplier" />
  </div>
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
