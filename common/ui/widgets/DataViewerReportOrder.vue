<template>
  <v-card class="data-viewer" elevation="8">
    <v-card-title class="data-viewer__title">
      <span>{{ title }}</span>
      <v-spacer />
      <v-btn
        elevation="0"
        color="#FF974D"
        style="padding: 0 13px 0 7px !important; border-radius: 4px; margin-right: 10px"
        @click="dialog = true"
      >
        <v-icon small color="white">mdi-filter</v-icon>
        <span style="margin-left: 10px;color:white">Filter</span>
      </v-btn>
      <v-btn
        v-if="data !== null && data.length !== 0"
        color="#FF974D"
        elevation="0"
        style="padding: 0 13px 0 7px !important; border-radius: 4px; margin-right: 10px"
        @click="generatePDF"
      >
        <v-icon small color="white">mdi-printer-eye</v-icon>
        <span style="margin-left: 10px;color:white">Print</span>
      </v-btn>
    </v-card-title>
    <v-data-table
      :headers="columns"
      :items="data"
      :dense="dense"
      disable-pagination
      hide-default-footer
      height="500"
      fixed-header
      class="data-table__content"
    >
      <template v-slot:item.createdAt="{ item }">
        <slot name="createdAt" :item="item" />
        {{ dateFormat(item.createdAt) }}
      </template>
      <template v-slot:item.status="{ item }">
        <slot name="status" :item="item" />
        <p style="margin: 0">
          {{
            getStatus(item.status) !== '' ? getStatus(item.status) : item.status
          }}
        </p>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" width="50%">
      <v-card>
        <v-card-title>Filter Sales</v-card-title>
        <v-container style="padding: 20px;">
          <v-form ref="form">
            <v-radio-group v-model="report.payment" style="display: inline">
              <v-radio
                v-for="(n, i) in payment"
                :key="i"
                :label="n"
                :value="i"
              ></v-radio>
            </v-radio-group>
            <v-autocomplete
              v-model="report.customer"
              :items="customers"
              item-text="profile.contact"
              item-value="_id"
              placeholder="Customer"
              dense
              outlined
            ></v-autocomplete>
            <v-autocomplete
              v-model="report.driver"
              :items="drivers"
              item-text="profile.contact"
              item-value="_id"
              placeholder="Driver"
              dense
              outlined
            ></v-autocomplete>
            <v-autocomplete
              v-model="report.supplier"
              :items="suppliers"
              item-text="person.contact"
              item-value="_id"
              placeholder="Supplier"
              dense
              outlined
            ></v-autocomplete>
            <v-text-field
              v-if="this.tab === 'Daily' || this.tab === 'Custom'"
              v-model="report.date"
              style="margin-right: 10px"
              :rules="[required]"
              type="date"
              dense
              outlined
            />
            <v-text-field
              v-if="this.tab === 'Custom'"
              v-model="report.dateTo"
              style="margin-right: 10px"
              :rules="[required]"
              type="date"
              dense
              outlined
            />
            <v-text-field
              v-if="this.tab === 'Monthly'"
              v-model="report.month"
              style="margin-right: 10px"
              :rules="[required]"
              type="month"
              dense
              outlined
            />
            <v-text-field
              v-if="this.tab === 'Weekly'"
              v-model="report.week"
              style="margin-right: 10px"
              :rules="[required]"
              type="week"
              dense
              outlined
            />
            <v-text-field
              v-if="this.tab === 'Yearly'"
              v-model="report.year"
              style="margin-right: 10px"
              type="number"
              :rules="[yearValidator, required]"
              dense
              outlined
            />
            <div style="display: flex;justify-content: flex-end">
              <v-btn
                color="primary"
                elevation="0"
                style="padding: 0 13px 0 7px !important; border-radius: 4px; margin-right: 10px;text-align: right"
                height="40"
                @click="generateSale"
              >
                <span>Generate</span>
              </v-btn>
              <v-btn
                color="red"
                elevation="0"
                style="padding: 0 13px 0 7px !important; border-radius: 4px; margin-right: 10px;text-align: right;color:white"
                height="40"
                @click="clearFilter"
              >
                <span>Clear</span>
              </v-btn>
            </div>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import moment from 'moment'
import { yearValidator, required } from '../../utils/validators'
import { Report } from '@/models/report'
export default {
  name: 'DataViewerReportOrder',
  props: {
    title: {
      type: String,
      required: true
    },
    dense: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      required: true
    },
    back: {
      type: Boolean,
      default: false
    },
    tab: {
      type: String,
      required: true
    },
    endpoint: {
      type: String,
      required: true
    },
    report: {
      type: Report,
      default: new Report()
    }
  },
  data: () => ({
    data: [],
    dialog: false,
    customers: [],
    drivers: [],
    suppliers: [],
    payment: ['All', 'Cash on Delivery', 'Online Payment']
  }),
  mounted() {
    this.getFilters()
    this.getReport()
  },
  methods: {
    yearValidator,
    required,
    getStatus(i) {
      switch (i) {
        case 0:
          return 'Pending'
        case 1:
          return 'Accepted'
        case 2:
          return 'Preparing'
        case 3:
          return 'Dispatched'
        case 4:
          return 'Delivered'
        case 5:
          return 'Rejected'
        case 6:
          return 'Cancelled'
        default:
          return ''
      }
    },
    returnBack() {
      this.$router.back()
    },
    async getFilters() {
      this.customers = await this.$axios.$get('/customers/getall')
      this.drivers = await this.$axios.$get('/drivers')
      this.suppliers = await this.$axios.$get('/suppliers')
    },
    dateFormat: (date) => moment(date).format('yyyy-MM-DD'),
    clearFilter() {
      this.report = new Report()
      this.getReport()
      this.dialog = false
    },
    generateSale() {
      if (this.$refs.form.validate()) {
        this.getReport()
        this.dialog = false
      } else {
        window.console.log('error')
      }
    },
    getData() {
      const value = {}
      for (const item in this.report) {
        if (this.report[item]) value[item] = this.report[item]
      }
      console.log(value)
      return value
    },
    async getReport() {
      const value = this.getData()
      this.data = await this.$axios.$get('/reports/orders', {
        params: value
      })
    },
    generatePDF() {
      let param = '?'
      const value = this.getData()
      for (const item in value) {
        console.log(item)
        if (value[item]) param += item + '=' + value[item] + '&'
      }
      console.log(param)
      const win = window.open(
        this.$axios.defaults.baseURL + 'reports/orders-report' + param,
        '_blank'
      )
      win.focus()
      win.print()
    }
  }
}
</script>

<style lang="sass">
.date-picker
    padding-right: 10px
.data-viewer
  width: 100% !important
.theme--light.v-data-table tbody tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper)
  background: #fff !important
</style>
