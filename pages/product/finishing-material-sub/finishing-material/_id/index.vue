<template>
  <FinishingMaterialMain
    :endpoint="'finishing-materials/getbyparent/' + this.$route.params.id"
    :route="
      'product/finishing-material-sub/finishing-material/' +
        this.$route.params.id
    "
    title="Finishing Materials"
  />
</template>

<script>
import FinishingMaterialMain from '../../../../../components/products/finishing-material/main'
export default {
  name: 'Index',
  components: { FinishingMaterialMain }
}
</script>

<style scoped></style>
