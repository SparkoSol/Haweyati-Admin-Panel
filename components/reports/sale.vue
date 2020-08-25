<template>
  <v-container>
    <v-tabs v-model="tab" background-color="#313F53" color="white" dark>
      <v-tab v-for="item in tabs" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabs" :key="item.tab">
        <DataViewerReportSale
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
import DataViewerReportSale from '../../common/ui/widgets/DataViewerReportSale'

export default {
  name: 'SaleReport',
  components: {
    DataViewerReportSale
  },
  data: () => ({
    endpoint: '',
    tabs: [
      {
        tab: 'Product Wise',
        endpoint: '/drivers',
        all: false,
        date: true,
        dateTo: true,
        week: false,
        month: false,
        year: false,
        title: 'Product Wise Sales Report',
        columns: [
          {
            text: 'Name',
            value: 'name'
          },
          {
            text: 'Qty',
            value: 'quantity'
          },
          { text: 'Total', value: 'total' }
        ]
      },
      {
        tab: 'Supplier Wise',
        endpoint: '/drivers',
        all: false,
        date: false,
        dateTo: false,
        week: true,
        month: false,
        year: false,
        title: 'Weekly Sales Report',
        columns: [
          {
            text: 'Name',
            value: 'customer.profile.name'
          },
          { text: 'Total', value: 'details.netTotal' }
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
