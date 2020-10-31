<template>
  <div style="padding: 20px">
    <div
      style="margin-bottom:20px;display: grid;grid-template-columns: calc(20% - 20px) calc(20% - 20px) calc(20% - 20px) calc(20% - 20px) calc(20% - 20px);grid-column-gap: 20px"
    >
      <nuxt-link to="/product" style="text-decoration: none">
        <StatsCard
          title="Products Sold"
          :stat="stats ? stats.productSold + '' : '-'"
          icon="mdi-cart"
        />
      </nuxt-link>
      <nuxt-link to="/customer" style="text-decoration: none">
        <StatsCard
          title="Customers"
          :stat="stats ? stats.customers + '' : '-'"
          icon="mdi-account-multiple"
        />
      </nuxt-link>
      <nuxt-link to="/store" style="text-decoration: none">
        <StatsCard
          title="Suppliers"
          :stat="stats ? stats.suppliers + '' : '-'"
          icon="mdi-store"
        />
      </nuxt-link>
      <nuxt-link to="/driver" style="text-decoration: none">
        <StatsCard
          title="Drivers"
          :stat="stats ? stats.drivers + '' : '-'"
          icon="mdi-account"
        />
      </nuxt-link>
      <nuxt-link to="/order" style="text-decoration: none">
        <StatsCard
          title="Orders"
          :stat="stats ? stats.orders + '' : '-'"
          icon="mdi-clipboard-multiple"
        />
      </nuxt-link>
    </div>
    <div
      style="display: grid;grid-template-columns: calc(50% - 20px) calc(50% - 20px); grid-column-gap: 20px"
    >
      <div>
        <v-card>
          <v-card-title> Pending Orders</v-card-title>
          <div style="width: 100%;padding: 10px">
            <v-text-field
              v-model="searchQueryOrder"
              color="#FF974D"
              dense
              outlined
              label="Search Orders"
              append-icon="mdi-magnify"
              @click:append="searchOrder"
              @keypress.enter="searchOrder"
            >
            </v-text-field>
            <div
              v-if="
                (pendingOrders === null || pendingOrders.length <= 0) &&
                  !loading
              "
              style="text-align: center"
            >
              <p>No Pending Orders Yet!</p>
            </div>
            <div v-if="pendingOrders === null" style="text-align: center">
              <v-progress-circular />
            </div>
            <div
              v-for="(order, i) of pendingOrders"
              :key="i"
              style="margin-bottom: 20px"
            >
              <v-card style="padding: 10px">
                <div
                  style="display: grid;grid-template-columns: calc(20% - 10px) calc(46% - 10px) calc(33% - 10px);grid-column-gap: 10px;"
                >
                  <p>{{ order.orderNo }}</p>
                  <div
                    style="display: grid;grid-template-columns: 10% 90%;grid-column-gap: 10px"
                  >
                    <v-icon
                      style="align-items: start;margin-top: 4px"
                      small
                      color="grey"
                      >mdi-gavel</v-icon
                    >
                    <p>
                      {{ order.service }}
                    </p>
                  </div>
                  <div
                    style="display: grid;grid-template-columns: 10% 90%;grid-column-gap: 10px"
                  >
                    <v-icon
                      style="align-items: start;margin-top: 4px"
                      small
                      color="grey"
                      >mdi-clock-time-four-outline</v-icon
                    >
                    <p v-if="calcAgoDay(order.createdAt) !== 0">
                      {{ calcAgoDay(order.createdAt) + ' Days Ago' }}
                    </p>
                    <p v-else-if="calcAgoHour(order.createdAt) !== 0">
                      {{ calcAgoHour(order.createdAt) + ' Hours Ago' }}
                    </p>
                    <p v-else-if="calcAgoMin(order.createdAt) !== 0">
                      {{ calcAgoMin(order.createdAt) + ' Mins Ago' }}
                    </p>
                    <p v-else-if="calcAgoSec(order.createdAt) !== 0">
                      {{ calcAgoSec(order.createdAt) + ' Secs Ago' }}
                    </p>
                    <p v-else>
                      Just Now
                    </p>
                  </div>
                </div>
                <div
                  style="display: grid;grid-template-columns: calc(25% - 10px) calc(75% - 10px);grid-column-gap: 10px"
                >
                  <div
                    style="display: grid;grid-template-columns: 10% 90%;grid-column-gap: 10px"
                  >
                    <v-icon
                      style="align-items: start;margin-top: 4px"
                      small
                      color="grey"
                      >mdi-account</v-icon
                    >
                    <p>{{ order.customer.profile.name }}</p>
                  </div>
                  <div
                    style="display: grid;grid-template-columns: 10% 90%;grid-column-gap: 10px"
                  >
                    <v-icon
                      style="align-items: start;margin-top: 4px"
                      small
                      color="grey"
                      >mdi-map-marker</v-icon
                    >
                    <p>{{ order.dropoff.dropoffAddress }}</p>
                  </div>
                </div>
                <div
                  style="display: grid;grid-template-columns: 30% 30% 30%;grid-column-gap: 10px"
                >
                  <v-btn
                    color="#FF974D"
                    style="margin-bottom: 10px"
                    dark
                    tile
                    small
                    width="100%"
                    @click="getDetail(order)"
                    >Detail
                  </v-btn>
                  <v-btn
                    color="green"
                    style="margin-bottom: 10px"
                    dark
                    tile
                    small
                    width="100%"
                    @click="getAccepted(order)"
                    >Accept
                  </v-btn>
                  <v-btn
                    color="red"
                    style="margin-bottom: 10px"
                    dark
                    tile
                    small
                    width="100%"
                    @click="getRejected(order)"
                    >Cancel
                  </v-btn>
                </div>
              </v-card>
            </div>
          </div>
        </v-card>
      </div>
      <div>
        <v-card>
          <v-card-title>Pending Requests</v-card-title>
          <div style="width: 100%;padding: 10px">
            <v-text-field
              v-model="searchQueryRequests"
              color="#FF974D"
              dense
              outlined
              label="Search Requests"
              append-icon="mdi-magnify"
              @click:append="searchRequest"
              @keypress.enter="searchRequest"
            >
            </v-text-field>
            <div
              v-if="
                (requests === null || requests.length <= 0) && !loadingRequests
              "
              style="text-align: center"
            >
              <p>No Pending Requests Yet!</p>
            </div>
            <div v-if="requests === null" style="text-align: center">
              <v-progress-circular />
            </div>
            <div
              v-for="(request, i) of requests"
              :key="i"
              style="margin-bottom: 20px"
            >
              <request-card-construction-dumpster
                v-if="request.type === 'Construction Dumpster'"
                :request="request"
                :get-accepted="getAcceptedRequests"
                :get-rejected="getRejectedRequests"
                :get-detail="getDetailRequests"
              />
              <request-card-building-material
                v-if="request.type === 'Building Material'"
                :request="request"
                :get-accepted="getAcceptedRequests"
                :get-rejected="getRejectedRequests"
                :get-detail="getDetailRequests"
              />
            </div>
          </div>
        </v-card>
      </div>
    </div>
    <v-snackbar
      v-model="snackbar"
      bottom
      :color="snackbarColor"
      :timeout="1500"
    >
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script>
import moment from 'moment'
import RequestCardConstructionDumpster from './construction-dumpster'
import RequestCardBuildingMaterial from './building-material'
import StatsCard from './stats-card'
export default {
  name: 'Dashboard',
  components: {
    StatsCard,
    RequestCardBuildingMaterial,
    RequestCardConstructionDumpster
  },
  data: () => ({
    snackbarText: 'Success!',
    snackbarColor: 'green',
    snackbar: false,
    searchQueryOrder: null,
    searchQueryRequests: null,
    loading: true,
    loadingRequests: true,
    pendingOrders: [],
    requests: [],
    stats: null
  }),
  mounted() {
    this.getPendingOrders()
    this.getRequests()
    this.getStats()
  },
  methods: {
    async getStats() {
      this.stats = await this.$axios.$get('dashboard')
    },
    async searchOrder() {
      if (this.searchQueryOrder !== '' && this.searchQueryOrder !== null) {
        this.loading = true
        this.pendingOrders = await this.$axios.$get(
          '/orders/search?name=' + this.searchQueryOrder
        )
      } else {
        this.loading = true
        await this.getPendingOrders()
      }
      this.loading = false
    },
    async searchRequest() {
      if (
        this.searchQueryRequests !== '' &&
        this.searchQueryRequests !== null
      ) {
        this.loading = true
        this.requests = await this.$axios.$get(
          '/service-requests/search?name=' + this.searchQueryRequests
        )
      } else {
        this.loading = true
        await this.getRequests()
      }
      this.loading = false
    },
    async getPendingOrders() {
      this.loading = true
      this.pendingOrders = await this.$axios.$get('orders/getpending')
      this.loading = false
    },
    async getRequests() {
      this.loadingRequests = true
      this.requests = await this.$axios.$get('/service-requests/pending')
      this.loadingRequests = false
    },
    async getAccepted(item) {
      if (confirm('Are you sure?')) {
        await this.$axios.$patch('orders/getactive/' + item._id)
        this.snackbar = true
        this.snackbarColor = 'green'
        this.snackbarText = 'Successfully Accepted Order'
        await this.getPendingOrders()
      }
    },
    async getRejected(item) {
      if (confirm('Are you sure?')) {
        await this.$axios.$patch('orders/getrejected/' + item._id)
        this.snackbar = true
        this.snackbarColor = 'red'
        this.snackbarText = 'Successfully Cancelled Order'
        await this.getPendingOrders()
      }
    },
    getDetail(item) {
      this.$router.push('/order/detail/' + item._id)
    },
    async getAcceptedRequests(item) {
      if (confirm('Are you sure?')) {
        await this.$axios.$patch('/service-requests/completed/' + item._id)
        this.snackbar = true
        this.snackbarColor = 'green'
        this.snackbarText = 'Successfully Completed Request'
        await this.getRequests()
      }
    },
    async getRejectedRequests(item) {
      if (confirm('Are you sure?')) {
        await this.$axios.$patch('service-requests/rejected/' + item._id)
        this.snackbar = true
        this.snackbarColor = 'red'
        this.snackbarText = 'Successfully Rejected Request'
        await this.getRequests()
      }
    },
    getDetailRequests(item) {
      this.$router.push('/request/detail/' + item._id)
    },
    calcAgoDay(time) {
      return moment().diff(time, 'days')
    },
    calcAgoHour(time) {
      return moment().diff(time, 'hour')
    },
    calcAgoMin(time) {
      return moment().diff(time, 'minute')
    },
    calcAgoSec(time) {
      return moment().diff(time, 'second')
    }
  }
}
</script>

<style scoped></style>
