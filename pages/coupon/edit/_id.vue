<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <CouponForm title="Edit Coupon" :coupon="coupon" is-update />
  </div>
</template>

<script>
import CouponForm from '@/components/coupon/form'

export default {
  name: 'Id',
  components: { CouponForm },
  async asyncData({ $axios, route }) {
    return {
      coupon: await $axios.$get('coupons/' + route.params.id)
    }
  }
}
</script>

<style scoped></style>
