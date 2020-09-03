<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <StoreForm title="Add Sub Supplier" :main-supplier="supplier" />
  </div>
</template>

<script>
import StoreForm from '../../../components/store/Form'
export default {
  components: {
    StoreForm
  },
  async asyncData({ $axios, route }) {
    return {
      supplier: await $axios.$get('suppliers/' + route.params.id)
    }
  }
}
</script>
