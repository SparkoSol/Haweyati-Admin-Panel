<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <building-material-main
      :endpoint="'building-materials/getbyparent/' + this.$route.params.iid"
      :route="
        'product/building-material-sub/building-material-sub-sub/building-material/' +
          this.$route.params.iid
      "
      title="Building Materials"
    />
  </div>
</template>

<script>
import BuildingMaterialMain from '../../../../../../components/products/building-material/main'
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
