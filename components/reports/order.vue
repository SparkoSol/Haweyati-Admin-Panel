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
          :report="item.report"
          back
          :tab="item.tab"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import moment from 'moment'
import DataViewerReport from '../../common/ui/widgets/DataViewerReportOrder'
import { Report } from '@/models/report'

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
        title: 'All Orders Report',
        report: new Report(),
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
        tab: 'Daily',
        endpoint: '/drivers',
        title: 'Daily Order Report',
        report: new Report(
          null,
          null,
          moment().format('yyyy-MM-DD'),
          null,
          null
        ),
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
        tab: 'Weekly',
        endpoint: '/drivers',
        title: 'Weekly Order Report',
        report: new Report(
          null,
          moment()
            .format('yyyy-W')
            .replace('-', '-W'),
          null,
          null,
          null
        ),
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
        tab: 'Monthly',
        endpoint: '/drivers',
        title: 'Monthly Order Report',
        report: new Report(null, null, null, moment().format('yyyy-MM'), null),
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
        tab: 'Yearly',
        endpoint: '/drivers',
        title: 'Yearly Order Report',
        report: new Report(moment().year(), null, null, null, null),
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
        tab: 'Custom',
        endpoint: '/drivers',
        title: 'Custom Order Reports',
        report: new Report(
          null,
          null,
          moment().format('yyyy-MM-DD'),
          null,
          moment().format('yyyy-MM-DD')
        ),
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
    }
  }
}
</script>

<style scoped></style>
