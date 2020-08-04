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
        <div v-if="!item.blocked">
          <div
            v-if="customers === null && customers.length <= 0 && !loading"
            style="display: flex;justify-content: center;align-items: center;"
          >
            <h3>No Data Found</h3>
          </div>
          <div
            v-if="customers !== null && customers.length > 0"
            style="display: grid; grid-template-columns: 50% 50%; grid-column-gap: 20px"
          >
            <v-card
              v-for="(customer, i) in customers"
              :key="i"
              style="padding: 10px;"
            >
              <v-row
                style="display: grid;grid-template-columns: 20% 60% 20%; padding: 20px;"
              >
                <div>
                  <v-avatar size="80" color="white">
                    <img
                      v-if="customer.profile.image"
                      :src="
                        $axios.defaults.baseURL +
                          'uploads/' +
                          customer.profile.image.name
                      "
                    />
                    <img
                      v-else
                      src="../../assets/images/placeholders/placeholder_person.jpg"
                    />
                  </v-avatar>
                </div>
                <div style="padding-left: 10px">
                  <h3>{{ customer.profile.name }}</h3>
                  <p>{{ customer.profile.email }}</p>
                  <h5 style="color: grey">{{ customer.profile.contact }}</h5>
                </div>
                <div>
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
        </div>
        <div v-if="item.blocked">
          <div
            v-if="
              (blockedCustomers === null || blockedCustomers.length <= 0) &&
                !loading
            "
            style="display: flex;justify-content: center;align-items: center;"
          >
            <h3>No Data Found</h3>
          </div>
          <div
            v-if="blockedCustomers !== null && blockedCustomers.length > 0"
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
                  <v-avatar size="80" color="white">
                    <img
                      v-if="customer.profile.image"
                      :src="
                        $axios.defaults.baseURL +
                          'uploads/' +
                          customer.profile.image.name
                      "
                    />
                    <img
                      v-else
                      src="../../assets/images/placeholders/placeholder_person.jpg"
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
        </div>
        <div
          v-if="
            blockedCustomers === null &&
              customers === null &&
              blockedCustomers.length <= 0 &&
              customers.length <= 0 &&
              loading
          "
          style="display: flex;justify-content: center;align-items: center;height: 400px"
        >
          <v-progress-circular indeterminate color="primary" />
        </div>
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
  </v-container>
</template>

<script>
export default {
  name: 'CustomerMain',
  data: () => ({
    snackbarText: 'Success!',
    snackbarColor: 'green',
    snackbar: false,
    loading: true,
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
    window.console.log(this.loading)
    this.loading = false
    window.console.log(this.loading)
  },
  methods: {
    async getCustomers() {
      window.console.log(await this.$axios.$get('customers'))
      this.customers = await this.$axios.$get('customers')
    },
    async getBlockedCustomers() {
      this.blockedCustomers = await this.$axios.$get('customers/getblocked')
    },
    onBlock() {
      this.snackbarColor = 'red'
      this.snackbarText = 'Successfully Blocked Customer!'
      this.snackbar = true
    },
    onUnblocked() {
      this.snackbarColor = 'green'
      this.snackbarText = 'Successfully Unblocked Customer!'
      this.snackbar = true
    },
    async blockItem(item) {
      const result = prompt(
        'Please provide reason for blocking!',
        'Going against our policy!'
      )
      if (result != null && result !== '') {
        this.loading = true
        await this.$axios.$patch('/customers/getblocked/' + item._id, {
          message: result
        })
        await this.getCustomers()
        await this.getBlockedCustomers()
        this.loading = false
        if (this.onBlock() != null) {
          this.onBlock()
        }
      } else if (result === '') {
        this.loading = true
        await this.$axios.$patch('/customers/getblocked/' + item._id)
        await this.getCustomers()
        await this.getBlockedCustomers()
        this.loading = false
        if (this.onBlock() != null) {
          this.onBlock()
        }
      }
      window.console.log(item)
    },
    async unblockItem(item) {
      window.console.log(item)
      if (confirm('Are you sure?')) {
        this.loading = true
        await this.$axios.$patch('/customers/getunblocked/' + item._id)
        await this.getCustomers()
        await this.getBlockedCustomers()
        this.loading = false
        this.onUnblocked()
      }
    }
  }
}
</script>

<style scoped></style>
