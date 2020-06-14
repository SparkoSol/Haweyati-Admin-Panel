<template>
  <v-container>
    <data-viewer title="Stores" :columns="columns" create change remove />
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
