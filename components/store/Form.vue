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
            color="#313F53"
            outlined
            style="color: #313F53"
            dense
            label="Email"
          />
          <v-text-field
            v-model="supplier.person.contact"
            v-mask="['+### - #######', '+#### - ########']"
            :rules="[required]"
            readonly
            color="#313F53"
            outlined
            style="color: #313F53"
            dense
            hint="0307 - 7355699"
            label="Contact"
          />
          <div v-if="!isUpdate">
            <v-text-field
              v-model="password"
              :rules="[required]"
              type="password"
              color="#313F53"
              outlined
              style="color: #313F53"
              dense
              label="Password"
            />
            <v-text-field
              v-model="confirmPassword"
              :rules="[
                required,
                (v) => v === password || 'Could Not Confirm Password'
              ]"
              type="password"
              color="#313F53"
              outlined
              style="color: #313F53"
              dense
              label="Confirm Password"
            />
          </div>
          <div v-else>
            <v-text-field
              v-model="password"
              type="password"
              color="#313F53"
              outlined
              style="color: #313F53"
              dense
              label="Password"
            />
            <v-text-field
              v-model="confirmPassword"
              type="password"
              :rules="[
                password ? required : true,
                password
                  ? (v) => v === password || 'Could Not Confirm Password'
                  : true
              ]"
              color="#313F53"
              outlined
              style="color: #313F53"
              dense
              label="Confirm Password"
            />
          </div>
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
    <v-dialog v-model="contactCheck" width="800px" persistent>
      <div style="height: 100%">
        <v-card style="padding: 20px">
          <v-card-title> Supplier Contact </v-card-title>
          <v-text-field
            v-model="contact"
            v-mask="['+### - #######', '+#### - ########']"
            :rules="[required]"
            :readonly="isUpdate"
            color="#313F53"
            outlined
            style="color: #313F53"
            dense
            hint="0307 - 7355699"
            label="Contact"
          />
          <v-btn
            :disabled="!contact"
            color="primary"
            elevation="0"
            @click="trigger"
          >
            Submit
          </v-btn>
          <v-btn color="error" elevation="0" @click="cancel">
            Cancel
          </v-btn>
        </v-card>
      </div>
    </v-dialog>
    <v-dialog v-model="errorCheck" width="800px" persistent>
      <div style="height: 100%">
        <v-card style="padding: 20px">
          <v-card-title> Contact Exist </v-card-title>
          <p>
            The provided contact already exist, please provide another contact
            number.
          </p>
          <v-btn color="primary" elevation="0" @click="notMerge">
            OK
          </v-btn>
        </v-card>
      </div>
    </v-dialog>
    <v-dialog v-model="mergeCheck" width="800px" persistent>
      <div style="height: 100%">
        <v-card style="padding: 20px">
          <v-card-title> Contact Exist </v-card-title>
          <p>
            The provided contact already exist, do you want to merge profile?
          </p>
          <v-btn color="primary" elevation="0" @click="merge">
            YES
          </v-btn>
          <v-btn color="primary" elevation="0" @click="notMerge">
            NO
          </v-btn>
        </v-card>
      </div>
    </v-dialog>
  </v-container>
</template>

<script>
import SimpleForm from '../../common/ui/widgets/SimpleForm'
import ImageSelector from '../misc/image-selector'
import GoogleMap from '../misc/GoogleMap'
import { Supplier } from '@/models/supplier'
import {
  emailValidator,
  required,
  requiredSelect,
  phoneValidator
} from '@/common/utils/validators'

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
    location: null,
    contactCheck: true,
    contact: null,
    mergeCheck: false,
    errorCheck: false,
    error: '',
    response: null,
    password: null,
    confirmPassword: null
  }),
  mounted() {
    if (this.isUpdate) {
      this.contactCheck = false
    }
  },
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
        formData.append('personId', this.supplier.person._id)
      }
      formData.append('name', this.supplier.person.name)
      if (this.supplier.person.email) {
        formData.append('email', this.supplier.person.email)
      } else {
        formData.append('email', '')
      }
      if (this.password) {
        formData.append('password', this.password)
      } else {
        formData.append('password', this.supplier.person.password)
      }
      formData.append(
        'contact',
        this.supplier.person.contact.replace(/[^+0-9]/g, '')
      )
      if (this.response) {
        formData.append('person', this.response._id)
      }
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
    },
    async trigger() {
      const response = await this.$axios.$get(
        'persons/contact/' + this.contact.replace(/[^+0-9]/g, '')
      )
      console.log(response)
      if (response) {
        this.response = response
        console.log('found')
        this.supplier.person = {
          name: response.name,
          email: response.email,
          contact: response.contact,
          image: response.image
        }
        // eslint-disable-next-line no-self-assign
        this.supplier = this.supplier
        if (response.scope.includes('supplier')) {
          this.contactCheck = false
          this.errorCheck = true
          this.error = 'Supplier Already Exists'
        } else {
          this.contactCheck = false
          this.mergeCheck = true
        }
      } else {
        console.log('not found')
        this.supplier = new Supplier()
        this.supplier.person.contact = this.contact
        this.contactCheck = false
      }
    },
    cancel() {
      this.$router.back()
    },
    merge() {
      this.mergeCheck = false
      console.log(this.supplier)
    },
    notMerge() {
      this.supplier = new Supplier()
      this.contact = null
      this.mergeCheck = false
      this.errorCheck = false
      this.contactCheck = true
    }
  }
}
</script>

<style>
.form {
  width: 800px !important;
}
.v-dialog {
  box-shadow: none;
}
</style>
