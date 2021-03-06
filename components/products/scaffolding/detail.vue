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
        <v-card-title>{{ scaffolding.name }}</v-card-title>
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
          v-model="scaffolding.name"
          color="#313F53"
          outlined
          style="color: #313F53"
          readonly
          label="Name"
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
      <VolumetricWeightCalculator
        title="Scaffolding Size"
        readonly
        :length="scaffolding.cbmLength"
        :width="scaffolding.cbmWidth"
        :height="scaffolding.cbmHeight"
        :weight="scaffolding.volumetricWeight"
      />
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
                alt="person"
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
import VolumetricWeightCalculator from '@/components/misc/volumetric-weight-calculator'

export default {
  name: 'ScaffoldingDetail',
  components: { VolumetricWeightCalculator },
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
      { text: 'Extra Days Rent', value: 'extraDayRent' },
      { text: 'Half Mesh Plate Price', value: 'mesh.half' },
      { text: 'Full Mesh Plate Price', value: 'mesh.full' },
      { text: 'Wheels Price (Set Of 4)', value: 'wheels' },
      { text: 'Connections Price (Set Of 4)', value: 'connections' }
    ],
    columnsStore: [
      { text: 'Image', value: 'person.image', sortable: false },
      { text: 'Name', value: 'person.name' },
      { text: 'Email', value: 'person.email' },
      { text: 'Contact', value: 'person.contact' },
      { text: 'Address', value: 'location.address', sortable: false },
      { text: 'Services', value: 'services', sortable: false }
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
