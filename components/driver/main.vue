<template>
  <v-container>
    <v-tabs v-model="tab" background-color="#313F53" color="#ff974d" dark>
      <v-tab v-for="item in tabs" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabs" :key="item.tab">
        <data-viewer
          :title="item.title"
          :columns="item.columns"
          :endpoint="endpoint + item.endpoint"
          :approve="item.approve"
          :approve-route="'/drivers/getverified/$id'"
          :reject="item.reject"
          :reject-route="'/drivers/getrejected/$id'"
          :detail="item.detail"
          :detail-route="'/' + route + '/detail/$id'"
          :block="item.block"
          :block-route="'/drivers/getblocked/$id'"
          :unblock="item.unblock"
          :unblock-route="'/drivers/getunblocked/$id'"
          :change="item.change"
          :change-route="'/' + route + '/edit/$id'"
          :on-block="onBlock"
          :on-unblock="onUnblocked"
          :on-accepted="onAccepted"
          :on-rejected="onRejected"
        />
      </v-tab-item>
    </v-tabs-items>
    <v-snackbar
      v-model="snackbar"
      bottom
      :color="snackbarColor"
      :timeout="1500"
    >
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script>
import DataViewer from '../../common/ui/widgets/DataViewer'

export default {
  name: 'DriverMain',
  components: {
    DataViewer
  },
  props: {
    title: {
      type: String,
      default: 'Drivers'
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
    snackbarText: 'Success!',
    snackbarColor: 'green',
    snackbar: false,
    tabs: [
      {
        tab: 'All',
        endpoint: '',
        approve: false,
        reject: false,
        detail: true,
        block: false,
        change: true,
        unblock: false,
        title: 'Drivers',
        columns: [
          {
            text: 'Image',
            value: 'profile.image'
          },
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
        tab: 'Pending',
        endpoint: '/getrequests',
        approve: true,
        reject: true,
        detail: true,
        change: true,
        block: false,
        unblock: false,
        title: 'Pending Drivers',
        columns: [
          {
            text: 'Image',
            value: 'profile.image'
          },
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
        tab: 'Active',
        endpoint: '/getverified',
        approve: false,
        reject: false,
        block: true,
        change: true,
        detail: true,
        unblock: false,
        title: 'Active Drivers',
        columns: [
          {
            text: 'Image',
            value: 'profile.image'
          },
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
        tab: 'Rejected',
        endpoint: '/getrejected',
        approve: true,
        reject: false,
        block: false,
        change: true,
        detail: true,
        unblock: false,
        title: 'Rejected Drivers',
        columns: [
          {
            text: 'Image',
            value: 'profile.image'
          },
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
        tab: 'Blocked',
        endpoint: '/getblocked',
        approve: false,
        reject: false,
        block: false,
        change: true,
        detail: true,
        unblock: true,
        title: 'Blocked Drivers',
        columns: [
          {
            text: 'Image',
            value: 'profile.image'
          },
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
