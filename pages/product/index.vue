<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <v-container>
      <h1 style="margin: 20px">Product Types</h1>
      <div class="my-row">
        <v-card
          height="200px"
          to="/product/construction-dumpster"
          class="main-category-card dumpster"
        >
          <v-card-title
            class="justify-center"
            style="color: white"
            v-text="'Construction Dumpster'"
          ></v-card-title>
        </v-card>
        <v-card
          height="200px"
          to="/product/building-material-sub"
          class="main-category-card building"
        >
          <v-card-title
            class="justify-center"
            style="color: white"
            v-text="'Building Material'"
          ></v-card-title>
        </v-card>
        <v-card
          height="200px"
          to="/product/scaffolding"
          class="main-category-card scaffolding"
        >
          <v-card-title
            class="justify-center"
            style="color: white"
            v-text="'Scaffolding'"
          ></v-card-title>
        </v-card>
        <v-card
          height="200px"
          to="/product/finishing-material-sub"
          class="main-category-card finishing"
        >
          <v-card-title
            class="justify-center"
            style="color: white"
            v-text="'Finishing Material'"
          ></v-card-title>
        </v-card>
        <v-card
          height="200px"
          to="/product/delivery-vehicle"
          class="main-category-card vehicle"
        >
          <v-card-title
            class="justify-center"
            style="color: white"
            v-text="'Delivery Vehicle'"
          ></v-card-title>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {}
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
  background-size: cover;
  border-radius: 20px !important;
}
.dumpster {
  background-image: url('../../assets/images/products-main/dumpster-bg.webp');
}
.scaffolding {
  background-image: url('../../assets/images/products-main/scaffolding-bg.webp');
}
.building {
  background-image: url('../../assets/images/products-main/building-materials-bg.webp');
}
.finishing {
  background-image: url('../../assets/images/products-main/finishing-materials-bg.webp');
}
.vehicle {
  background-image: url('../../assets/images/products-main/delivery-vehaicles-bg.webp');
}
</style>
