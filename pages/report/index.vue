<template>
  <v-container>
    <DataViewerReport
      title="Report"
      back
      :endpoint="'/drivers'"
      :columns="columns"
    />
  </v-container>
</template>

<script>
import DataViewerReport from '../../common/ui/widgets/DataViewerReportOrder'
export default {
  components: {
    DataViewerReport
  },
  data: () => ({
    columns: [
      { text: 'Name', value: 'profile.name' },
      { text: 'Contact', value: 'profile.contact' },
      { text: 'License', value: 'license' },
      { text: 'City', value: 'city' },
      { text: 'Vehicle Name', value: 'vehicle.name' },
      { text: 'Vehicle Model', value: 'vehicle.model' },
      { text: 'Vehicle ID', value: 'vehicle.identificationNo' },
      { text: 'Status', value: 'status' }
    ]
  })
}
</script>
