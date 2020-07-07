<template>
  <DriverDetail :driver="driver" />
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
