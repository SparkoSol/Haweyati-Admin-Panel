<template>
  <div>
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
          :refund="item.refund"
          :change="item.change"
          :on-block="onBlock"
          :on-unblock="onUnblocked"
          :on-accepted="onAccepted"
          :on-rejected="onRejected"
          :on-refund="onRefund"
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
    <v-dialog v-model="dialog" width="70%">
      <v-card class="refund-card-padding">
        <div v-if="order" class="refund-detail-div">
          <div>
            <div>
              <v-card class="card-margin">
                <v-card-title>Refund Items</v-card-title>
                <div
                  v-for="(item, i) of order.items"
                  :key="i"
                  class="refund-items"
                >
                  <v-avatar>
                    <img
                      alt="logo"
                      :src="
                        $axios.defaults.baseURL +
                          'uploads/' +
                          item.item.product.image.name
                      "
                  /></v-avatar>
                  <div>
                    <p style="margin: 0">{{ item.item.product.size }}</p>
                    <p style="margin: 0">
                      {{ item.item.product.name }}
                    </p>
                  </div>
                  <p style="text-align: right">{{ item.item.qty }}</p>
                  <p style="text-align: right">SR {{ item.subtotal }}</p>
                </div>
              </v-card>
            </div>
            <div>
              <v-card class="card-margin">
                <v-card-title>Refund shipping</v-card-title>
                <p style="padding: 0 16px">Shipping Fee: (Delivery Fee Here)</p>
                <p style="padding: 0 0 0 16px">Refund Amount:</p>
                <v-text-field
                  dense
                  outlined
                  style="width: 30%;padding: 0 16px"
                  :rules="[rentHelper]"
                  prepend-inner-icon="mdi-currency-usd"
                  type="number"
                ></v-text-field>
              </v-card>
            </div>
            <div>
              <v-card class="card-margin">
                <v-card-title>Reason for refund</v-card-title>
                <v-text-field
                  dense
                  outlined
                  style="width: 100%;padding: 0 16px"
                  hint="Only You and Staff Member can see this"
                  persistent-hint
                ></v-text-field>
              </v-card>
            </div>
          </div>
          <div>
            <div>
              <v-card class="card-margin summary-card">
                <v-card-title>Summary</v-card-title>
                <div style="padding: 0 16px; display: flex">
                  <p>Items subtotal</p>
                  <v-spacer />
                  <p>SR {{ order.total }}</p>
                </div>
                <div style="padding: 0 16px; display: flex">
                  <p>Tax</p>
                  <v-spacer />
                  <p>SR 0.0</p>
                </div>
                <div style="padding: 0 16px; display: flex">
                  <p>Shipping</p>
                  <v-spacer />
                  <p>SR 0.0</p>
                </div>
                <div style="padding: 0 16px; display: flex">
                  <p><strong>Refund Total</strong></p>
                  <v-spacer />
                  <p>
                    <strong>SR {{ order.total }}</strong>
                  </p>
                </div>
                <v-divider style="margin: 2px 0" />
                <p style="padding: 16px 16px 0 16px">
                  <strong>Refund Amount</strong>
                </p>
                <v-text-field
                  dense
                  outlined
                  style="padding: 0 16px"
                  type="number"
                  :rules="[rentHelper]"
                  prepend-inner-icon="mdi-currency-usd"
                ></v-text-field>
                <v-divider style="margin: 2px 0" />
                <v-btn
                  width="80%"
                  color="#FF974D"
                  style="color:#ffffff;margin: 60px 10%;"
                  elevation="0"
                  large
                >
                  Refund
                </v-btn>
              </v-card>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DataViewer from '../../common/ui/widgets/DataViewer'
import { price, rentHelper } from '@/common/lib/validator'

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
    dialog: false,
    order: null,
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
        refund: true,
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
        refund: true,
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
        refund: true,
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
    price,
    rentHelper,
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
    },
    onRefund(item) {
      console.log('we in on refund')
      this.dialog = true
      this.order = item
    }
  }
}
</script>

<style scoped>
.refund-card-padding {
  padding: 15px;
}
.card-margin {
  margin: 20px 3px;
}
.refund-detail-div {
  display: grid;
  grid-template-columns: calc(65% - 10px) calc(35% - 10px);
  grid-column-gap: 10px;
}
.refund-items {
  display: grid;
  grid-template-columns: 10% 40% 25% 25%;
  padding: 16px;
  align-items: center;
}
.summary-card {
  height: 100%;
}
</style>
