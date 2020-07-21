<template>
  <StoreProductPage
    title="Construction Dumpster"
    :endpoint="'/dumpsters/fromsupplier/' + supplier._id"
    route="product/construction-dumpster"
    :columns="columns"
  />
</template>

<script>
import StoreProductPage from '../../../components/store/product'
export default {
  components: { StoreProductPage },
  async asyncData({ $axios, route }) {
    return {
      supplier: await $axios.$get('suppliers/' + route.params.id)
    }
  },
  data: () => ({
    columns: [
      { text: 'Image', value: 'image', width: '90px' },
      { text: 'Size', value: 'size' },
      { text: 'Description', value: 'description' }
    ]
  })
}
</script>

<style scoped></style>
