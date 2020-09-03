<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <FinishingMaterialMain
      :endpoint="'finishing-materials/getbyparent/' + this.$route.params.id"
      :route="
        'product/finishing-material-sub/finishing-material/' +
          this.$route.params.id
      "
      title="Finishing Materials"
    />
  </div>
</template>

<script>
import FinishingMaterialMain from '../../../../../components/products/finishing-material/main'
export default {
  name: 'Index',
  components: { FinishingMaterialMain }
}
</script>

<style scoped></style>
