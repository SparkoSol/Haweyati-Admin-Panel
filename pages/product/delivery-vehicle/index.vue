<template>
  <DeliveryVehicleMain
    title="Delivery Vehicle"
    endpoint="/drivers/getverified"
    route="product/delivery-vehicle"
  />
</template>

<script>
import DeliveryVehicleMain from '../../../components/products/delivery-vehicle/main'
export default {
  components: { DeliveryVehicleMain }
}
</script>

<style scoped></style>
