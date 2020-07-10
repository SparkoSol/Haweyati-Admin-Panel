<template>
  <StoreProductPage
    title="Scaffolding"
    endpoint="/scaffolding/fromsupplier/$id"
  />
</template>

<script>
import StoreProductPage from '../../../components/store/product'
export default {
  components: { StoreProductPage }
}
</script>

<style scoped></style>
