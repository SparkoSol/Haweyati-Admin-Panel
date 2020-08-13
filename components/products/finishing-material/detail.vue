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
        <v-card-title>{{ finishingMaterial.name }}</v-card-title>
      </v-col>
    </v-row>
    <v-container>
      <v-card style="padding: 20px">
        <v-card-title>Information</v-card-title>
        <ImageViewer :image="finishingMaterial.image" />
        <v-text-field
          v-model="finishingMaterial.name"
          color="#313F53"
          outlined
          style="color: #313F53"
          readonly
          label="Name"
          dense
        ></v-text-field>
        <v-textarea
          :value="finishingMaterial.description"
          readonly
          outlined
          label="Description"
          dense
        ></v-textarea>
        <v-text-field
          v-if="finishingMaterial.price > 0"
          style="align-items: center !important;"
          outlined
          label="Price"
          readonly
          :value="finishingMaterial.price"
          dense
          hide-details
        ></v-text-field>
      </v-card>
    </v-container>
    <v-container>
      <v-card v-if="finishingMaterial.varient.length > 0">
        <v-card-title>Varients</v-card-title>
        <v-data-table
          hide-default-footer
          :headers="columnsVarient"
          :items="finishingMaterial.varient"
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
          :items="finishingMaterial.suppliers"
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
import { FinishingMaterial } from '../../../models/products/finishing-material'
import ImageViewer from '../../../components/misc/image-viewer'
export default {
  name: 'FinishingMaterialDetail',
  components: { ImageViewer },
  props: {
    finishingMaterial: {
      type: [Object, FinishingMaterial],
      default: () => new FinishingMaterial()
    }
  },
  data: () => ({
    columnsVarient: [],
    columnsStore: [
      { text: 'Image', value: 'person.image', sortable: false },
      { text: 'Name', value: 'person.name' },
      { text: 'Email', value: 'person.email' },
      { text: 'Contact', value: 'person.contact' },
      { text: 'Address', value: 'location.address', sortable: false },
      { text: 'Services', value: 'services', sortable: false }
    ]
  }),
  mounted() {
    if (this.finishingMaterial.varient.length !== 0) {
      this.varientHeader()
    }
  },
  methods: {
    returnBack() {
      this.$router.back()
    },
    varientHeader() {
      for (let i = 0; i < 1; i++) {
        for (const key of Object.keys(this.finishingMaterial.varient[i])) {
          this.columnsVarient.push({ text: key.toUpperCase(), value: key })
        }
      }
    }
  }
}
</script>

<style scoped></style>
