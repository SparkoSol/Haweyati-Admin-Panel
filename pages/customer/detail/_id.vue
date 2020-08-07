<template>
  <CustomerDetail :customer="customer" endpoint="orders/getbycustomer/" />
</template>

<script>
import CustomerDetail from '../../../components/customer/detail'
export default {
  components: { CustomerDetail },
  async asyncData({ $axios, route }) {
    return {
      customer: await $axios.$get('customers/' + route.params.id)
    }
  }
}
</script>

<style scoped></style>
