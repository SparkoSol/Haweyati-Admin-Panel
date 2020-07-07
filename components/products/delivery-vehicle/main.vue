<template>
  <v-container>
    <data-viewer
      :title="title"
      :columns="columns"
      :endpoint="endpoint"
      back
      detail
      :detail-route="'/' + route + '/detail/$id'"
    />
  </v-container>
</template>

<script>
import DataViewer from '../../../common/ui/widgets/DataViewer'
export default {
  name: 'DeliveryVehicleMain',
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
      { text: 'Vehicle Name', value: 'vehicle.name' },
      { text: 'Vehicle Model', value: 'vehicle.model' },
      { text: 'Vehicle ID', value: 'vehicle.identificationNo' },
      { text: 'Driver Name', value: 'profile.name' },
      { text: 'Driver Contact', value: 'profile.contact' },
      { text: 'Driver License', value: 'license' },
      { text: 'Driver City', value: 'city' },
      { text: 'Status', value: 'status' }
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
