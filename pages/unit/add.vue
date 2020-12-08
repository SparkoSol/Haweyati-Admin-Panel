<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <UnitForm title="Add Unit" />
  </div>
</template>

<script>
import UnitForm from '@/components/unit/form'
export default {
  name: 'Add',
  components: { UnitForm }
}
</script>

<style scoped></style>
