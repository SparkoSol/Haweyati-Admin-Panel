<template>
  <v-container style="display: flex;justify-content: center">
    <SimpleForm
      :method="isUpdate ? 'patch' : 'post'"
      :data="formData"
      :endpoint="isUpdate ? 'reward-points' + reward.id : 'reward-points'"
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
          v-model="reward.points"
          :rules="[required, priceWZ]"
          type="number"
          outlined
          :label="'Reward Points'"
          dense
        ></v-text-field>
        <v-select
          v-model="reward.type"
          outlined
          dense
          :items="types"
          item-text="name"
          item-value="value"
          placeholder="Product Category"
          @change="(item) => getMaterials(item)"
        ></v-select>
        <v-autocomplete
          :items="materials"
          :rules="[required]"
          class="my-text my-text-small"
          dense
          item-text="name"
          item-value="id"
          label="Product"
          outlined
          placeholder="Search Product"
          return-object
          @change="(item) => (reward.material = item._id)"
        ></v-autocomplete>
      </div>
    </SimpleForm>
  </v-container>
</template>

<script>
import SimpleForm from '../../common/ui/widgets/SimpleForm'
import { required } from '@/common/utils/validators'
import { priceWZ } from '@/common/lib/validator'
import { Reward } from '@/models/reward'

export default {
  name: 'RewardForm',
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
    reward: {
      type: Reward,
      default: () => new Reward()
    }
  },
  data: () => ({
    fmSelected: [{ text: 'Name', value: 'name' }],
    bmSelected: [{ text: 'Name', value: 'name' }],
    fms: [],
    bms: [],
    types: [
      { name: 'Building Material', value: 'BuildingMaterial' },
      { name: 'Finishing Material', value: 'FinishingMaterial' }
    ],
    materials: []
  }),
  methods: {
    required,
    priceWZ,
    returnBack() {
      this.$router.back()
    },
    async getMaterials(type) {
      this.reward.type = type
      if (type === 'BuildingMaterial') {
        this.materials = await this.$axios.$get(
          'reward-points/building-material'
        )
      } else {
        this.materials = await this.$axios.$get(
          'reward-points/finishing-material'
        )
      }
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
