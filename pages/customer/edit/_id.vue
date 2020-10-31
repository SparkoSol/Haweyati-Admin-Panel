<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <CustomerForm :customer="customer" is-update />
  </div>
</template>

<script>
import CustomerForm from '@/components/customer/form'
export default {
  name: 'Id',
  components: { CustomerForm },
  async asyncData({ $axios, route }) {
    return {
      customer: await $axios.$get('customers/' + route.params.id)
    }
  }
}
</script>

<style scoped></style>
