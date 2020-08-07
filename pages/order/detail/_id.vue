<template>
  <OrderDetail :order="order" />
</template>

<script>
import OrderDetail from '../../../components/order/detail'
export default {
  components: { OrderDetail },
  async asyncData({ $axios, route }) {
    return {
      order: await $axios.$get('orders/' + route.params.id)
    }
  }
}
</script>

<style scoped></style>
