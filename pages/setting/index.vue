<template>
  <v-container>
    <v-card-title>Settings</v-card-title>
    <v-form v-if="!loading" ref="form">
      <v-card style="padding:20px;">
        <v-card-title>Profile</v-card-title>
        <ul v-if="errors.length" style="color: red;margin-bottom: 15px">
          <li v-for="(error, i) of errors" :key="i">
            {{ error }}
          </li>
        </ul>
        <v-container style="display:flex;justify-content: center">
          <ImageSelector
            v-model="imageFile"
            :image="update"
            @input="sendImage = $event"
          />
        </v-container>
        <v-text-field
          v-model="update.name"
          color="#313F53"
          outlined
          :rules="[required]"
          style="color: #313F53"
          label="Name"
          dense
        ></v-text-field>
        <v-text-field
          v-model="update.contact"
          v-mask="['### - #######', '#### - ########']"
          color="#313F53"
          outlined
          style="color: #313F53"
          :rules="[required]"
          label="Phone"
          dense
        ></v-text-field>
        <v-text-field
          v-model="update.old"
          color="#313F53"
          outlined
          type="password"
          style="color: #313F53"
          label="Old Password"
          dense
        ></v-text-field>
        <v-text-field
          v-model="update.password"
          color="#313F53"
          outlined
          type="password"
          style="color: #313F53"
          label="Password"
          dense
        ></v-text-field>
        <v-text-field
          v-model="update.confirmPassword"
          color="#313F53"
          outlined
          type="password"
          style="color: #313F53"
          label="Confirm Password"
          dense
        ></v-text-field>
      </v-card>
      <v-container
        style="margin-top:20px;display: flex;align-items: center;justify-content: center"
      >
        <v-btn color="#FF974D" style="color:#ffffff" x-large @click="formData">
          Save
        </v-btn>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import {
  required,
  emailValidator,
  lengthValidator
} from '../../common/utils/validators'
import ImageSelector from '../../components/misc/image-selector'

export default {
  components: {
    ImageSelector
  },
  data: () => ({
    loading: false,
    errors: [],
    update: {
      name: '',
      contact: '',
      password: '',
      confirmPassword: '',
      _id: '',
      image: '',
      old: ''
    },
    imageFile: null,
    sendImage: null
  }),
  mounted() {
    this.updateData()
  },
  methods: {
    required,
    emailValidator,
    lengthValidator,
    updateData() {
      this.update.name = this.$auth.user.name
      this.update.contact = this.$auth.user.contact
      this.update._id = this.$auth.user._id
      this.update.image = this.$auth.user.image
    },
    async formData() {
      this.errors = []
      if (this.$refs.form.validate()) {
        const formData = new FormData()
        if (this.update.password) {
          if (
            this.update.password === this.update.confirmPassword &&
            this.update.old !== ''
          ) {
            formData.append('password', this.update.password)
            formData.append('old', this.update.old)
          } else {
            this.errors.push('Could not confirm Password!!')
            return
          }
        }
        if (this.sendImage) {
          formData.append('image', this.sendImage)
        }
        formData.append('name', this.update.name)
        formData.append('contact', this.update.contact)
        formData.append('_id', this.update._id)
        formData.forEach((item) => window.console.log(item))
        try {
          await this.$axios.patch('persons', formData)
          window.location.reload()
        } catch (err) {
          if (err.response) {
            this.errors.push(err.response.data.message)
          } else {
            this.errors.push('Unable to process, Try again later')
          }
        }
      }
    }
  }
}
</script>
