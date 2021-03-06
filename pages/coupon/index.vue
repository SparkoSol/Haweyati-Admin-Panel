<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <CouponMain title="Coupons" endpoint="coupons" route="coupon" />
  </div>
</template>

<script>
import CouponMain from '@/components/coupon/main'
export default {
  name: 'Index',
  components: { CouponMain }
}
</script>

<style scoped></style>
