<template>
  <v-container>
    <data-viewer
      :title="title"
      :columns="columns"
      :endpoint="endpoint"
      back
      create
      :create-route="'/' + route + '/add'"
      change
      :change-route="'/' + route + '/edit/$id'"
      remove
      :remove-route="'/building-materials/$id'"
      detail
      :detail-route="'/' + route + '/detail/$id'"
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
  </v-container>
</template>

<script>
import DataViewer from '../../../common/ui/widgets/DataViewer'
export default {
  name: 'BuildingMaterialMain',
  components: {
    DataViewer
  },
  props: {
    title: {
      type: String,
      default: 'Main Category'
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
    snackbarText: 'Success!',
    snackbarColor: 'green',
    snackbar: false,
    columns: [
      { text: 'Image', value: 'image', width: '90px', sortable: false },
      { text: 'Name', value: 'name' },
      { text: 'Description', value: 'description', sortable: false }
    ]
  }),
  methods: {
    returnBack() {
      this.$router.back()
    },
    onDelete() {
      this.snackbarColor = 'red'
      this.snackbarText = 'Successfully Deleted Item!'
      this.snackbar = true
    },
    reroute(route) {
      this.$router.push(route)
    }
  }
}
</script>

<style></style>
