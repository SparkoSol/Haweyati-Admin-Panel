<template>
  <v-container style="display: flex;justify-content: center">
    <SimpleForm
      :method="isUpdate ? 'patch' : 'post'"
      :data="formData"
      return
      endpoint="/drivers"
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
        <v-card style="padding: 20px;margin-bottom: 30px">
          <v-card-title>Driver Information</v-card-title>
          <v-text-field
            style="align-items: center !important;"
            outlined
            label="Driver Name"
            v-model="driver.profile.name"
            :value="driver.profile.name"
            dense
          ></v-text-field>
          <v-text-field
            style="align-items: center !important;"
            outlined
            label="Driver Contact"
            v-model="driver.profile.contact"
            :value="driver.profile.contact"
            dense
          ></v-text-field>
          <v-text-field
            style="align-items: center !important;"
            outlined
            label="Driver License"
            v-model="driver.license"
            :value="driver.license"
            dense
          ></v-text-field>
          <v-text-field
            style="align-items: center !important;"
            outlined
            label="Driver City"
            v-model="driver.city"
            :value="driver.city"
            dense
          ></v-text-field>
        </v-card>
        <v-card style="padding: 20px;margin-bottom: 20px">
          <v-card-title>Driver Vehicle</v-card-title>
          <v-text-field
            style="align-items: center !important;"
            outlined
            label="Vehicle Name"
            :value="driver.vehicle.name"
            v-model="driver.vehicle.name"
            dense
          ></v-text-field>
          <v-text-field
            style="align-items: center !important;"
            outlined
            label="Vehicle Model"
            :value="driver.vehicle.model"
            v-model="driver.vehicle.model"
            dense
          ></v-text-field>
          <v-text-field
            style="align-items: center !important;"
            outlined
            label="Vehicle ID"
            :value="driver.vehicle.identificationNo"
            v-model="driver.vehicle.identificationNo"
            dense
          ></v-text-field>
        </v-card>
      </div>
    </SimpleForm>
  </v-container>
</template>

<script>
import SimpleForm from '../../common/ui/widgets/SimpleForm'
import { Driver } from '../../models/driver'
import {
  emailValidator,
  required,
  phoneValidator
} from '../../common/utils/validators'

export default {
  name: 'DriverForm',
  components: {
    SimpleForm
  },
  props: {
    driver: {
      type: [Object, Driver],
      default: () => new Driver()
    },
    isUpdate: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Form'
    }
  },
  data: () => ({}),
  methods: {
    emailValidator,
    required,
    phoneValidator,
    returnBack() {
      this.$router.back()
    },
    formData() {
      const formData = new FormData()
      for (const key of Object.keys(this.driver)) {
        if (key === 'profile') {
          for (const profile of Object.keys(this.driver[key])) {
            formData.append(profile, this.driver[key][profile])
          }
        } else if (key === 'vehicle') {
          for (const vehicle of Object.keys(this.driver[key])) {
            formData.append(vehicle, this.driver[key][vehicle])
          }
        } else {
          formData.append(key, this.driver[key])
        }
      }
      formData.forEach((item) => window.console.log(item))
      return formData
    }
  }
}
</script>
