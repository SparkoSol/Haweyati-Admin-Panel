<template>
  <StoreProductPage
    title="Delivery Vehicle"
    endpoint="/delivery-vehicle/fromsupplier/$id"
  />
</template>

<script>
import StoreProductPage from '../../components/store/product'
export default {
  components: { StoreProductPage }
}
</script>

<style scoped></style>
