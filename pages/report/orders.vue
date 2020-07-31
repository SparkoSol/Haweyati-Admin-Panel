<template>
  <v-container>
    <OrderReport />
  </v-container>
</template>

<script>
import OrderReport from '../../components/reports/order'
export default {
  layout(context) {
    return 'report'
  },
  components: {
    OrderReport
  }
}
</script>
