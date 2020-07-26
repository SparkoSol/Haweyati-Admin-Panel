<template>
  <OrderMain title="Order Requests" endpoint="/driver" route="order" />
</template>

<script>
import OrderMain from '../../components/order/main'
export default {
  name: 'Index',
  components: { OrderMain }
}
</script>

<style scoped></style>
