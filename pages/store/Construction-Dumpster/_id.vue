<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <StoreProductPage
      title="Construction Dumpster"
      :endpoint="'/dumpsters/fromsuppliers/' + supplier._id"
      route="product/construction-dumpster"
      :columns="columns"
    />
  </div>
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
