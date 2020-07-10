<template>
  <v-container>
    <v-row>
      <v-col
        style="display: flex ; align-items: center; justify-content: center"
        cols="12"
        md="1"
        sm="1"
      >
        <v-btn icon @click="returnBack">
          <v-icon>mdi-keyboard-backspace</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" md="11" sm="11">
        <v-card-title>Services</v-card-title>
      </v-col>
    </v-row>
    <div style="margin-top: 20px;width: 97.5%;" class="my-row">
      <v-card
        v-for="(service, i) in supplier.services"
        :key="i"
        height="200px"
        :to="'/store/' + service.replace(' ', '-') + '/' + supplier._id"
        :class="'main-category-card ' + service.replace(' ', '-')"
      >
        <v-card-title
          style="color: white"
          class="justify-center"
          :v-text="service"
        >
          {{ service }}
        </v-card-title>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { Supplier } from '../../models/supplier'

export default {
  name: 'SupplierSubDetail',
  props: {
    supplier: {
      type: [Object, Supplier],
      default: () => new Supplier()
    }
  },
  methods: {
    returnBack() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
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
.Construction-Dumpster {
  background-image: url('../../assets/images/products-main/dumpster-bg.png');
}
.Scaffolding {
  background-image: url('../../assets/images/products-main/scaffolding-bg.png');
}
.Building-Material {
  background-image: url('../../assets/images/products-main/building-materials-bg.png');
}
.Building-Materials {
  background-image: url('../../assets/images/products-main/building-materials-bg.png');
}
.Finishing-Material {
  background-image: url('../../assets/images/products-main/finishing-materials-bg.png');
}
.Delivery-Vehicle {
  background-image: url('../../assets/images/products-main/delivery-vehaicles-bg.png');
}
</style>
