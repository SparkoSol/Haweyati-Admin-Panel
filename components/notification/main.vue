<template>
  <div style="padding: 20px">
    <data-viewer
      :title="title"
      :columns="columns"
      :endpoint="endpoint"
      create
      :create-route="route + '/send'"
      :action="false"
    />
  </div>
</template>

<script>
import DataViewer from '../../common/ui/widgets/DataViewer'
export default {
  name: 'NotificationMain',
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
        text: 'Title',
        value: 'message.title',
        width: '20'
      },
      { text: 'Message', value: 'message.body', width: '20' },
      { text: 'Recipient', value: 'person', width: '90' }
    ]
  })
}
</script>

<style scoped></style>
