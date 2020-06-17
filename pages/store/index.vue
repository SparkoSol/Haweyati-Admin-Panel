<template>
  <v-container>
    <data-viewer
      title="Stores"
      :columns="columns"
      create
      endpoint="/suppliers"
      create-route="/store/add"
      change
      remove
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
