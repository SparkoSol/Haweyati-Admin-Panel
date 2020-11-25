<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <VehicleTypeMain
      title="Manage Vehicle Types"
      endpoint="vehicle-type"
      route="/vehicle-type"
    />
  </div>
</template>

<script>
import VehicleTypeMain from '@/components/vehicle-type/main'
export default {
  name: 'Index',
  components: { VehicleTypeMain }
}
</script>

<style scoped></style>
