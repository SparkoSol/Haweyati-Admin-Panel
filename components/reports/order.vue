<template>
  <v-container>
    <v-tabs v-model="tab" background-color="#313F53" color="white" dark>
      <v-tab v-for="item in tabs" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabs" :key="item.tab">
        <DataViewerReport
          :title="item.title"
          :endpoint="item.endpoint"
          :columns="item.columns"
          back
          :date="item.date"
          :date-to="item.dateTo"
          :week="item.week"
          :month="item.month"
          :year="item.year"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import DataViewerReport from '../../common/ui/widgets/DataViewerReport'

export default {
  layout(context) {
    return 'report'
  },
  name: 'OrderReport',
  components: {
    DataViewerReport
  },
  data: () => ({
    endpoint: '',
    tabs: [
      {
        tab: 'Daily',
        endpoint: '/drivers',
        date: true,
        dateTo: false,
        week: false,
        month: false,
        year: false,
        title: 'Daily Order Report',
        columns: [
          {
            text: 'Name',
            value: 'profile.name'
          },
          { text: 'Contact', value: 'profile.contact' },
          { text: 'License', value: 'license' },
          { text: 'City', value: 'city' },
          { text: 'Vehicle Name', value: 'vehicle.name' },
          { text: 'Vehicle Model', value: 'vehicle.model' },
          { text: 'Vehicle ID', value: 'vehicle.identificationNo' },
          { text: 'Status', value: 'status' }
        ]
      },
      {
        tab: 'Weekly',
        endpoint: '/drivers',
        date: false,
        dateTo: false,
        week: true,
        month: false,
        year: false,
        title: 'Weekly Order Report',
        columns: [
          { text: 'Name', value: 'driver.profile.name' },
          { text: 'Contact', value: 'driver.profile.contact' },
          { text: 'License', value: 'driver.license' },
          { text: 'City', value: 'driver.city' },
          { text: 'Vehicle Name', value: 'driver.vehicle.name' },
          { text: 'Vehicle Model', value: 'driver.vehicle.model' },
          { text: 'Vehicle ID', value: 'driver.vehicle.identificationNo' },
          { text: 'Status', value: 'status' }
        ]
      },
      {
        tab: 'Monthly',
        endpoint: '/drivers',
        date: false,
        dateTo: false,
        week: false,
        month: true,
        year: false,
        title: 'Monthly Order Report',
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
      },
      {
        tab: 'Yearly',
        endpoint: '/drivers',
        date: false,
        dateTo: false,
        week: false,
        month: false,
        year: true,
        title: 'Yearly Order Report',
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
      },
      {
        tab: 'Custom',
        endpoint: '/drivers',
        date: true,
        dateTo: true,
        week: false,
        month: false,
        year: false,
        title: 'Custom Order Reports',
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
      }
    ],
    tab: null
  }),
  methods: {
    returnBack() {
      this.$router.back()
    },
    reroute(route) {
      this.$router.push(route)
    },
    onBlock() {
      window.console.log(this.snackbarText)
      window.console.log(this.snackbar)
      this.snackbarColor = 'red'
      this.snackbarText = 'Successfully Blocked Driver!'
      this.snackbar = true
    },
    onUnblocked() {
      window.console.log(this.snackbarText)
      window.console.log(this.snackbar)
      this.snackbarColor = 'green'
      this.snackbarText = 'Successfully Unblocked Driver!'
      this.snackbar = true
    },
    onRejected() {
      window.console.log(this.snackbarText)
      window.console.log(this.snackbar)
      this.snackbarColor = 'red'
      this.snackbarText = 'Successfully Rejected Driver!'
      this.snackbar = true
    },
    onAccepted() {
      window.console.log(this.snackbarText)
      window.console.log(this.snackbar)
      this.snackbarColor = 'green'
      this.snackbarText = 'Successfully Approved Driver!'
      this.snackbar = true
    }
  }
}
</script>

<style scoped></style>
