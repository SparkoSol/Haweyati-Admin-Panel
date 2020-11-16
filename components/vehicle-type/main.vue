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
    />
  </div>
</template>

<script>
import DataViewer from '../../common/ui/widgets/DataViewer'
export default {
  name: 'VehicleTypeMain',
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
    columns: [
      {
        text: 'Icon',
        value: 'message.title',
        width: '150px'
      },
      { text: 'Type', value: 'message.body' },
      { text: 'Capacity', value: 'person' }
    ]
  })
}
</script>

<style scoped></style>
