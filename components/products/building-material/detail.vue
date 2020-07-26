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
        <v-card-title>{{ buildingMaterial.name }}</v-card-title>
      </v-col>
    </v-row>
    <v-container>
      <v-card>
        <v-card-title>Pricing</v-card-title>
        <v-data-table
          hide-default-footer
          :headers="columnsPrice"
          :items="buildingMaterial.pricing"
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
          :items="buildingMaterial.suppliers"
          fixed-header
        >
          <template v-slot:item.person.image="{ item }">
            <v-avatar
              v-if="item.person.image != null"
              style="margin: 5px;padding: 0px"
            >
              <img
                :src="
                  $axios.defaults.baseURL + 'uploads/' + item.person.image.name
                "
              />
            </v-avatar>
            <p v-if="item.person.image == null" style="margin: 0">
              No Image
            </p>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import { BuildingMaterial } from '../../../models/products/building-material'

export default {
  name: 'BuildingMaterialDetail',
  props: {
    buildingMaterial: {
      type: [Object, BuildingMaterial],
      default: () => new BuildingMaterial()
    }
  },
  data: () => ({
    columnsPrice: [
      { text: 'City', value: 'city' },
      { text: 'Price', value: 'price' }
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
    }
  }
}
</script>

<style scoped></style>
