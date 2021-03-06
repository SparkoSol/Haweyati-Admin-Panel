<template>
  <v-container style="display: flex;justify-content: center">
    <SimpleForm
      :method="isUpdate ? 'patch' : 'post'"
      :data="formData"
      :endpoint="isUpdate ? 'coupons' : 'coupons'"
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
          v-model="coupon.name"
          :rules="[required]"
          outlined
          :label="'Name'"
          dense
        ></v-text-field>
        <v-text-field
          v-model="coupon.code"
          :rules="[required]"
          outlined
          :label="'Code'"
          dense
        ></v-text-field>
        <v-text-field
          v-model="coupon.value"
          :rules="[required]"
          outlined
          type="number"
          :label="'Value'"
          dense
        ></v-text-field>
        <v-text-field
          v-model="coupon.expiry"
          :rules="[required]"
          outlined
          type="date"
          :label="'Expiry'"
          dense
        ></v-text-field>
        <v-checkbox
          v-model="coupon.isOneTime"
          label="This is a one time use coupon."
        ></v-checkbox>
      </div>
    </SimpleForm>
  </v-container>
</template>

<script>
import moment from 'moment'
import SimpleForm from '../../common/ui/widgets/SimpleForm'
import { required } from '@/common/utils/validators'
import { priceWZ } from '@/common/lib/validator'
import { Coupon } from '@/models/coupon'

export default {
  name: 'CouponForm',
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
    coupon: {
      type: Coupon,
      default: () => new Coupon()
    }
  },
  mounted() {
    if (this.coupon.expiry) {
      console.log('here')
      this.coupon.expiry = moment(this.coupon.expiry).format('yyyy-MM-DD')
      console.log(this.coupon.expiry)
    }
  },
  methods: {
    required,
    priceWZ,
    returnBack() {
      this.$router.back()
    },
    formData() {
      console.log(this.coupon)
      return this.coupon
    }
  }
}
</script>

<style>
.form {
  width: 800px !important;
}
</style>
