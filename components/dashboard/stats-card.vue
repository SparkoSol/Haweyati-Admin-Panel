<template>
  <v-card>
    <v-card-title>
      <v-icon color="black">{{ icon }}</v-icon>
    </v-card-title>
    <v-card-text style="font-size: 30px;color: black">
      {{ stat ? stat : 0 }}
    </v-card-text>
    <v-card-subtitle style="color: orange">{{ title }}</v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: 'StatsCard',
  props: {
    icon: {
      type: String,
      default: 'mdi-cart'
    },
    stat: {
      type: String,
      default: '0'
    },
    title: {
      type: String,
      default: 'Report'
    }
  }
}
</script>

<style scoped></style>
