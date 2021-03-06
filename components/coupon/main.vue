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
  name: 'CouponMain',
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
      { text: 'Name', value: 'name' },
      { text: 'Code', value: 'code' },
      { text: 'Value', value: 'value' },
      { text: 'Expiry', value: 'expiry' },
      { text: 'Is One Time', value: 'isOneTime' },
      { text: 'Used By', value: 'usedBy' }
    ]
  })
}
</script>

<style scoped></style>
