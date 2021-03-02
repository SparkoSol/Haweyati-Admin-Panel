<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <store-form
      :supplier="supplier"
      :cities="supplier.cities"
      :is-update="true"
      title="Update Supplier"
    />
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

<style scoped></style>
