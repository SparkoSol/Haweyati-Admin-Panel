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
        <v-card-title>Driver Information</v-card-title>
        <div
          style="display: flex;justify-content: center;align-items: center;margin-bottom: 30px"
        >
          <v-avatar size="200" style="border: 1px solid #313F53">
            <img
              v-if="driver.profile.image"
              :src="
                $axios.defaults.baseURL + 'uploads/' + driver.profile.image.name
              "
            />
            <img
              v-else
              src="../../assets/images/placeholders/placeholder_person.jpg"
            />
          </v-avatar>
        </div>
        <v-text-field
          style="align-items: center !important;"
          outlined
          label="Driver Name"
          readonly
          :value="driver.profile.name"
          dense
        ></v-text-field>
        <v-text-field
          style="align-items: center !important;"
          outlined
          label="Driver Contact"
          readonly
          :value="driver.profile.contact"
          dense
        ></v-text-field>
        <v-text-field
          style="align-items: center !important;"
          outlined
          label="Driver License"
          readonly
          :value="driver.license"
          dense
        ></v-text-field>
        <v-text-field
          style="align-items: center !important;"
          outlined
          label="Driver Status"
          readonly
          :value="driver.status"
          dense
        ></v-text-field>
        <v-text-field
          style="align-items: center !important;"
          outlined
          label="Driver City"
          readonly
          :value="driver.city"
          dense
        ></v-text-field>
      </v-card>
      <v-card style="padding: 20px">
        <v-card-title>Driver Vehicle</v-card-title>
        <v-text-field
          style="align-items: center !important;"
          outlined
          label="Vehicle Name"
          readonly
          :value="driver.vehicle.name"
          dense
        ></v-text-field>
        <v-text-field
          style="align-items: center !important;"
          outlined
          label="Vehicle Model"
          readonly
          :value="driver.vehicle.model"
          dense
        ></v-text-field>
        <v-text-field
          style="align-items: center !important;"
          outlined
          label="Vehicle ID"
          readonly
          :value="driver.vehicle.identificationNo"
          dense
        ></v-text-field>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import { Driver } from '../../models/driver'

export default {
  name: 'DriverDetail',
  props: {
    driver: {
      type: [Object, Driver],
      default: () => new Driver()
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
