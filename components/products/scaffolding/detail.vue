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
        <v-card-title>{{ scaffolding.type }}</v-card-title>
      </v-col>
      <v-col
        style="display: flex ; align-items: center; justify-content: center"
        cols="12"
        md="2"
        sm="2"
      >
        <v-btn
          color="#313F53"
          style="color: white"
          @click="changeItem(scaffolding)"
        >
          Edit
        </v-btn>
      </v-col>
    </v-row>
    <v-container>
      <v-card style="padding: 20px">
        <v-card-title>Scaffolding Information</v-card-title>
        <v-text-field
          v-model="scaffolding.type"
          color="#313F53"
          outlined
          style="color: #313F53"
          readonly
          label="Type"
          dense
        ></v-text-field>
        <v-textarea
          v-model="scaffolding.description"
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
      <v-card>
        <v-card-title>Pricing</v-card-title>
        <v-data-table
          hide-default-footer
          :headers="columnsPrice"
          :items="scaffolding.pricing"
          fixed-header
        >
        </v-data-table>
      </v-card>
    </v-container>
    <v-container>
      <v-card v-if="scaffolding.suppliers !== null">
        <v-card-title>Stores</v-card-title>
        <v-data-table
          hide-default-footer
          :headers="columnsStore"
          :items="scaffolding.suppliers"
          fixed-header
        >
          <template v-slot:item.person.image="{ item }">
            <v-avatar
              v-if="item.person.image != null && item.person.image.length != 0"
              style="margin: 5px;padding: 0px"
            >
              <img
                :src="
                  $axios.defaults.baseURL + 'uploads/' + item.person.image.name
                "
              />
            </v-avatar>
            <p
              v-if="item.person.image == null || item.person.image.length == 0"
              style="margin: 0"
            >
              No Image
            </p>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import { Scaffolding } from '../../../models/products/scaffolding'

export default {
  name: 'ScaffoldingDetail',
  props: {
    scaffolding: {
      type: [Object, Scaffolding],
      default: () => new Scaffolding()
    },
    changeRoute: {
      type: String,
      default: null
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
      { text: 'Image', value: 'person.image' },
      { text: 'Name', value: 'person.name' },
      { text: 'Email', value: 'person.email' },
      { text: 'Contact', value: 'person.contact' },
      { text: 'Address', value: 'location.address' },
      { text: 'Services', value: 'services' }
    ]
  }),
  methods: {
    returnBack() {
      this.$router.back()
    },
    changeItem(item) {
      this.$router.push(this.$props.changeRoute.replace('$id', item._id))
    }
  }
}
</script>

<style scoped></style>
