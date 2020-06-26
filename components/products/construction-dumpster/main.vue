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
      :remove-route="'/' + endpoint + '/$id'"
      detail
      :detail-route="'/' + route + '/detail/$id'"
    />
  </v-container>
</template>

<script>
import DataViewer from '../../../common/ui/widgets/DataViewer'
export default {
  name: 'DumpsterMain',
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
      { text: 'Image', value: 'images' },
      { text: 'Size', value: 'size' },
      { text: 'Description', value: 'description' }
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
