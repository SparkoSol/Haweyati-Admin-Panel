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
          v-if="item.tab === 'Orders'"
          :title="customer.profile.name + '\'s ' + title"
          :columns="columns"
          :endpoint="endpoint + customer._id"
          back
          detail
          detail-route="/order/detail/$id"
        />
        <v-container v-if="item.tab === 'Detail'">
          <v-card style="padding: 20px;margin-bottom: 30px">
            <v-row>
              <v-col
                style="display: flex ; align-items: center; justify-content: center"
                cols="12"
                md="1"
                sm="1"
              >
                <v-btn icon @click="returnBack">
                  <v-icon>mdi-keyboard-backspace</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="12" md="7" sm="7">
                <v-card-title>Customer Detail</v-card-title>
              </v-col>
              <v-col
                cols="12"
                md="4"
                sm="4"
                style="display: flex ; align-items: center; justify-content: flex-end;"
              >
                <v-btn
                  color="primary"
                  elevation="0"
                  style="border-radius: 4px;"
                  @click="handleEditEvent"
                >
                  <v-icon small>mdi-pencil</v-icon>

                  <span>Edit</span>
                </v-btn>
              </v-col>
            </v-row>
            <imageViewer :image="customer.profile.image" />
            <v-text-field
              style="align-items: center !important;"
              outlined
              label="Customer Name"
              readonly
              :value="customer.profile.name"
              dense
            ></v-text-field>
            <v-text-field
              v-if="customer.profile.email"
              style="align-items: center !important;"
              outlined
              label="Customer Email"
              readonly
              :value="customer.profile.email"
              dense
            ></v-text-field>
            <v-text-field
              style="align-items: center !important;"
              outlined
              label="Customer Contact"
              readonly
              :value="customer.profile.contact"
              dense
            ></v-text-field>
            <v-text-field
              style="align-items: center !important;"
              outlined
              label="Customer Address"
              readonly
              :value="customer.location.address"
              dense
            ></v-text-field>
            <v-text-field
              style="align-items: center !important;"
              outlined
              label="Customer Status"
              readonly
              :value="customer.status"
              dense
            ></v-text-field>
            <v-text-field
              v-if="customer.status === 'Blocked'"
              :value="customer.message"
              dense
              label="Reason"
              outlined
              readonly
              style="align-items: center !important;"
            ></v-text-field>
            <div>
              <GoogleMap :old-marker="customer.location" :click="false" />
            </div>
          </v-card>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import DataViewer from '../../common/ui/widgets/DataViewer'
import GoogleMap from '../../components/misc/GoogleMap'
import imageViewer from '../../components/misc/image-viewer'

export default {
  name: 'CustomerDetail',
  components: {
    DataViewer,
    GoogleMap,
    imageViewer
  },
  props: {
    customer: {
      type: Object,
      default: null
    },
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
    tab: null,
    tabs: [
      {
        tab: 'Detail'
      },
      {
        tab: 'Orders'
      }
    ],
    columns: [
      { text: 'Service', value: 'service' },
      { text: 'Payment Type', value: 'paymentType' },
      { text: 'Total', value: 'total' },
      { text: 'Date', value: 'createdAt' },
      { text: 'Status', value: 'status' }
    ]
  }),
  methods: {
    returnBack() {
      this.$router.back()
    },
    handleEditEvent() {
      this.$router.push('/customer/edit/' + this.customer._id)
    }
  }
}
</script>

<style scoped></style>
