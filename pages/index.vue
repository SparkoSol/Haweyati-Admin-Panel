<template>
  <v-container>
    <h1 style="padding:10px">General Reports</h1>
    <v-row dense>
      <v-col cols="12" md="3" sm="3">
        <v-card>
          <v-card-title>
            <v-icon color="black">mdi-cart</v-icon>
          </v-card-title>
          <v-card-text style="font-size: 30px;color: black">428</v-card-text>
          <v-card-subtitle style="color: #ffa500">
            Products Sold</v-card-subtitle
          >
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card>
          <v-card-title>
            <v-icon color="black">mdi-cart</v-icon>
          </v-card-title>
          <v-card-text style="font-size: 30px;color: black">428</v-card-text>
          <v-card-subtitle style="color: orange">
            Products Sold</v-card-subtitle
          >
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card>
          <v-card-title>
            <v-icon color="black">mdi-cart</v-icon>
          </v-card-title>
          <v-card-text style="font-size: 30px;color: black">428</v-card-text>
          <v-card-subtitle style="color: orange">
            Products Sold</v-card-subtitle
          >
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card>
          <v-card-title>
            <v-icon color="black">mdi-cart</v-icon>
          </v-card-title>
          <v-card-text style="font-size: 30px;color: black">428</v-card-text>
          <v-card-subtitle style="color: orange">
            Products Sold</v-card-subtitle
          >
        </v-card>
      </v-col>
    </v-row>
    <div
      style="display: grid; grid-template-columns: 1fr 1fr; grid-column-gap: 20px;font-size: 13px"
    >
      <div style="padding-top: 60px;">
        <v-card
          style="overflow: auto;height: 600px;padding: 20px"
          class="scrollbar"
        >
          <h2 style="padding:10px">Active Orders</h2>
          <div style="width: calc(100% - 10px);">
            <v-text-field
              color="#FF974D"
              dense
              outlined
              label="Search Orders"
              prepend-inner-icon="mdi-magnify"
            >
            </v-text-field>
          </div>
          <v-card
            v-for="(item, i) in items"
            :key="i"
            style="width: calc(100% - 10px); padding: 10px;margin-bottom: 20px"
            height="150px"
          >
            <v-row style="display: inline">
              <span style="margin-right: 80px;margin-left: 15px">
                {{ item.orderid }}
              </span>
              <v-icon style="margin-right: 80px;" color="black" class="mr-1">
                {{ item.store_icon }}</v-icon
              >
              <span>{{ item.store }}</span>
              <v-icon style="margin-left: 80px">{{ item.time_icon }}</v-icon>
              <span>{{ item.time }}</span>
            </v-row>
            <v-row style="padding-bottom: 15px;padding-top: 15px">
              <v-icon style="margin-left: 15px" color="blue">{{
                item.user_icon
              }}</v-icon>
              <span>{{ item.user }}</span>
              <v-icon style="margin-left: 60px" color="red">{{
                item.address_icon
              }}</v-icon>
              <span>{{ item.address }}</span>
            </v-row>
            <v-card-actions>
              <v-btn small>Details</v-btn>
              <v-btn small style="margin-left: 25px" color="#FF974D" dark
                >Pending</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn small color="red" dark>Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-card>
      </div>
      <div style="padding-top: 60px">
        <v-card
          style="overflow: auto;height: 600px;padding: 20px"
          class="scrollbar"
        >
          <h2 style="padding:10px">Product Approval</h2>
          <div style="width: calc(100% - 10px)">
            <v-text-field
              color="#FF974D"
              dense
              outlined
              label="Search Approvals"
              prepend-inner-icon="mdi-magnify"
            >
            </v-text-field>
          </div>
          <v-card
            v-for="(item, i) in items"
            :key="i"
            style="width: calc(100% - 10px); padding: 10px;margin-bottom: 20px"
            height="150px"
          >
            <v-row>
              <span style="margin-right: 60px;margin-left: 15px">
                {{ item.orderid }}
              </span>
              <v-icon style="margin-right: 20px" class="mr-1" color="black">
                {{ item.store_icon }}</v-icon
              >
              <span>{{ item.store }}</span>
              <v-icon style="margin-left: 20px">{{ item.time_icon }}</v-icon>
              <span>{{ item.time }}</span>
            </v-row>
            <v-row style="padding-bottom: 15px;padding-top: 15px">
              <v-icon style="margin-left: 15px" color="blue">{{
                item.user_icon
              }}</v-icon>
              <span>{{ item.user }}</span>
              <v-icon style="margin-left: 60px" color="red">{{
                item.address_icon
              }}</v-icon>
              <span>{{ item.address }}</span>
            </v-row>
            <v-card-actions>
              <v-btn small>Details</v-btn>
              <v-btn small style="margin-left: 25px" color="#FF974D" dark
                >Pending</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn small color="red" dark>Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          orderid: 'M-3917',
          store: 'Al Kabi Store',
          store_icon: 'mdi-domain',
          time: '15 minutes ago',
          time_icon: 'mdi-clock',
          user: 'Osama Rehman',
          user_icon: 'mdi-account',
          address: 'Address',
          address_icon: 'mdi-crosshairs-gps'
        },
        {
          orderid: 'M-3917',
          store: 'Al Kabi Store',
          store_icon: 'mdi-domain',
          time: '15 minutes ago',
          time_icon: 'mdi-clock',
          user: 'Osama Rehman',
          user_icon: 'mdi-account',
          address: 'Address',
          address_icon: 'mdi-crosshairs-gps'
        },
        {
          orderid: 'M-3917',
          store: 'Al Kabi Store',
          store_icon: 'mdi-domain',
          time: '15 minutes ago',
          time_icon: 'mdi-clock',
          user: 'Osama Rehman',
          user_icon: 'mdi-account',
          address: 'Address',
          address_icon: 'mdi-crosshairs-gps'
        },
        {
          orderid: 'M-3917',
          store: 'Al Kabi Store',
          store_icon: 'mdi-domain',
          time: '15 minutes ago',
          time_icon: 'mdi-clock',
          user: 'Osama Rehman',
          user_icon: 'mdi-account',
          address: 'Address',
          address_icon: 'mdi-crosshairs-gps'
        },
        {
          orderid: 'M-3917',
          store: 'Al Kabi Store',
          store_icon: 'mdi-domain',
          time: '15 minutes ago',
          time_icon: 'mdi-clock',
          user: 'Osama Rehman',
          user_icon: 'mdi-account',
          address: 'Address',
          address_icon: 'mdi-crosshairs-gps'
        },
        {
          orderid: 'M-3917',
          store: 'Al Kabi Store',
          store_icon: 'mdi-domain',
          time: '15 minutes ago',
          time_icon: 'mdi-clock',
          user: 'Osama Rehman',
          user_icon: 'mdi-account',
          address: 'Address',
          address_icon: 'mdi-crosshairs-gps'
        },
        {
          orderid: 'M-3917',
          store: 'Al Kabi Store',
          store_icon: 'mdi-domain',
          time: '15 minutes ago',
          time_icon: 'mdi-clock',
          user: 'Osama Rehman',
          user_icon: 'mdi-account',
          address: 'Address',
          address_icon: 'mdi-crosshairs-gps'
        }
      ]
    }
  }
}
</script>

<style scoped></style>
