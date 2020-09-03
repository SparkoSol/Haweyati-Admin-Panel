<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <RequestDetail :request="request" />
  </div>
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
