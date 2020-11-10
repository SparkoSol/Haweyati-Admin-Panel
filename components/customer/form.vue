<template>
  <v-container style="display: flex;justify-content: center">
    <SimpleForm
      :method="isUpdate ? 'patch' : 'post'"
      :data="formData"
      return
      endpoint="/customers"
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
        <ul v-if="errors.length" style="color: red;margin-bottom: 15px">
          <li v-for="(error, i) of errors" :key="i">
            {{ error }}
          </li>
        </ul>
        <v-card style="padding:20px;margin-bottom: 20px">
          <v-text-field
            v-model="customer.profile.name"
            :rules="[required]"
            color="#313F53"
            outlined
            style="color: #313F53"
            dense
            label="Name"
          />
          <v-text-field
            v-model="customer.profile.email"
            :rules="[customer.profile.email ? emailValidator : true]"
            color="#313F53"
            outlined
            style="color: #313F53"
            dense
            label="Email"
          />
          <v-text-field
            v-model="customer.profile.contact"
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
            :image="customer.profile"
            @input="sendImage = $event"
          />
        </v-card>
        <v-card style="padding:20px;margin-bottom: 20px">
          <v-card-title>Location</v-card-title>
          <GoogleMap
            v-if="!customer.location.latitude"
            :search="true"
            @input="location = $event"
          />
          <GoogleMap
            v-if="customer.location.latitude"
            :search="true"
            :old-marker="customer.location"
            @input="location = $event"
          />
        </v-card>
      </div>
    </SimpleForm>
    <v-dialog v-model="contactCheck" width="800px" persistent>
      <div style="height: 100%">
        <v-card style="padding: 20px">
          <v-card-title> Customer Contact </v-card-title>
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
import { Customer } from '@/models/customer'
import {
  emailValidator,
  required,
  requiredSelect,
  phoneValidator
} from '@/common/utils/validators'

export default {
  name: 'CustomerForm',
  components: {
    GoogleMap,
    ImageSelector,
    SimpleForm
  },
  props: {
    customer: {
      type: Customer,
      default: () => new Customer()
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
    imageFile: null,
    sendImage: null,
    location: null,
    password: null,
    confirmPassword: null,
    errors: [],
    contactCheck: true,
    contact: null,
    mergeCheck: false,
    errorCheck: false,
    error: '',
    response: null
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
    formData() {
      const formData = new FormData()
      if (this.customer._id) {
        formData.append('_id', this.customer._id)
        formData.append('personId', this.customer.profile._id)
      }
      formData.append('name', this.customer.profile.name)
      if (this.customer.profile.email) {
        console.log(this.customer.profile.email)
        formData.append('email', this.customer.profile.email)
      } else {
        formData.append('email', '')
      }
      formData.append(
        'contact',
        this.customer.profile.contact.replace(/[^+0-9]/g, '')
      )
      if (this.response) {
        formData.append('profile', this.response._id)
      }
      if (this.sendImage !== null) {
        formData.append('image', this.sendImage)
      }
      formData.append('latitude', this.location.lat)
      formData.append('longitude', this.location.lng)
      if (this.password) {
        formData.append('password', this.password)
      } else {
        formData.append('password', this.customer.profile.password)
      }
      formData.forEach((item) => console.log(item))
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
        this.customer.profile = {
          name: response.name,
          email: response.email,
          contact: response.contact,
          image: response.image
        }
        // eslint-disable-next-line no-self-assign
        this.customer = this.customer
        if (response.scope.includes('customer')) {
          this.contactCheck = false
          this.errorCheck = true
          this.error = 'Customer Already Exists'
        } else {
          this.contactCheck = false
          this.mergeCheck = true
        }
      } else {
        console.log('not found')
        this.customer = new Customer()
        this.customer.profile.contact = this.contact
        this.contactCheck = false
      }
    },
    cancel() {
      this.$router.back()
    },
    merge() {
      this.mergeCheck = false
      console.log(this.customer)
    },
    notMerge() {
      this.customer = new Customer()
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
</style>
