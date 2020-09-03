<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <DriverMain title="Driver Requests" endpoint="/drivers" route="driver" />
  </div>
</template>

<script>
import DriverMain from '../../components/driver/main'
export default {
  name: 'Index',
  components: { DriverMain }
}
</script>

<style scoped></style>
