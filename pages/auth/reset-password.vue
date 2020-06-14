<template>
  <v-container
    style="height: 100%;display: flex;align-items: center ;justify-content: center"
  >
    <v-card style="padding: 50px;width: 400px;">
      <v-container
        style="display: flex;justify-content: center;align-items: center;"
      >
        <img
          src="../../assets/Haweyati_Logo.png"
          width="130px"
          height="130px"
        />
      </v-container>
      <v-container style="display: flex;justify-content: center;padding: 0">
        <v-card-title>Reset Password</v-card-title>
      </v-container>
      <v-form ref="form">
        <v-text-field
          color="#313F53"
          outlined
          style="color: #313F53"
          :rules="[required, emailValidator]"
          label="Email"
          dense
        ></v-text-field>
        <v-btn
          width="100%"
          color="#FF974D"
          style="color:#ffffff"
          large
          elevation="0"
          @click="reset"
        >
          Submit
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { emailValidator, required } from '../../common/utils/validators'

export default {
  layout(context) {
    return 'none'
  },
  auth: false,
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    required,
    emailValidator,
    reset() {
      if (this.$refs.form.validate()) {
      }
    }
  }
}
</script>

<style scoped></style>
