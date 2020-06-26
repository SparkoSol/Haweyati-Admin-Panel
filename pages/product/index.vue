<template>
  <v-container>
    <h1 style="margin: 20px">Product Types</h1>
    <div class="my-row">
      <v-card
        v-for="(productType, i) of productTypes"
        :key="i"
        height="200px"
        :to="productType.path"
        class="main-category-card"
      >
        <v-card-title
          v-text="productType.name"
          style="color: white"
        ></v-card-title>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    productTypes: [
      {
        name: 'Construction Dumpster',
        pathName: 'ConstructionDumpster',
        path: '/product/construction-dumpster'
      },
      {
        name: 'Building Material',
        pathName: 'BuildingMaterialSub',
        path: '/product/building-material-sub'
      },
      {
        name: 'Scaffolding',
        pathName: 'ScaffoldingSub',
        path: '/product/scaffolding'
      },
      {
        name: 'Finishing Material',
        pathName: 'FinishingMaterialSub',
        path: '/product/finishing-material-sub'
      },
      {
        name: 'Delivery Vehicle',
        pathName: 'DeliveryVehicle',
        path: '/product/delivery-vehicle'
      }
    ]
  }),
  methods: {
    reroute(route, params) {
      this.$router.push({ name: route, params })
    }
  }
}
</script>

<style>
.my-row {
  display: grid !important;
  grid-template-columns: 50% 50%;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}
.main-category-card {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg') !important;
  background-size: cover;
}
</style>
