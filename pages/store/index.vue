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
    />
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
      columns: [
        { text: 'Image', value: 'profilePic' },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Contact', value: 'contact' },
        { text: 'Address', value: 'address' },
        { text: 'Services', value: 'services' }
      ]
    }
  }
}
</script>

<style scoped></style>
