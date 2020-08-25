<template>
  <v-container style="display: flex;justify-content: center">
    <SimpleForm
      :method="isUpdate ? 'patch' : 'post'"
      :data="formData"
      return
      endpoint="/suppliers"
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
        <v-card style="padding:20px;margin-bottom: 20px">
          <v-text-field
            v-model="supplier.person.name"
            :rules="[required]"
            color="#313F53"
            outlined
            style="color: #313F53"
            dense
            label="Name"
          />
          <v-text-field
            v-model="supplier.person.email"
            :rules="[required, emailValidator]"
            color="#313F53"
            outlined
            style="color: #313F53"
            dense
            label="Email"
          />
          <v-text-field
            v-model="supplier.person.contact"
            v-mask="['### - #######', '#### - ########']"
            :rules="[required]"
            color="#313F53"
            outlined
            style="color: #313F53"
            dense
            hint="0307 - 7355699"
            label="Contact"
          />
        </v-card>
        <v-card style="padding:20px;margin-bottom: 20px">
          <v-card-title>Media</v-card-title>
          <ImageSelector
            v-model="imageFile"
            :image="supplier.person"
            @input="sendImage = $event"
          />
        </v-card>
        <v-card style="padding:20px;margin-bottom: 20px">
          <v-card-title>Location</v-card-title>
          <GoogleMap
            v-if="!supplier.location.latitude"
            :search="true"
            @input="location = $event"
          />
          <GoogleMap
            v-if="supplier.location.latitude"
            :search="true"
            :old-marker="supplier.location"
            @input="location = $event"
          />
        </v-card>
        <v-card style="padding:20px;margin-bottom: 20px">
          <v-card-title>Services</v-card-title>
          <v-select
            v-model="supplier.services"
            :rules="[requiredSelect]"
            color="#313F53"
            outlined
            dense
            multiple
            :items="services"
            label="Services"
            item-text="name"
          >
          </v-select>
        </v-card>
      </div>
    </SimpleForm>
  </v-container>
</template>

<script>
import SimpleForm from '../../common/ui/widgets/SimpleForm'
import { Supplier } from '../../models/supplier'
import ImageSelector from '../misc/image-selector'
import {
  emailValidator,
  required,
  requiredSelect,
  phoneValidator
} from '../../common/utils/validators'
import GoogleMap from '../misc/GoogleMap'

export default {
  components: {
    GoogleMap,
    ImageSelector,
    SimpleForm
  },
  props: {
    mainSupplier: {
      type: Supplier,
      default: null
    },
    supplier: {
      type: Supplier,
      default: () => new Supplier()
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
  data: () => ({
    columnsSelected: [{ text: 'Name', value: 'person.name' }],
    suppliers: [],
    services: [
      { name: 'Construction Dumpster' },
      { name: 'Building Material' },
      { name: 'Finishing Material' },
      { name: 'Scaffolding' },
      { name: 'Delivery Vehicle' }
    ],
    imageFile: null,
    sendImage: null,
    location: null
  }),
  methods: {
    emailValidator,
    required,
    phoneValidator,
    requiredSelect,
    returnBack() {
      this.$router.back()
    },
    async getSuppliers() {
      if (this.subBranchCheck === true) {
        this.suppliers = await this.$axios.$get('suppliers')
      }
    },
    formData() {
      const formData = new FormData()
      if (this.supplier._id) {
        formData.append('_id', this.supplier._id)
        formData.append('personID', this.supplier.person._id)
      }
      formData.append('name', this.supplier.person.name)
      formData.append('email', this.supplier.person.email)
      formData.append(
        'contact',
        this.supplier.person.contact.replace(/[^0-9]/g, '')
      )
      if (this.sendImage !== null) {
        formData.append('image', this.sendImage)
      }
      formData.append('status', this.supplier.status)
      this.supplier.services.forEach((item) => {
        formData.append('services', item)
      })
      formData.append('latitude', this.location.lat)
      formData.append('longitude', this.location.lng)
      if (this.mainSupplier) {
        formData.append('parent', this.mainSupplier._id)
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
