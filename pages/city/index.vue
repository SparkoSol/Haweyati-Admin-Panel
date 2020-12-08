<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <CityMain title="Cities" endpoint="city" route="city" />
  </div>
</template>

<script>
import CityMain from '@/components/city/main'
export default {
  name: 'Index',
  components: { CityMain }
}
</script>

<style scoped></style>
