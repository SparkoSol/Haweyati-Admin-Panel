<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 15px"
  >
    <OrderMain title="Order Requests" endpoint="/orders" route="order" />
  </div>
</template>

<script>
import OrderMain from '../../components/order/main'
export default {
  name: 'Index',
  components: { OrderMain }
}
</script>

<style scoped></style>
