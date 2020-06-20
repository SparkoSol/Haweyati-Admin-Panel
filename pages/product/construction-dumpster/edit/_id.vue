<template>
  <!--  <ProductAddCityWise-->
  <!--    :supplier="constructionDumpster"-->
  <!--    :is-update="true"-->
  <!--    title="Add Construction Dumpster"-->
  <!--    endpoint="dumpsters"-->
  <!--  />-->
  <h1>dit</h1>
</template>

<script>
// import ProductAddCityWise from '../../../components/products/product-add-citywise-form'
export default {
  components: {
    // ProductAddCityWise
  },
  async asyncData({ $axios, route }) {
    return {
      constructionDumpster: await $axios.$get(
        'construction-dumpsters/' + route.params.id
      )
    }
  }
}
</script>

<style scoped></style>
