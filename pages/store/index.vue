<template>
  <v-container>
    <data-viewer
      title="Stores"
      :columns="columns"
      endpoint="/suppliers"
      create
      create-route="/store/add"
      change
      change-route="/store/edit/$id"
      remove
      remove-route="/suppliers/$id"
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
import DataViewer from '../../common/ui/widgets/DataViewer'

export default {
  components: {
    DataViewer
  },
  data() {
    return {
      snackbarText: 'Success!',
      snackbarColor: 'green',
      snackbar: false,
      columns: [
        {
          text: 'Image',
          value: 'images',
          filterable: false,
          sortable: false
        },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Contact', value: 'contact' },
        { text: 'Address', value: 'address', sortable: false },
        { text: 'Services', value: 'services', sortable: false, width: '300px' }
      ]
    }
  },
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
