<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <CouponForm title="Add Coupon" />
  </div>
</template>

<script>
import CouponForm from '@/components/coupon/form'
export default {
  name: 'Add',
  components: { CouponForm }
}
</script>

<style scoped></style>
