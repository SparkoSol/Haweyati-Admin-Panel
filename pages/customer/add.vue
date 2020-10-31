<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <CustomerForm />
  </div>
</template>

<script>
import CustomerForm from '@/components/customer/form'
export default {
  name: 'Add',
  components: { CustomerForm }
}
</script>

<style scoped></style>
