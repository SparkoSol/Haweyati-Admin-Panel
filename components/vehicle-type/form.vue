<template>
  <v-container style="display: flex;justify-content: center">
    <SimpleForm
      :method="isUpdate ? 'patch' : 'post'"
      :data="formData"
      :endpoint="isUpdate ? 'vehicle-type' + vehicleType.id : 'vehicle-type'"
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
          v-model="vehicleType.type"
          :rules="[required]"
          outlined
          :label="'Type'"
          dense
        ></v-text-field>
        <v-text-field
          v-model="vehicleType.capacity"
          :rules="[required, priceWZ]"
          type="number"
          outlined
          :label="'Capacity'"
          dense
        ></v-text-field>
      </div>
    </SimpleForm>
  </v-container>
</template>

<script>
import SimpleForm from '../../common/ui/widgets/SimpleForm'
import { required } from '@/common/utils/validators'
import { priceWZ } from '@/common/lib/validator'
import { VehicleType } from '@/models/vehicle-type'
export default {
  name: 'VehicleTypeForm',
  components: {
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
    vehicleType: {
      type: VehicleType,
      default: () => new VehicleType()
    }
  },
  data: () => ({}),
  methods: {
    required,
    priceWZ,
    returnBack() {
      this.$router.back()
    },
    formData() {
      return this.reward
    }
  }
}
</script>

<style>
.form {
  width: 800px !important;
}
</style>
