<template>
  <v-container style="display: flex;justify-content: center">
    <SimpleForm
      :method="'patch'"
      :data="formData"
      endpoint="time-slots"
      title="Manage Time Slots"
      @response="getTimeSlots"
    >
      <div
        v-for="(time, i) in timeSlots"
        :key="i"
        class="span-2"
        style="display: grid; grid-template-columns: 2fr 1fr 1fr; grid-column-gap: 10px"
      >
        <v-text-field
          v-model="time.category"
          outlined
          readonly
          :label="'Category ' + (i + 1)"
          dense
        ></v-text-field>
        <v-text-field
          v-model="time.from"
          hint="Only Hours will be used."
          outlined
          type="time"
          label="Available From"
          dense
        ></v-text-field>
        <v-text-field
          v-model="time.to"
          :rules="[
            (value) => {
              if (value && time.from) {
                return (
                  (value.split(':')[0] - time.from.split(':')[0]) % 3 === 0 ||
                  'Enter Valid Time SLot'
                )
              } else {
                return true
              }
            }
          ]"
          hint="Only Hours will be used."
          outlined
          type="time"
          label="Available To"
          dense
        ></v-text-field>
      </div>
    </SimpleForm>
  </v-container>
</template>

<script>
import SimpleForm from '../../common/ui/widgets/SimpleForm'
import { required } from '../../common/utils/validators'

export default {
  name: 'TimeSlotForm',
  components: {
    SimpleForm
  },
  data: () => ({
    timeSlots: []
  }),
  created() {
    this.getTimeSlots()
  },
  methods: {
    required,
    returnBack() {
      this.$router.back()
    },
    async getTimeSlots() {
      this.timeSlots = await this.$axios.$get('time-slots')
    },
    formData() {
      // const formData = new FormData()
      // for (const time of this.timeSlots) {
      //   for (const key of Object.keys(time)) {
      //     console.log(key + ': ' + time[key])
      //     formData.append(key, time[key])
      //   }
      // }
      // formData.forEach((item) => window.console.log(item))
      // return formData
      return this.timeSlots
    }
  }
}
</script>

<style>
.form {
  width: 800px !important;
}
</style>
