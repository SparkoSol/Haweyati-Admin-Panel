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
      <v-col cols="12" md="11" sm="11">
        <v-card-title>{{ constructionDumpster.size }}</v-card-title>
      </v-col>
    </v-row>
    <v-container>
      <v-card>
        <v-card-title>Pricing</v-card-title>
        <v-data-table
          hide-default-footer
          :headers="columnsPrice"
          :items="constructionDumpster.pricing"
          fixed-header
        >
        </v-data-table>
      </v-card>
    </v-container>
    <v-container>
      <v-card>
        <v-card-title>Stores</v-card-title>
        <v-data-table
          hide-default-footer
          :headers="columnsStore"
          :items="constructionDumpster.suppliers"
          fixed-header
        />
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import { ConstructionDumpster } from '../../../models/products/construction-dumpsters'

export default {
  name: 'DumpsterDetail',
  props: {
    constructionDumpster: {
      type: [Object, ConstructionDumpster],
      default: () => new ConstructionDumpster()
    }
  },
  data: () => ({
    columnsPrice: [
      { text: 'City', value: 'city' },
      { text: 'Rent', value: 'rent' },
      { text: 'Days', value: 'days' },
      { text: 'Extra Days Rent', value: 'extraDayRent' }
    ],
    columnsStore: [
      { text: 'Image', value: 'profilePic' },
      { text: 'Name', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Contact', value: 'contact' },
      { text: 'Address', value: 'address' },
      { text: 'Services', value: 'services' }
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
