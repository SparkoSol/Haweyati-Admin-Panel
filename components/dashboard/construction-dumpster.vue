<template>
  <v-card style="padding: 10px">
    <div
      style="display: grid;grid-template-columns: calc(20% - 10px) calc(46% - 10px) calc(33% - 10px);grid-column-gap: 10px;"
    >
      <p>{{ request.requestNo }}</p>
      <div
        style="display: grid;grid-template-columns: 10% 90%;grid-column-gap: 10px"
      >
        <v-icon style="align-items: start;margin-top: 4px" small color="grey"
          >mdi-gavel</v-icon
        >
        <p>
          {{ request.type }}
        </p>
      </div>
      <div
        style="display: grid;grid-template-columns: 10% 90%;grid-column-gap: 10px"
      >
        <v-icon style="align-items: start;margin-top: 4px" small color="grey"
          >mdi-clock-time-four-outline</v-icon
        >
        <p v-if="calcAgoDay(request.createdAt) != 0">
          {{ calcAgoDay(request.createdAt) + ' Days Ago' }}
        </p>
        <p v-else-if="calcAgoHour(request.createdAt) != 0">
          {{ calcAgoHour(request.createdAt) + ' Hours Ago' }}
        </p>
        <p v-else-if="calcAgoMin(request.createdAt) != 0">
          {{ calcAgoMin(request.createdAt) + ' Mins Ago' }}
        </p>
        <p v-else-if="calcAgoSec(request.createdAt) != 0">
          {{ calcAgoSec(request.createdAt) + ' Secs Ago' }}
        </p>
        <p v-else>
          Just Now
        </p>
      </div>
    </div>
    <div
      style="display: grid;grid-template-columns: calc(25% - 10px) calc(75% - 10px);grid-column-gap: 10px"
    >
      <div
        style="display: grid;grid-template-columns: 10% 90%;grid-column-gap: 10px"
      >
        <v-icon style="align-items: start;margin-top: 4px" small color="grey"
          >mdi-store</v-icon
        >
        <p>{{ request.suppliers.person.name }}</p>
      </div>
      <div
        style="display: grid;grid-template-columns: 10% 90%;grid-column-gap: 10px"
      >
        <v-icon style="align-items: start;margin-top: 4px" small color="grey"
          >mdi-cellphone</v-icon
        >
        <p>{{ request.suppliers.person.contact }}</p>
      </div>
    </div>
    <div
      style="display: grid;grid-template-columns: calc(25% - 10px) calc(75% - 10px);grid-column-gap: 10px"
    >
      <div
        style="display: grid;grid-template-columns: 10% 90%;grid-column-gap: 10px"
      >
        <v-icon style="align-items: start;margin-top: 4px" small color="grey"
          >mdi-ruler</v-icon
        >
        <p>{{ request.data.size }}</p>
      </div>
      <div
        style="display: grid;grid-template-columns: 10% 90%;grid-column-gap: 10px"
      >
        <v-icon style="align-items: start;margin-top: 4px" small color="grey"
          >mdi-clipboard-list</v-icon
        >
        <p>{{ request.data.description.substring(0, 100) }}</p>
      </div>
    </div>
    <div
      style="display: grid;grid-template-columns: 30% 30% 30%;grid-column-gap: 10px"
    >
      <v-btn
        color="#FF974D"
        style="margin-bottom: 10px"
        dark
        tile
        small
        width="100%"
        @click="getDetail(request)"
        >Detail
      </v-btn>
      <v-btn
        color="green"
        style="margin-bottom: 10px"
        dark
        tile
        small
        width="100%"
        @click="getAccepted(request)"
        >Accept
      </v-btn>
      <v-btn
        color="red"
        style="margin-bottom: 10px"
        dark
        tile
        small
        width="100%"
        @click="getRejected(request)"
        >Cancel
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import moment from 'moment'
export default {
  name: 'RequestCardConstructionDumpster',
  props: {
    request: {
      type: Object,
      default: null
    },
    getAccepted: {
      type: Function,
      default: null
    },
    getRejected: {
      type: Function,
      default: null
    },
    getDetail: {
      type: Function,
      default: null
    }
  },
  methods: {
    calcAgoDay(time) {
      return moment().diff(time, 'days')
    },
    calcAgoHour(time) {
      return moment().diff(time, 'hour')
    },
    calcAgoMin(time) {
      return moment().diff(time, 'minute')
    },
    calcAgoSec(time) {
      return moment().diff(time, 'second')
    }
  }
}
</script>

<style scoped></style>
