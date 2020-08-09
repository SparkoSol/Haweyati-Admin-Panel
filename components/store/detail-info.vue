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
        <v-card-title>{{ title }}</v-card-title>
      </v-col>
    </v-row>
    <v-container>
      <v-card style="padding: 20px;margin-bottom: 30px">
        <v-card-title>Supplier Information</v-card-title>
        <image-viewer :image="supplier.person.image" />
        <v-text-field
          v-model="supplier.person.name"
          style="align-items: center !important;"
          outlined
          label="Supplier Name"
          readonly
          dense
        ></v-text-field>
        <v-text-field
          style="align-items: center !important;"
          outlined
          label="Supplier Contact"
          readonly
          :value="supplier.person.contact"
          dense
        ></v-text-field>
        <v-text-field
          style="align-items: center !important;"
          outlined
          label="Supplier Status"
          readonly
          :value="supplier.status"
          dense
        ></v-text-field>
        <v-text-field
          style="align-items: center !important;"
          outlined
          label="Supplier City"
          readonly
          :value="supplier.city"
          dense
        ></v-text-field>
      </v-card>
      <v-card style="padding: 20px">
        <v-card-title>Location</v-card-title>
        <div>
          <GoogleMap :old-marker="supplier.location" :click="false" />
        </div>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import { Supplier } from '../../models/supplier'
import ImageViewer from '../misc/image-viewer'
import GoogleMap from '../misc/GoogleMap'

export default {
  name: 'SupplierDetailInfo',
  components: { ImageViewer, GoogleMap },
  props: {
    supplier: {
      type: [Object, Supplier],
      default: () => new Supplier()
    },
    title: {
      type: String
    }
  },
  data: () => ({}),
  methods: {
    returnBack() {
      this.$router.back()
    }
  }
}
</script>

<style scoped></style>
