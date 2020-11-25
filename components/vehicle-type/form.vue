<template>
  <v-container style="display: flex;justify-content: center">
    <SimpleForm
      :method="isUpdate ? 'patch' : 'post'"
      :data="formData"
      :endpoint="isUpdate ? 'vehicle-type' : 'vehicle-type'"
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
          v-model="vehicleType.name"
          :rules="[required]"
          outlined
          :label="'Title'"
          dense
        ></v-text-field>
        <v-text-field
          v-model="vehicleType.weight"
          :rules="[required, priceWZ]"
          type="number"
          outlined
          :label="'Weight Capacity'"
          dense
        ></v-text-field>
        <v-text-field
          v-model="vehicleType.volume"
          :rules="[required, priceWZ]"
          type="number"
          outlined
          :label="'Volume Capacity'"
          dense
        ></v-text-field>
        <v-card style="padding:20px;margin-bottom: 20px">
          <v-card-title>Media</v-card-title>
          <ImageSelector
            v-model="imageFile"
            :image="vehicleType"
            @input="sendImage = $event"
          />
        </v-card>
      </div>
    </SimpleForm>
  </v-container>
</template>

<script>
import SimpleForm from '../../common/ui/widgets/SimpleForm'
import ImageSelector from '../misc/image-selector'
import { required } from '@/common/utils/validators'
import { priceWZ } from '@/common/lib/validator'
import { VehicleType } from '@/models/vehicle-type'

export default {
  name: 'VehicleTypeForm',
  components: {
    SimpleForm,
    ImageSelector
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
  data: () => ({
    imageFile: null,
    sendImage: null
  }),
  methods: {
    required,
    priceWZ,
    returnBack() {
      this.$router.back()
    },
    formData() {
      const formData = new FormData()
      if (this.vehicleType._id) {
        formData.append('_id', this.vehicleType._id)
      }
      formData.append('name', this.vehicleType.name)
      formData.append('weight', this.vehicleType.weight)
      formData.append('volume', this.vehicleType.volume)
      if (this.sendImage !== null) {
        formData.append('image', this.sendImage)
      }
      formData.forEach((item) => window.console.log(item))
      return formData
    }
  }
}
</script>

<style>
.form {
  width: 800px !important;
}
</style>
