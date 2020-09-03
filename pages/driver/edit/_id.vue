<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <DriverForm :driver="driver" :title="driver.profile.name" is-update />
  </div>
</template>

<script>
import DriverForm from '../../../components/driver/form'
export default {
  components: { DriverForm },
  async asyncData({ $axios, route }) {
    return {
      driver: await $axios.$get('drivers/' + route.params.id)
    }
  }
}
</script>

<style scoped></style>
