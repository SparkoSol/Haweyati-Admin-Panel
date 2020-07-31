<template>
  <OrderMain title="Order Requests" endpoint="/orders" route="order" />
</template>

<script>
import OrderMain from '../../components/order/main'
export default {
  name: 'Index',
  components: { OrderMain }
}
</script>

<style scoped></style>
