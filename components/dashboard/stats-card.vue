<template>
  <v-card>
    <v-card-title>
      <v-icon color="#ff974d">{{ icon }}</v-icon>
    </v-card-title>
    <v-card-text style="font-size: 30px;color: #313F53">
      {{ stat ? stat : 0 }}
    </v-card-text>
    <v-card-subtitle style="color:#ff974d">{{ title }}</v-card-subtitle>
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
