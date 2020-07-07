<template>
  <v-container>
    <v-tabs v-model="tab" background-color="#313F53" color="white" dark>
      <v-tab v-for="item in tabs" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabs" :key="item.tab">
        <v-row style="display: flex;justify-content: right;align-items: center">
          <v-col cols="12" md="8" sm="8"></v-col>
          <v-col cols="12" md="4" sm="4">
            <v-text-field
              outlined
              color="#FF974D"
              hide-details
              dense
              label="Search..."
              append-icon="mdi-magnify"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <div
          v-if="item.blocked === false && customers.length <= 0"
          style="display: flex;justify-content: center;align-items: center;"
        >
          <h3>No Data Found</h3>
        </div>
        <div
          v-if="item.blocked === false && customers.length > 0"
          style="display: grid; grid-template-columns: 50% 50%; grid-column-gap: 20px"
        >
          <v-card
            v-for="(customer, i) in customers"
            :key="i"
            style="padding: 10px;"
          >
            <v-row
              style="display: grid;grid-template-columns: 15% 65% 20%; padding: 20px;"
            >
              <div>
                <v-avatar size="60" color="white">
                  <img
                    :src="
                      $axios.defaults.baseURL +
                        'uploads/' +
                        customer.profile.image.name
                    "
                  />
                </v-avatar>
              </div>
              <div>
                <h3>{{ customer.profile.name }}</h3>
                <p>{{ customer.profile.email }}</p>
                <h5 style="color: grey">{{ customer.profile.contact }}</h5>
              </div>
              <div>
                <v-btn
                  color="#FF974D"
                  dark
                  tile
                  small
                  width="100%"
                  style="margin-bottom: 10px"
                  >Message
                </v-btn>
                <v-btn
                  color="red"
                  dark
                  tile
                  small
                  width="100%"
                  @click="blockItem(customer)"
                  >Block
                </v-btn>
              </div>
            </v-row>
          </v-card>
        </div>
        <div
          v-if="item.blocked === true && blockedCustomers.length <= 0"
          style="display: flex;justify-content: center;align-items: center;"
        >
          <h3>No Data Found</h3>
        </div>
        <div
          v-if="item.blocked === true && blockedCustomers.length > 0"
          style="display: grid; grid-template-columns: 50% 50%; grid-column-gap: 20px"
        >
          <v-card
            v-for="(customer, i) in blockedCustomers"
            :key="i"
            style="padding: 10px;"
          >
            <v-row
              style="display: grid;grid-template-columns: 15% 65% 20%; padding: 20px;"
            >
              <div>
                <v-avatar size="60" color="white">
                  <img
                    :src="
                      $axios.defaults.baseURL +
                        'uploads/' +
                        customer.profile.image.name
                    "
                  />
                </v-avatar>
              </div>
              <div>
                <h3>{{ customer.profile.name }}</h3>
                <p>{{ customer.profile.email }}</p>
                <h5 style="color: grey">{{ customer.profile.contact }}</h5>
              </div>
              <div>
                <v-btn
                  color="#FF974D"
                  dark
                  tile
                  small
                  width="100%"
                  style="margin-bottom: 10px"
                  >Message
                </v-btn>
                <v-btn
                  color="green"
                  dark
                  tile
                  small
                  width="100%"
                  @click="unblockItem(customer)"
                  >Unblock
                </v-btn>
              </div>
            </v-row>
          </v-card>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
export default {
  name: 'CustomerMain',
  data: () => ({
    customers: [],
    blockedCustomers: [],
    tabs: [
      {
        tab: 'Active',
        title: 'Active Customers',
        blocked: false
      },
      {
        tab: 'Blocked',
        title: 'Blocked Customers',
        blocked: true
      }
    ],
    tab: null
  }),
  mounted() {
    this.getCustomers()
    this.getBlockedCustomers()
  },
  methods: {
    async getCustomers() {
      this.customers = await this.$axios.$get('customers')
    },
    async getBlockedCustomers() {
      this.blockedCustomers = await this.$axios.$get('customers/getblocked')
    },
    onBlock() {
      this.snackbarColor = 'red'
      this.snackbarText = 'Successfully Blocked Driver!'
      this.snackbar = true
    },
    onUnblocked() {
      this.snackbarColor = 'green'
      this.snackbarText = 'Successfully Unblocked Driver!'
      this.snackbar = true
    },
    async blockItem(item) {
      window.console.log(item)
      if (confirm('Are you sure?')) {
        await this.$axios.$patch('/customers/getblocked/' + item._id)
        this.getCustomers()
        this.getBlockedCustomers()
      }
    },
    async unblockItem(item) {
      window.console.log(item)
      if (confirm('Are you sure?')) {
        await this.$axios.$patch('/customers/getunblocked/' + item._id)
        this.getCustomers()
        this.getBlockedCustomers()
      }
    }
  }
}
</script>

<style scoped></style>
