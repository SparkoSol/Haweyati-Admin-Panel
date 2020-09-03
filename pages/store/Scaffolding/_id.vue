<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <SupplierScaffolding />
  </div>
  <!--  <StoreProductPage-->
  <!--    title="Scaffolding"-->
  <!--    endpoint="/scaffolding/fromsupplier/$id"-->
  <!--  />-->
</template>

<script>
import SupplierScaffolding from '../../../components/store/scaffolding'
export default {
  components: { SupplierScaffolding }
}
</script>

<style scoped></style>
