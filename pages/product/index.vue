<template>
  <v-container>
    <h1 style="margin: 20px">Product Types</h1>
    <div class="my-row">
      <v-card
        v-for="(productType, i) of productTypes"
        :key="i"
        height="200px"
        :to="productType.path"
      >
        <v-img
          src="https://res.cloudinary.com/parallax-agency/image/upload/c_fill%2Cq_auto%2Cf_auto%2Cw_1780%2Ch_780/statamic/clear-channel-production/old_blog/ASDA-1024x684.jpg"
          width="100%"
          height="100%"
          class="white--text align-center"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        >
          <v-card-title
            class="justify-center"
            v-text="productType.name"
          ></v-card-title>
        </v-img>
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
        path: '/product/construction-dumpster',
        data: [
          {
            image: 'https://cdn.vuetifyjs.com/images/john.jpg',
            type: '12 Yard Dumpster',
            status: 'Active'
          },
          {
            image: 'https://cdn.vuetifyjs.com/images/john.jpg',
            type: '20 Yard Dumpster',
            status: 'Active'
          }
        ]
      },
      {
        name: 'Building Material',
        pathName: 'BuildingMaterialSub',
        path: '/product/building-material',
        data: [
          {
            name: 'Cement & Gypsum',
            path: '/building-material'
          },
          {
            name: 'Sand',
            path: '/building-material'
          },
          {
            name: 'Gravel',
            path: '/building-material'
          },
          {
            name: 'Blocks & Related',
            path: 'BuildingMaterial'
          }
        ]
      },
      {
        name: 'Scaffolding',
        pathName: 'ScaffoldingSub',
        path: '/product/scaffolding',
        data: [
          {
            name: 'Patented Scaffolding',
            path: '/building-material'
          },
          {
            name: 'Steel Scaffolding',
            path: '/building-material'
          },
          {
            name: 'Single Scaffolding',
            path: '/building-material'
          }
        ]
      },
      {
        name: 'Finishing Material',
        pathName: 'FinishingMaterialSub',
        path: '/product/finishing-material',
        data: [
          {
            name: 'Wall Finishes',
            path: '/building-material'
          },
          {
            name: 'Floor Finishes',
            path: '/building-material'
          },
          {
            name: 'Ceiling Finishes',
            path: '/building-material'
          },
          {
            name: 'Roof Finishes',
            path: '/building-material'
          }
        ]
      },
      {
        name: 'Delivery Vehicle',
        pathName: 'DeliveryVehicle',
        path: '/product/delivery-vehicle',
        data: [
          {
            image: 'https://cdn.vuetifyjs.com/images/john.jpg',
            type: 'Crane',
            status: 'Active'
          },
          {
            image: 'https://cdn.vuetifyjs.com/images/john.jpg',
            type: 'Truck',
            status: 'Active'
          }
        ]
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
</style>
