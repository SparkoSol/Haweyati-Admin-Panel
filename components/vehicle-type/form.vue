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
          v-model="vehicleType.deliveryCharges"
          :rules="[required, priceWZ]"
          type="number"
          outlined
          :label="'Delivery Charges'"
          dense
        ></v-text-field>
        <v-text-field
          v-model="vehicleType.minDeliveryCharges"
          :rules="[required, priceWZ]"
          type="number"
          outlined
          :label="'Minimum Delivery Charges'"
          dense
        ></v-text-field>
        <v-text-field
          v-model="vehicleType.minDistance"
          :rules="[required, priceWZ]"
          type="number"
          outlined
          :label="'Minimum Delivery Distance'"
          dense
        ></v-text-field>
        <VolumetricWeightCalculator
          title="Vehicle Capacity"
          is-vehicle
          :length="vehicleType.cbmLength"
          :width="vehicleType.cbmWidth"
          :height="vehicleType.cbmHeight"
          :payload="vehicleType.volumetricWeight"
          @data="data = $event"
        />
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
import { priceWZ, rentHelper } from '@/common/lib/validator'
import { VehicleType } from '@/models/vehicle-type'
import VolumetricWeightCalculator from '@/components/misc/volumetric-weight-calculator'

export default {
  name: 'VehicleTypeForm',
  components: {
    VolumetricWeightCalculator,
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
    sendImage: null,
    data: null
  }),
  methods: {
    required,
    priceWZ,
    rentHelper,
    returnBack() {
      this.$router.back()
    },
    formData() {
      const formData = new FormData()
      if (this.vehicleType._id) {
        formData.append('_id', this.vehicleType._id)
      }
      formData.append('name', this.vehicleType.name)
      formData.append('deliveryCharges', this.vehicleType.deliveryCharges)
      formData.append('minDeliveryCharges', this.vehicleType.minDeliveryCharges)
      formData.append('minDistance', this.vehicleType.minDistance)
      formData.append('cbmLength', this.data.length)
      formData.append('cbmWidth', this.data.width)
      formData.append('cbmHeight', this.data.height)
      formData.append('volumetricWeight', this.data.payload)
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
