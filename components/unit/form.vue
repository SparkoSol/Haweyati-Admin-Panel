<template>
  <v-container style="display: flex;justify-content: center">
    <SimpleForm
      :method="isUpdate ? 'patch' : 'post'"
      :data="formData"
      :endpoint="isUpdate ? 'unit' : 'unit'"
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
          v-model="unit.name"
          :rules="[required]"
          outlined
          :label="'Unit Name'"
          dense
        ></v-text-field>
        <VolumetricWeightCalculator
          title="Unit Size"
          :length="unit.cbmLength"
          :width="unit.cbmWidth"
          :height="unit.cbmHeight"
          :weight="unit.volumetricWeight"
          @data="getData($event)"
        />
      </div>
    </SimpleForm>
  </v-container>
</template>

<script>
import SimpleForm from '../../common/ui/widgets/SimpleForm'
import { required } from '@/common/utils/validators'
import { priceWZ } from '@/common/lib/validator'
import { Unit } from '@/models/unit'
import VolumetricWeightCalculator from '@/components/misc/volumetric-weight-calculator'

export default {
  name: 'UnitForm',
  components: {
    VolumetricWeightCalculator,
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
    unit: {
      type: Unit,
      default: () => new Unit()
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
      console.log(this.unit)
      return this.unit
    },
    getData(e) {
      console.log(e)
      this.unit.cbmLength = e.length
      this.unit.cbmWidth = e.width
      this.unit.cbmHeight = e.height
      this.unit.volumetricWeight = e.weight
    }
  }
}
</script>

<style>
.form {
  width: 800px !important;
}
</style>
