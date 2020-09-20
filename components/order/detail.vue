<template>
  <div>
    <ConstructionDumpsterDetail
      v-if="order.service === 'Construction Dumpster'"
      :order="order"
    />
    <BuildingMaterialDetail
      v-if="order.service === 'Building Material'"
      :order="order"
    />
    <FinishingMaterialDetail
      v-if="order.service === 'Finishing Material'"
      :order="order"
    />
    <ScaffoldingDetail v-if="order.service === 'Scaffolding'" :order="order" />
  </div>
</template>

<script>
import moment from 'moment'
import { Order } from '../../models/order'
import ConstructionDumpsterDetail from '@/components/order/constructionDumpsterDetail'
import BuildingMaterialDetail from '@/components/order/buildingMaterialDetail'
import FinishingMaterialDetail from '@/components/order/finishinMaterialDetail'
import ScaffoldingDetail from '@/components/order/scaffoldingDetail'

export default {
  name: 'OrderDetail',
  components: {
    ScaffoldingDetail,
    FinishingMaterialDetail,
    BuildingMaterialDetail,
    ConstructionDumpsterDetail
  },
  props: {
    order: {
      type: [Object, Order],
      default: () => new Order()
    }
  },
  data: () => ({
    columns: []
  }),
  methods: {
    returnBack() {
      this.$router.back()
    },
    date(date) {
      if (date) {
        return moment(date).format('MMM Do YYYY')
      }
    }
  }
}
</script>

<style scoped></style>
