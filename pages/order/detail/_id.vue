<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <OrderDetail :order="order" />
  </div>
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
