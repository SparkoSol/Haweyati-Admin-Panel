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
          :approve-route="'/orders/approved/$id'"
          :reject="item.reject"
          :reject-route="'/orders/getrejected/$id'"
          :detail="item.detail"
          :detail-route="'/' + route + '/detail/$id'"
          :block="item.block"
          :unblock="item.unblock"
          :change="item.change"
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
  name: 'OrderMain',
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
        unblock: false,
        title: 'Orders',
        columns: [
          {
            text: '#',
            value: 'orderNo'
          },
          {
            text: 'Name',
            value: 'customer.profile.name'
          },
          { text: 'Contact', value: 'customer.profile.contact' },
          { text: 'Service', value: 'service' },
          { text: 'Payment Type', value: 'paymentType' },
          { text: 'Total', value: 'total' },
          { text: 'Date', value: 'createdAt' },
          { text: 'Status', value: 'status' }
        ]
      },
      {
        tab: 'Pending',
        endpoint: '/getpending',
        approve: false,
        reject: true,
        detail: true,
        block: false,
        unblock: false,
        title: 'Pending Orders',
        columns: [
          {
            text: '#',
            value: 'orderNo'
          },
          {
            text: 'Name',
            value: 'customer.profile.name'
          },
          { text: 'Contact', value: 'customer.profile.contact' },
          { text: 'Service', value: 'service' },
          { text: 'Payment Type', value: 'paymentType' },
          { text: 'Total', value: 'total' },
          { text: 'Date', value: 'createdAt' },
          { text: 'Status', value: 'status' }
        ]
      },
      // {
      //   tab: 'Approved',
      //   endpoint: '/approved',
      //   approve: false,
      //   reject: true,
      //   block: false,
      //   change: false,
      //   detail: true,
      //   unblock: false,
      //   title: 'Approved Orders',
      //   columns: [
      //     {
      //       text: '#',
      //       value: 'orderNo'
      //     },
      //     {
      //       text: 'Name',
      //       value: 'customer.profile.name'
      //     },
      //     { text: 'Contact', value: 'customer.profile.contact' },
      //     { text: 'Service', value: 'service' },
      //     { text: 'Payment Type', value: 'paymentType' },
      //     { text: 'Total', value: 'total' },
      //     { text: 'Date', value: 'createdAt' },
      //     { text: 'Status', value: 'status' }
      //   ]
      // },
      {
        tab: 'Accepted',
        endpoint: '/getactive',
        approve: false,
        reject: false,
        block: false,
        change: false,
        detail: true,
        unblock: false,
        title: 'Accepted Orders',
        columns: [
          {
            text: '#',
            value: 'orderNo'
          },
          {
            text: 'Name',
            value: 'customer.profile.name'
          },
          { text: 'Contact', value: 'customer.profile.contact' },
          { text: 'Service', value: 'service' },
          { text: 'Payment Type', value: 'paymentType' },
          { text: 'Total', value: 'total' },
          { text: 'Date', value: 'createdAt' },
          { text: 'Status', value: 'status' }
        ]
      },
      {
        tab: 'Preparing',
        endpoint: '/preparing',
        approve: false,
        reject: false,
        block: false,
        change: false,
        detail: true,
        unblock: false,
        title: 'Preparing Orders',
        columns: [
          {
            text: '#',
            value: 'orderNo'
          },
          {
            text: 'Name',
            value: 'customer.profile.name'
          },
          { text: 'Contact', value: 'customer.profile.contact' },
          { text: 'Service', value: 'service' },
          { text: 'Payment Type', value: 'paymentType' },
          { text: 'Total', value: 'total' },
          { text: 'Date', value: 'createdAt' },
          { text: 'Status', value: 'status' }
        ]
      },
      {
        tab: 'Dispatched',
        endpoint: '/dispatched',
        approve: false,
        reject: false,
        block: false,
        change: false,
        detail: true,
        unblock: false,
        title: 'Dispatched Orders',
        columns: [
          {
            text: '#',
            value: 'orderNo'
          },
          {
            text: 'Name',
            value: 'customer.profile.name'
          },
          { text: 'Contact', value: 'customer.profile.contact' },
          { text: 'Service', value: 'service' },
          { text: 'Payment Type', value: 'paymentType' },
          { text: 'Total', value: 'total' },
          { text: 'Date', value: 'createdAt' },
          { text: 'Status', value: 'status' }
        ]
      },
      {
        tab: 'Delivered',
        endpoint: '/completed',
        approve: false,
        reject: false,
        block: false,
        change: false,
        detail: true,
        unblock: false,
        title: 'Delivered Orders',
        columns: [
          {
            text: '#',
            value: 'orderNo'
          },
          {
            text: 'Name',
            value: 'customer.profile.name'
          },
          { text: 'Contact', value: 'customer.profile.contact' },
          { text: 'Service', value: 'service' },
          { text: 'Payment Type', value: 'paymentType' },
          { text: 'Total', value: 'total' },
          { text: 'Date', value: 'createdAt' },
          { text: 'Status', value: 'status' }
        ]
      },
      {
        tab: 'Rejected',
        endpoint: '/getrejected',
        approve: true,
        reject: false,
        block: false,
        detail: true,
        unblock: false,
        title: 'Rejected Orders',
        columns: [
          {
            text: '#',
            value: 'orderNo'
          },
          {
            text: 'Name',
            value: 'customer.profile.name'
          },
          { text: 'Contact', value: 'customer.profile.contact' },
          { text: 'Service', value: 'service' },
          { text: 'Payment Type', value: 'paymentType' },
          { text: 'Total', value: 'total' },
          { text: 'Date', value: 'createdAt' },
          { text: 'Status', value: 'status' }
        ]
      },
      {
        tab: 'Cancelled',
        endpoint: '/cancelled',
        approve: false,
        reject: false,
        block: false,
        change: false,
        detail: true,
        unblock: false,
        title: 'Cancelled Orders',
        columns: [
          {
            text: '#',
            value: 'orderNo'
          },
          {
            text: 'Name',
            value: 'customer.profile.name'
          },
          { text: 'Contact', value: 'customer.profile.contact' },
          { text: 'Service', value: 'service' },
          { text: 'Payment Type', value: 'paymentType' },
          { text: 'Total', value: 'total' },
          { text: 'Date', value: 'createdAt' },
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
      this.snackbarText = 'Successfully Rejected Order!'
      this.snackbar = true
    },
    onAccepted() {
      window.console.log(this.snackbarText)
      window.console.log(this.snackbar)
      this.snackbarColor = 'green'
      this.snackbarText = 'Successfully Approved Order!'
      this.snackbar = true
    }
  }
}
</script>

<style scoped></style>
