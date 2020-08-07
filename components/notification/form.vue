<template>
  <v-container style="display: flex;justify-content: center">
    <SimpleForm
      :method="'post'"
      :data="formData"
      endpoint="fcm/notification"
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
            <v-card-title>Send Notification</v-card-title>
          </v-col>
        </v-row>
      </template>
      <div class="span-2">
        <v-text-field
          v-model="notification.title"
          :rules="[required]"
          outlined
          :label="'Title'"
          dense
        ></v-text-field>
        <v-textarea
          v-model="notification.message"
          :rules="[required]"
          color="#313F53"
          outlined
          style="color: #313F53"
          label="Message"
          dense
        ></v-textarea>
        <v-card style="padding: 20px;margin-bottom: 20px">
          <v-card-title style="color: #313F53">Recipient</v-card-title>
          <EntitySelector
            endpoint="persons/persons-notification"
            :selection="persons"
            required
            multiple
            :columns-selected="columnsSelected"
            :columns-selector="columnsSelected"
            title-selected="Selected Recipient"
            title-selector="Recipient"
            @selected="notification.to = $event"
          />
        </v-card>
      </div>
    </SimpleForm>
  </v-container>
</template>

<script>
import EntitySelector from '../../common/ui/widgets/EntitySelector'
import SimpleForm from '../../common/ui/widgets/SimpleForm'
import { required } from '../../common/utils/validators'

export default {
  name: 'NotificationForm',
  components: {
    SimpleForm,
    EntitySelector
  },
  data: () => ({
    columnsSelected: [{ text: 'Name', value: 'name' }],
    persons: [],
    notification: {
      title: '',
      message: '',
      to: []
    }
  }),
  methods: {
    required,
    returnBack() {
      this.$router.back()
    },
    formData() {
      return this.notification
    }
  }
}
</script>

<style>
.form {
  width: 800px !important;
}
</style>
