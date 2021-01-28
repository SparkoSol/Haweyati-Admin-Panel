<template>
  <v-card style="padding:20px;margin-bottom: 20px">
    <v-card-title>{{ title }}</v-card-title>
    <div style="display: grid;grid-template-columns: 40% 60%">
      <div>
        <img
          v-if="isVehicle"
          width="85%"
          height="85%"
          style="object-fit: contain"
          src="../../assets/images/placeholders/volume-vehicle.png"
          alt="vehicle"
        />
        <img
          v-else
          width="100%"
          height="100%"
          style="object-fit: contain"
          src="../../assets/images/placeholders/volumetric-weight.png"
          alt="package"
        />
      </div>
      <div>
        <v-form ref="form">
          <div style="display: grid; grid-template-columns: 30% 70%">
            <v-label>Length:</v-label>
            <v-text-field
              v-model="length"
              outlined
              dense
              placeholder="0"
              :rules="[required]"
              :readonly="readonly"
              @change="calculate"
            >
              <template v-slot:append-outer>
                <p>m</p>
              </template>
            </v-text-field>
          </div>
          <div style="display: grid; grid-template-columns: 30% 70%">
            <v-label>Width:</v-label>
            <v-text-field
              v-model="width"
              outlined
              dense
              placeholder="0"
              :readonly="readonly"
              :rules="[required]"
              @change="calculate"
            >
              <template v-slot:append-outer>
                <p>m</p>
              </template>
            </v-text-field>
          </div>
          <div style="display: grid; grid-template-columns: 30% 70%">
            <v-label>Height:</v-label>
            <v-text-field
              v-model="height"
              :rules="[required]"
              outlined
              dense
              placeholder="0"
              :readonly="readonly"
              @change="calculate"
            >
              <template v-slot:append-outer>
                <p>m</p>
              </template>
            </v-text-field>
          </div>
          <div
            v-if="isVehicle"
            style="display: grid; grid-template-columns: 30% 70%"
          >
            <v-label>Payload Capacity</v-label>
            <v-text-field
              v-model="payload"
              outlined
              :readonly="readonly"
              :rules="[required]"
              dense
              placeholder="0"
              @change="calculate"
            >
              <template v-slot:append-outer>
                <p>kg</p>
              </template>
            </v-text-field>
          </div>
          <div v-else style="display: grid; grid-template-columns: 30% 70%">
            <v-label>Weight</v-label>
            <v-text-field
              v-model="weight"
              outlined
              :readonly="readonly"
              :rules="[required]"
              dense
              placeholder="0"
              @change="calculate"
            >
              <template v-slot:append-outer>
                <p>kg</p>
              </template>
            </v-text-field>
          </div>
        </v-form>
      </div>
    </div>
  </v-card>
</template>

<script>
import { required } from '@/common/lib/validator'

export default {
  name: 'VolumetricWeightCalculator',
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    isVehicle: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Capacity'
    },
    length: {
      type: Number,
      default: null
    },
    width: {
      type: Number,
      default: null
    },
    height: {
      type: Number,
      default: null
    },
    payload: {
      type: Number,
      default: null
    },
    weight: {
      type: Number,
      default: null
    }
  },
  methods: {
    required,
    calculate() {
      if (this.$refs.form.validate()) {
        let data
        if (this.isVehicle) {
          data = {
            length: this.length,
            width: this.width,
            height: this.height,
            payload: this.payload
          }
        } else {
          data = {
            length: this.length,
            width: this.width,
            height: this.height,
            weight: this.weight
          }
        }
        this.$emit('data', data)
      }
    }
  }
}
</script>

<style scoped></style>
