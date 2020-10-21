<template>
  <div style="padding: 20px">
    <v-tabs v-model="tab" background-color="#313F53" color="#ff974d" dark>
      <v-tab v-for="item in tabs" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabs" :key="item.tab">
        <data-viewer
          :title="title"
          :columns="columns"
          :endpoint="item.endpoint"
          create
          :create-route="route"
          :type="item.type"
          :action="false"
        />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import DataViewer from '../../common/ui/widgets/DataViewer'
export default {
  name: 'RewardMain',
  components: {
    DataViewer
  },
  props: {
    title: {
      type: String,
      default: 'Orders'
    },
    endpoint: {
      type: String,
      default: 'main-category'
    },
    route: {
      type: String,
      default: 'index'
    }
  },
  data: () => ({
    columns: [
      { text: 'Points', value: 'points', width: '180px' },
      { text: 'Product', value: 'material.name' },
      { text: 'Date', value: 'createdAt', width: '150px' },
      { text: '', value: 'custom-edit', align: 'right' }
    ],
    tabs: [
      {
        tab: 'Finishing Materials',
        endpoint: '/reward-points/get-fm',
        type: 'FinishingMaterial'
      },
      {
        tab: 'Building Materials',
        endpoint: '/reward-points/get-bm',
        type: 'BuildingMaterial'
      }
    ],
    tab: null
  })
}
</script>

<style scoped></style>
