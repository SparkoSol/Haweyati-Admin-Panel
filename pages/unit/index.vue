<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <UnitMain title="Units" endpoint="unit" route="unit" />
  </div>
</template>

<script>
import UnitMain from '@/components/unit/main'
export default {
  name: 'Index',
  components: { UnitMain }
}
</script>

<style scoped></style>
