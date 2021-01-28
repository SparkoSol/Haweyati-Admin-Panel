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
      <v-card style="padding: 20px">
        <v-card-title>Information</v-card-title>
        <ImageViewer :image="buildingMaterial.image" />
        <v-text-field
          v-model="buildingMaterial.name"
          color="#313F53"
          outlined
          style="color: #313F53"
          readonly
          label="Name"
          dense
        ></v-text-field>
        <v-textarea
          :value="buildingMaterial.description"
          readonly
          outlined
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
          :items="buildingMaterial.pricing"
          fixed-header
        >
          <template v-slot:item.price="{ item }">
            <slot name="price" :item="item" />
            <div v-for="(price, j) of item.price" :key="j">
              <div
                style="display: grid; grid-template-columns: calc(40% - 5px) calc(60% - 5px); grid-column-gap: 0;"
              >
                <v-chip class="ma-2"> {{ price.price }} SR </v-chip>
                <v-chip class="ma-2">
                  {{ price.unit }}
                </v-chip>
              </div>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <v-container>
      <VolumetricWeightCalculator
        readonly
        title="Material Size"
        :length="buildingMaterial.cbmLength"
        :width="buildingMaterial.cbmWidth"
        :height="buildingMaterial.cbmHeight"
        :weight="buildingMaterial.volumetricWeight"
      />
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
                alt="person"
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
import ImageViewer from '../../../components/misc/image-viewer'
import VolumetricWeightCalculator from '@/components/misc/volumetric-weight-calculator'
export default {
  name: 'BuildingMaterialDetail',
  components: {
    VolumetricWeightCalculator,
    ImageViewer
  },
  props: {
    buildingMaterial: {
      type: [Object, BuildingMaterial],
      default: () => new BuildingMaterial()
    }
  },
  data: () => ({
    columnsPrice: [
      { text: 'City', value: 'city', width: '300px' },
      { text: 'Pricing', value: 'price', width: '300px' }
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
    }
  }
}
</script>

<style scoped></style>
