<template>
  <DriverMain title="Driver Requests" endpoint="/drivers" route="driver" />
</template>

<script>
import DriverMain from '../../components/driver/main'
export default {
  name: 'Index',
  components: { DriverMain }
}
</script>

<style scoped></style>
