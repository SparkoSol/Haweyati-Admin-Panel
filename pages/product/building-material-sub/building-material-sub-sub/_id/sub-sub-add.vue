<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <SubSubForm
      title="Add Building Material Sub Type"
      endpoint="building-material-sub-category"
    />
  </div>
</template>

<script>
import SubSubForm from '@/components/products/building-material/sub-sub-form'
export default {
  name: 'MainSubSub',
  components: { SubSubForm }
}
</script>

<style scoped></style>
