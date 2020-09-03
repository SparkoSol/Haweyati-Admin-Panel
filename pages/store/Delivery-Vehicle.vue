<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <StoreProductPage
      title="Delivery Vehicle"
      endpoint="/delivery-vehicle/fromsupplier/$id"
    />
  </div>
</template>

<script>
import StoreProductPage from '../../components/store/product'
export default {
  components: { StoreProductPage }
}
</script>

<style scoped></style>
