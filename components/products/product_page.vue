<template>
  <v-container>
    <data-viewer
      :title="title"
      :columns="columns"
      :endpoint="endpoint"
      create
      :create-route="'/' + route + '/add'"
      change
      :change-route="'/' + route + '/edit/$id'"
      remove
      :remove-route="'/' + endpoint + '/$id'"
    />
  </v-container>
</template>

<script>
import DataViewer from '../../common/ui/widgets/DataViewer'
export default {
  name: 'ProductPage',
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
    columns: [
      { text: 'Image', value: 'image' },
      { text: 'Size', value: 'size' },
      { text: 'Description', value: 'description' },
      { text: 'Rent', value: 'rent' },
      { text: 'Extra Day Price', value: 'extradayprice' }
    ]
  }),
  methods: {
    returnBack() {
      this.$router.back()
    },
    reroute(route) {
      this.$router.push(route)
    }
  }
}
</script>

<style></style>
