<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <CityForm title="Add City" />
  </div>
</template>

<script>
import CityForm from '@/components/city/form'
export default {
  name: 'Add',
  components: { CityForm }
}
</script>

<style scoped></style>
