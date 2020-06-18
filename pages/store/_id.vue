<template>
  <h1>Delete</h1>
</template>

<script>
export default {
  name: 'Id',

  async asyncData({ $axios, route }) {
    return {
      supplier: await $axios.$get('suppliers/' + route.params.id)
    }
  }
}
</script>

<style scoped></style>
