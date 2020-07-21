<template>
  <RequestDetail :request="request" />
</template>

<script>
import RequestDetail from '../../../components/request/detail'
export default {
  components: { RequestDetail },
  async asyncData({ $axios, route }) {
    return {
      request: await $axios.$get('service-requests/' + route.params.id)
    }
  }
}
</script>

<style scoped></style>
