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
        <v-card-title>Login</v-card-title>
      </v-container>
      <v-progress-linear
        v-if="loading"
        indeterminate
        color="#313F53"
        class="mb-0"
      ></v-progress-linear>
      <v-form v-if="!loading" ref="form">
        <ul v-if="errors.length" style="color: red;margin-bottom: 15px">
          <li v-for="(error, i) of errors" :key="i">
            {{ error }}
          </li>
        </ul>
        <v-text-field
          v-model="login.username"
          color="#313F53"
          outlined
          style="color: #313F53"
          :rules="[required, emailValidator]"
          label="Email"
          dense
        ></v-text-field>
        <v-text-field
          v-model="login.password"
          color="#313F53"
          outlined
          :rules="[required]"
          type="password"
          style="color: #313F53"
          label="Password"
          dense
        ></v-text-field>
        <nuxt-link to="/auth/reset-password" style="text-decoration: none">
          <p style="font-size: 12px;text-align: right;color:black;">
            Forgot Password?
          </p></nuxt-link
        >
        <v-btn
          width="100%"
          color="#FF974D"
          style="color:#ffffff"
          large
          elevation="0"
          @click="userLogin"
        >
          Log In
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { required, emailValidator } from '../../common/utils/validators'
export default {
  layout(context) {
    return 'none'
  },
  data: () => ({
    loading: false,
    errors: [],
    login: {
      username: '',
      password: ''
    }
  }),
  methods: {
    required,
    emailValidator,
    async gotoReset() {
      console.log('pressed')
      await this.$router.push('/auth/reset-password')
    },
    async userLogin() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          this.errors = []
          await this.$auth.loginWith('local', {
            data: this.login
          })
        } catch (err) {
          this.loading = false
          this.errors.push('Invalid Email and Password')
        }
      }
    }
  }
}
</script>
