<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <CustomerDetail :customer="customer" endpoint="orders/getbycustomer/" />
  </div>
</template>

<script>
import CustomerDetail from '../../../components/customer/detail'
export default {
  components: { CustomerDetail },
  async asyncData({ $axios, route }) {
    return {
      customer: await $axios.$get('customers/getall/' + route.params.id)
    }
  }
}
</script>

<style scoped></style>
