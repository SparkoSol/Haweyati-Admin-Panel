<template>
  <div style="padding: 20px">
    <data-viewer
      :title="title"
      :columns="columns"
      :endpoint="endpoint"
      create
      :create-route="route + '/add'"
      change
      :change-route="route + '/edit/$id'"
      remove
      remove-route="unit/$id"
      :on-delete="onDelete"
    />
    <v-snackbar
      v-model="snackbar"
      bottom
      :color="snackbarColor"
      :timeout="1500"
    >
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script>
import DataViewer from '../../common/ui/widgets/DataViewer'
export default {
  name: 'UnitMain',
  components: {
    DataViewer
  },
  props: {
    title: {
      type: String,
      default: 'Orders'
    },
    endpoint: {
      type: String,
      default: 'main-category'
    },
    route: {
      type: String,
      default: 'index'
    }
  },
  data: () => ({
    columns: [{ text: 'Unit Name', value: 'name' }],
    snackbarText: 'Success!',
    snackbarColor: 'green',
    snackbar: false
  }),
  methods: {
    onDelete() {
      this.snackbarColor = 'red'
      this.snackbarText = 'Successfully Deleted Unit!'
      this.snackbar = true
    }
  }
}
</script>

<style scoped></style>
