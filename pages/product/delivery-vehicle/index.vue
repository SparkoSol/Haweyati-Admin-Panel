<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <DeliveryVehicleMain
      title="Delivery Vehicle"
      endpoint="/drivers/getverified"
      route="product/delivery-vehicle"
    />
  </div>
</template>

<script>
import DeliveryVehicleMain from '../../../components/products/delivery-vehicle/main'
export default {
  components: { DeliveryVehicleMain }
}
</script>

<style scoped></style>
