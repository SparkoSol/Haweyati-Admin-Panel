<template>
  <v-container style="display: flex;justify-content: center">
    <SimpleForm
      :method="isUpdate ? 'patch' : 'post'"
      :data="formData"
      :endpoint="isUpdate ? 'city' : 'city'"
      return
    >
      <template v-slot:header>
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
      </template>
      <div class="span-2">
        <v-text-field
          v-model="city.name"
          :rules="[required]"
          outlined
          readonly
          :label="'City Name'"
          dense
        ></v-text-field>
        <GoogleMap
          city
          search
          @city="getCity($event)"
          @input="location = $event"
        />
      </div>
    </SimpleForm>
    <v-dialog v-model="error" width="800px" persistent>
      <div style="height: 100%">
        <v-card style="padding: 20px">
          <v-card-title> City Not Found </v-card-title>
          <p style="padding: 0 16px">
            No city name found at the location you have selected. Please choose
            another Location.
          </p>
          <v-btn
            style="padding: 0 16px"
            color="primary"
            elevation="0"
            @click="close"
          >
            OK
          </v-btn>
        </v-card>
      </div>
    </v-dialog>
  </v-container>
</template>

<script>
import SimpleForm from '../../common/ui/widgets/SimpleForm'
import { required } from '@/common/utils/validators'
import { priceWZ } from '@/common/lib/validator'
import GoogleMap from '@/components/misc/GoogleMap'
import { City } from '@/models/city'

export default {
  name: 'CityForm',
  components: {
    GoogleMap,
    SimpleForm
  },
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    isUpdate: {
      type: Boolean,
      default: false
    },
    city: {
      type: City,
      default: () => new City()
    }
  },
  data: () => ({
    imageFile: null,
    sendImage: null,
    location: null,
    error: false
  }),
  methods: {
    required,
    priceWZ,
    returnBack() {
      this.$router.back()
    },
    formData() {
      return this.city
    },
    getCity(city) {
      console.log('here')
      console.log(city)
      if (city === 'Error') {
        this.error = true
        this.city.name = null
      } else {
        this.city.name = city
      }
    },
    close() {
      this.error = false
    }
  }
}
</script>

<style>
.form {
  width: 800px !important;
}
</style>
