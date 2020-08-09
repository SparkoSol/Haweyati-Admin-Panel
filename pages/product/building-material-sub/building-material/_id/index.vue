<template>
  <building-material-main
    :endpoint="'building-materials/getbyparent/' + this.$route.params.id"
    :route="
      'product/building-material-sub/building-material/' + this.$route.params.id
    "
    title="Building Materials"
  />
</template>

<script>
import BuildingMaterialMain from '../../../../../components/products/building-material/main'
export default {
  name: 'Index',
  components: { BuildingMaterialMain },
  data: () => ({
    snackbarText: 'Success!',
    snackbarColor: 'green',
    snackbar: false
  }),
  methods: {
    onDelete() {
      this.snackbarColor = 'red'
      this.snackbarText = 'Successfully Deleted Item!'
      this.snackbar = true
    }
  }
}
</script>

<style scoped></style>
