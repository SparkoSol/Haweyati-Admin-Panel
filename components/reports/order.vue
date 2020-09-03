<template>
  <v-container>
    <v-tabs v-model="tab" background-color="#313F53" color="#ff974d" dark>
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
          :all="item.all"
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
import DataViewerReport from '../../common/ui/widgets/DataViewerReportOrder'

export default {
  name: 'OrderReport',
  components: {
    DataViewerReport
  },
  data: () => ({
    endpoint: '',
    tabs: [
      {
        tab: 'All',
        endpoint: '/drivers',
        all: true,
        date: false,
        dateTo: false,
        week: false,
        month: false,
        year: false,
        title: 'All Orders Report',
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
          { text: 'Total', value: 'details.netTotal' },
          { text: 'Date', value: 'createdAt' },
          { text: 'Status', value: 'status' }
        ]
      },
      {
        tab: 'Daily',
        endpoint: '/drivers',
        all: false,
        date: true,
        dateTo: false,
        week: false,
        month: false,
        year: false,
        title: 'Daily Order Report',
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
          { text: 'Total', value: 'details.netTotal' },
          { text: 'Date', value: 'createdAt' },
          { text: 'Status', value: 'status' }
        ]
      },
      {
        tab: 'Weekly',
        endpoint: '/drivers',
        all: false,
        date: false,
        dateTo: false,
        week: true,
        month: false,
        year: false,
        title: 'Weekly Order Report',
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
          { text: 'Total', value: 'details.netTotal' },
          { text: 'Date', value: 'createdAt' },
          { text: 'Status', value: 'status' }
        ]
      },
      {
        tab: 'Monthly',
        endpoint: '/drivers',
        all: false,
        date: false,
        dateTo: false,
        week: false,
        month: true,
        year: false,
        title: 'Monthly Order Report',
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
          { text: 'Total', value: 'details.netTotal' },
          { text: 'Date', value: 'createdAt' },
          { text: 'Status', value: 'status' }
        ]
      },
      {
        tab: 'Yearly',
        endpoint: '/drivers',
        all: false,
        date: false,
        dateTo: false,
        week: false,
        month: false,
        year: true,
        title: 'Yearly Order Report',
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
          { text: 'Total', value: 'details.netTotal' },
          { text: 'Date', value: 'createdAt' },
          { text: 'Status', value: 'status' }
        ]
      },
      {
        tab: 'Custom',
        endpoint: '/drivers',
        all: false,
        date: true,
        dateTo: true,
        week: false,
        month: false,
        year: false,
        title: 'Custom Order Reports',
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
          { text: 'Total', value: 'details.netTotal' },
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
    }
  }
}
</script>

<style scoped></style>
