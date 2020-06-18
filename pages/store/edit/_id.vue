<template>
  <store-form :supplier="supplier" :is-update="true" title="Update Supplier" />
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

<style scoped></style>
