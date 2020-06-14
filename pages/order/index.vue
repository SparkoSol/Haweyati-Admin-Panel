<template>
  <v-container>
    <h1 style="padding:10px">Orders</h1>
    <div>
      <v-card style="overflow: auto;padding: 20px" class="scrollbar">
        <div style="margin-bottom: 20px">
          <v-btn
            small
            style="margin-right: 10px;background-color: #313F53;color: white"
            >All
          </v-btn>
          <v-btn small style="margin-right: 10px">Open</v-btn>
          <v-btn small style="margin-right: 10px">Closed</v-btn>
        </div>
        <v-divider style="margin-bottom: 20px"></v-divider>
        <data-viewer :columns="columns" change remove />
      </v-card>
    </div>
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
        { text: 'Order', value: 'order' },
        { text: 'Date', value: 'date' },
        { text: 'Customer', value: 'customer' },
        { text: 'Total', value: 'total' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', align: 'center' }
      ],
      data: []
    }
  }
}
</script>

<style scoped></style>
