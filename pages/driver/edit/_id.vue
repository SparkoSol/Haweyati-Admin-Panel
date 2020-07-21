<template>
  <DriverForm :driver="driver" :title="driver.profile.name" is-update />
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
