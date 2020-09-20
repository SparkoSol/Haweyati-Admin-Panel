<template>
  <v-container>
    <RequestDetailBuildingMaterial
      v-if="request.type === 'Building Material'"
      :request="request"
    />
    <RequestDetailConstructionDumpster
      v-if="request.type === 'Construction Dumpster'"
      :request="request"
    />
    <RequestDetailScaffolding
      v-if="request.type === 'Scaffolding'"
      :request="request"
    />
  </v-container>
</template>

<script>
import RequestDetailBuildingMaterial from './request-building-material'
import RequestDetailConstructionDumpster from './request-construction-dumpster'
import RequestDetailScaffolding from './request-scaffolding'
export default {
  name: 'RequestDetail',
  components: {
    RequestDetailScaffolding,
    RequestDetailConstructionDumpster,
    RequestDetailBuildingMaterial
  },
  props: {
    request: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped></style>
