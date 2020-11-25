<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <VehicleTypeForm
      title="Edit Vehicle Type"
      :vehicle-type="vehicleType"
      is-update
    />
  </div>
</template>

<script>
import VehicleTypeForm from '@/components/vehicle-type/form'
export default {
  name: 'Id',
  components: { VehicleTypeForm },
  async asyncData({ $axios, route }) {
    return {
      vehicleType: await $axios.$get('vehicle-type/' + route.params.id)
    }
  }
}
</script>

<style scoped></style>
