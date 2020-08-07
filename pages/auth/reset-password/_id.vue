<template>
  <reset-password :get-hash="hash" />
</template>

<script>
import ResetPassword from '../../../components/misc/reset-password'
export default {
  layout(context) {
    return 'none'
  },
  auth: false,
  components: { ResetPassword },
  data: () => ({
    hash: ''
  }),
  created() {
    this.hash = this.$route.params.id
  }
}
</script>

<style scoped></style>
