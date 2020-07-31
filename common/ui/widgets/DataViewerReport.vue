<template>
  <v-card class="data-viewer" elevation="8">
    <v-card-title class="data-viewer__title">
      <v-btn v-if="back" icon style="margin-right: 50px" @click="returnBack">
        <v-icon>mdi-keyboard-backspace</v-icon>
      </v-btn>
      <span>{{ title }}</span>
      <v-spacer />

      <v-btn icon @click="load">
        <v-icon>mdi-reload</v-icon>
      </v-btn>
    </v-card-title>

    <v-container
      style="padding: 20px;display: flex;align-items: start;justify-content: start"
    >
      <v-form ref="form" style="display: flex;align-items: start ">
        <v-text-field
          v-if="date"
          v-model="dateSend"
          style="margin-right: 10px"
          :rules="[required]"
          type="date"
          dense
          outlined
        />
        <v-text-field
          v-if="dateTo"
          v-model="dateToSend"
          style="margin-right: 10px"
          :rules="[required]"
          type="date"
          dense
          outlined
        />
        <v-text-field
          v-if="month"
          v-model="monthSend"
          style="margin-right: 10px"
          :rules="[required]"
          type="month"
          dense
          outlined
        />
        <v-text-field
          v-if="week"
          v-model="weekSend"
          style="margin-right: 10px"
          :rules="[required]"
          type="week"
          dense
          outlined
        />
        <v-text-field
          v-if="year"
          v-model="yearSend"
          style="margin-right: 10px"
          type="number"
          :rules="[yearValidator, required]"
          dense
          outlined
        />
        <v-btn
          color="primary"
          elevation="0"
          style="padding: 0 13px 0 7px !important; border-radius: 4px; margin-right: 10px"
          height="40"
          @click="generateSale"
        >
          <span>Generate</span>
        </v-btn>
      </v-form>
    </v-container>

    <v-data-table
      :headers="columns"
      :loading="loading"
      :search="search"
      :items="data"
      :dense="dense"
      disable-pagination
      hide-default-footer
      height="500"
      fixed-header
      class="data-table__content"
    >
    </v-data-table>
  </v-card>
</template>

<script>
import { defineComponent, onMounted, ref } from '@vue/composition-api'
import { setupDataLoader } from '../../lib/data-loader'
import { yearValidator, required } from '../../utils/validators'

export default defineComponent({
  name: 'DataViewerReport',
  data: () => ({
    yearSend: new Date().getFullYear(),
    weekSend: '',
    dateSend: '',
    monthSend: '',
    dateToSend: ''
  }),
  props: {
    title: {
      type: String,
      required: true
    },
    dense: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      required: true
    },
    back: {
      type: Boolean,
      default: false
    },
    endpoint: {
      type: String,
      required: true
    },
    date: {
      type: Boolean,
      default: false
    },
    dateTo: {
      type: Boolean,
      default: false
    },
    week: {
      type: Boolean,
      default: false
    },
    month: {
      type: Boolean,
      default: false
    },
    year: {
      type: Boolean,
      default: false
    }
  },

  setup(props, context) {
    const loader = setupDataLoader(context.root.$axios, props.endpoint, true)

    onMounted(loader.load)

    const search = ref('')
    const filter = ref(false)

    function handleCreateEvent() {
      context.root.$options.router.push(props.createRoute)
    }

    function returnBack() {
      this.$router.back()
    }

    function generateSale() {
      if (this.$refs.form.validate()) {
        window.console.log(this.year)
      } else {
        window.console.log('error')
      }
    }

    return {
      search,
      filter,
      ...loader,
      returnBack,
      handleCreateEvent,
      yearValidator,
      required,
      generateSale
    }
  }
})
</script>

<style lang="sass">
.date-picker
    padding-right: 10px
.data-viewer
  width: 100% !important
.theme--light.v-data-table tbody tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper)
  background: #fff !important
</style>
