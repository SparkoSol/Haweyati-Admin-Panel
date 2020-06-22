<template>
  <v-container>
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
        <v-card-title>Add Building Material Type</v-card-title>
      </v-col>
    </v-row>
    <v-card style="padding:20px;">
      <v-text-field
        color="#313F53"
        outlined
        style="color: #313F53"
        label="Title"
        dense
      ></v-text-field>
      <v-file-input
        color="#313F53"
        label="Media"
        prepend-icon=""
        prepend-inner-icon="mdi-camera"
        outlined
        dense
      ></v-file-input>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'BuildingMaterialSubAdd',

  data: () => ({}),
  methods: {
    returnBack() {
      this.$router.back()
    },
    reroute(route) {
      this.$router.push(route)
    },
    removeCity(i) {
      if (this.cities.length <= 1) {
        return
      }
      this.cities.splice(i, 1)
    },
    removeStore(i) {
      if (this.stores.length <= 1) {
        return
      }
      this.stores.splice(i, 1)
    }
  }
}
</script>
