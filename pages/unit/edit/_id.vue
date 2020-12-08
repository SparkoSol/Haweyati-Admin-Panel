<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <UnitForm title="Edit Unit" :unit="unit" is-update />
  </div>
</template>

<script>
import UnitForm from '@/components/unit/form'

export default {
  name: 'Id',
  components: { UnitForm },
  async asyncData({ $axios, route }) {
    return {
      unit: await $axios.$get('unit/' + route.params.id)
    }
  }
}
</script>

<style scoped></style>
