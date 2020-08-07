<template>
  <div style="padding: 20px">
    <div
      style="margin-bottom:20px;display: grid;grid-template-columns: calc(20% - 20px) calc(20% - 20px) calc(20% - 20px) calc(20% - 20px) calc(20% - 20px);grid-column-gap: 20px"
    >
      <v-card>
        <v-card-title>
          <v-icon color="black">mdi-cart</v-icon>
        </v-card-title>
        <v-card-text style="font-size: 30px;color: black">428</v-card-text>
        <v-card-subtitle style="color: orange"> Products Sold</v-card-subtitle>
      </v-card>
      <v-card>
        <v-card-title>
          <v-icon color="black">mdi-cart</v-icon>
        </v-card-title>
        <v-card-text style="font-size: 30px;color: black">428</v-card-text>
        <v-card-subtitle style="color: orange"> Products Sold</v-card-subtitle>
      </v-card>
      <v-card>
        <v-card-title>
          <v-icon color="black">mdi-cart</v-icon>
        </v-card-title>
        <v-card-text style="font-size: 30px;color: black">428</v-card-text>
        <v-card-subtitle style="color: orange"> Products Sold</v-card-subtitle>
      </v-card>
      <v-card>
        <v-card-title>
          <v-icon color="black">mdi-cart</v-icon>
        </v-card-title>
        <v-card-text style="font-size: 30px;color: black">428</v-card-text>
        <v-card-subtitle style="color: orange"> Products Sold</v-card-subtitle>
      </v-card>
      <v-card>
        <v-card-title>
          <v-icon color="black">mdi-cart</v-icon>
        </v-card-title>
        <v-card-text style="font-size: 30px;color: black">428</v-card-text>
        <v-card-subtitle style="color: orange"> Products Sold</v-card-subtitle>
      </v-card>
    </div>
    <div
      style="display: grid;grid-template-columns: calc(50% - 20px) calc(50% - 20px); grid-column-gap: 20px"
    >
      <div>
        <v-card>
          <v-card-title> Pending Orders </v-card-title>
          <div style="width: 100%;padding: 10px">
            <v-text-field
              color="#FF974D"
              dense
              outlined
              label="Search Orders"
              prepend-inner-icon="mdi-magnify"
            >
            </v-text-field>
            <div
              v-if="pendingOrders !== null || pendingOrders.length > 0"
              style="text-align: center"
            >
              <p>No Pending Orders Yet!</p>
            </div>
            <div
              v-for="(order, i) of pendingOrders"
              :key="i"
              style="margin-bottom: 20px"
            >
              <v-card style="padding: 10px">
                <div
                  style="display: grid;grid-template-columns: 33% 33% 33%;grid-column-gap: 10px;"
                >
                  <p>Order#</p>
                  <p>{{ order.service }}</p>
                  <p>{{ calcAgo(order.createdAt) + ' Days Ago' }}</p>
                </div>
                <div
                  style="display: grid;grid-template-columns: 30% 70%;grid-column-gap: 10px"
                >
                  <p>{{ order.customer.profile.name }}</p>
                  <p>{{ order.dropoff.dropoffAddress }}</p>
                </div>
                <div
                  style="display: grid;grid-template-columns: 30% 30%;grid-column-gap: 10px"
                >
                  <v-btn
                    color="#FF974D"
                    style="margin-bottom: 10px"
                    dark
                    tile
                    small
                    width="100%"
                    >Detail
                  </v-btn>
                  <v-btn
                    color="red"
                    style="margin-bottom: 10px"
                    dark
                    tile
                    small
                    width="100%"
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
          <v-card-title> Pending Requests </v-card-title>
          <div style="width: 100%;padding: 10px">
            <v-text-field
              color="#FF974D"
              dense
              outlined
              label="Search Requests"
              prepend-inner-icon="mdi-magnify"
            >
            </v-text-field>
            <div
              v-if="requests !== null || requests.length > 0"
              style="text-align: center"
            >
              <p>No Pending Requests Yet!</p>
            </div>
            <div
              v-for="(order, i) of pendingOrders"
              :key="i"
              style="margin-bottom: 20px"
            >
              <v-card style="padding: 10px">
                <div
                  style="display: grid;grid-template-columns: 33% 33% 33%;grid-column-gap: 10px;"
                >
                  <p>Order#</p>
                  <p>{{ order.service }}</p>
                  <p>Time Ago</p>
                </div>
                <div
                  style="display: grid;grid-template-columns: 30% 70%;grid-column-gap: 10px"
                >
                  <p>{{ order.customer.profile.name }}</p>
                  <p>{{ order.dropoff.dropoffAddress }}</p>
                </div>
                <div
                  style="display: grid;grid-template-columns: 30% 30%;grid-column-gap: 10px"
                >
                  <v-btn
                    color="#FF974D"
                    style="margin-bottom: 10px"
                    dark
                    tile
                    small
                    width="100%"
                    >Detail
                  </v-btn>
                  <v-btn
                    color="red"
                    style="margin-bottom: 10px"
                    dark
                    tile
                    small
                    width="100%"
                    >Cancel
                  </v-btn>
                </div>
              </v-card>
            </div>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Dashboard',
  data: () => ({
    loading: true,
    pendingOrders: [],
    requests: []
  }),
  mounted() {
    this.getPendingOrders()
    this.getRequests()
  },
  methods: {
    async getPendingOrders() {
      this.pendingOrders = await this.$axios.$get('orders/getpending')
    },
    async getRequests() {
      this.requests = await this.$axios.$get('/service-requests/pending')
    },
    calcAgo(time) {
      return moment().diff(time, 'days')
    }
  }
}
</script>

<style scoped></style>
