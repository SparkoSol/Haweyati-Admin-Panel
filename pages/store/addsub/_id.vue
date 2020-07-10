<template>
  <StoreForm title="Add Sub Supplier" :main-supplier="supplier" />
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
