<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <DriverDetail :driver="driver" title="Driver Detail" />
  </div>
</template>

<script>
import DriverDetail from '../../../components/driver/detail'
export default {
  components: { DriverDetail },
  async asyncData({ $axios, route }) {
    return {
      driver: await $axios.$get('drivers/' + route.params.id)
    }
  }
}
</script>

<style scoped></style>
