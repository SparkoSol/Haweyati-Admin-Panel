<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <StoreProductPage
      title="Building Material"
      :endpoint="'/building-materials/fromsupplier/' + supplier._id"
      :route="
        'product/building-material-sub/building-material/' +
          this.$route.params.id
      "
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
      { text: 'Name', value: 'name' },
      { text: 'Description', value: 'description' },
      { text: 'Main Category', value: 'parent.name' }
    ]
  })
}
</script>

<style scoped></style>
