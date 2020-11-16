<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <VehicleTypeForm title="New Vehicle Type" />
  </div>
</template>

<script>
import VehicleTypeForm from '@/components/vehicle-type/form'
export default {
  name: 'Add',
  components: { VehicleTypeForm }
}
</script>

<style scoped></style>
