<template>
  <v-container>
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
      <v-col cols="12" md="9" sm="9">
        <v-card-title>{{ request.type }}</v-card-title>
      </v-col>
    </v-row>
    <v-container>
      <v-card style="padding: 20px">
        <v-card-title>Product Information</v-card-title>
        <v-text-field
          v-model="request.data.size"
          color="#313F53"
          outlined
          style="color: #313F53"
          readonly
          label="Size"
          dense
        ></v-text-field>
        <v-textarea
          v-model="request.data.description"
          color="#313F53"
          outlined
          style="color: #313F53"
          readonly
          label="Description"
          dense
        ></v-textarea>
      </v-card>
    </v-container>
    <v-container>
      <v-card style="padding: 20px">
        <v-card-title>Product Pricing</v-card-title>
        <v-data-table
          hide-default-footer
          :headers="columnsPrice"
          :items="request.data.pricing"
          fixed-header
        >
        </v-data-table>
      </v-card>
    </v-container>
    <v-container>
      <v-card style="padding: 20px">
        <v-card-title>Supplier</v-card-title>
        <v-text-field
          v-model="request.suppliers.name"
          color="#313F53"
          outlined
          style="color: #313F53"
          readonly
          label="Name"
          dense
        ></v-text-field>
        <v-text-field
          v-model="request.suppliers.email"
          color="#313F53"
          outlined
          style="color: #313F53"
          readonly
          label="Email"
          dense
        ></v-text-field>
        <v-text-field
          v-model="request.suppliers.contact"
          color="#313F53"
          outlined
          style="color: #313F53"
          readonly
          label="Contact"
          dense
        ></v-text-field>
        <v-text-field
          v-model="request.suppliers.address"
          color="#313F53"
          outlined
          style="color: #313F53"
          readonly
          label="Address"
          dense
        ></v-text-field>
        <v-text-field
          v-model="request.suppliers.city"
          color="#313F53"
          outlined
          style="color: #313F53"
          readonly
          label="City"
          dense
        ></v-text-field>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'RequestDetailConstructionDumpster',
  props: {
    request: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    columnsPrice: [
      { text: 'City', value: 'city' },
      { text: 'Rent', value: 'rent' },
      { text: 'Days', value: 'days' },
      { text: 'Extra Days Rent', value: 'extraDayRent' },
      { text: 'Helper Price', value: 'helperPrice' }
    ]
  }),
  methods: {
    returnBack() {
      this.$router.back()
    }
  }
}
</script>

<style scoped></style>
