<template>
  <v-container>
    <v-tabs v-model="tab" background-color="#313F53" color="white" dark>
      <v-tab v-for="item in tabs" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabs" :key="item.tab">
        <data-viewer
          v-if="item.title == 'Sub Suppliers'"
          :title="item.title"
          :columns="item.columns"
          :endpoint="item.endpoint"
          back
          :create="item.create"
          :create-route="item.createRoute"
          :change="item.change"
          :change-route="item.changeRoute"
          :remove="item.remove"
          :remove-route="item.removeRoute"
          :detail="item.detail"
          :detail-route="item.detailRoute"
          :approve="item.approve"
          :approve-route="item.approveRoute"
          :on-delete="onDelete"
        />
        <v-row v-if="item.title != 'Sub Suppliers'">
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
            <v-card-title>{{ item.title }}</v-card-title>
          </v-col>
        </v-row>
        <div
          v-if="item.title != 'Sub Suppliers'"
          style="margin-top: 20px;width: 97.5%;"
          class="my-row"
        >
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
      </v-tab-item>
    </v-tabs-items>
    <v-snackbar
      v-model="snackbar"
      bottom
      :color="snackbarColor"
      :timeout="1500"
    >
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script>
import DataViewer from '../../common/ui/widgets/DataViewer'
import { Supplier } from '../../models/supplier'

export default {
  name: 'SupplierDetail',
  components: {
    DataViewer
  },
  props: {
    supplier: {
      type: [Object, Supplier],
      default: () => new Supplier()
    }
  },
  data() {
    return {
      snackbarText: 'Success!',
      snackbarColor: 'green',
      snackbar: false,
      tabs: [
        {
          tab: 'Sub Suppliers',
          title: 'Sub Suppliers',
          endpoint: 'suppliers/getsubsuppliers/' + this.supplier._id,
          create: true,
          createRoute: '/store/add',
          change: true,
          changeRoute: '/store/edit/$id',
          remove: true,
          removeRoute: '/suppliers/$id',
          detail: true,
          detailRoute: '/store/detailsub/$id',
          approve: false,
          approveRoute: '/suppliers/getapproved/$id',
          columns: [
            {
              text: 'Image',
              value: 'images',
              filterable: false,
              sortable: false
            },
            { text: 'Name', value: 'name' },
            { text: 'Email', value: 'email' },
            { text: 'Contact', value: 'contact' },
            { text: 'Address', value: 'address', sortable: false },
            {
              text: 'Services',
              value: 'services',
              sortable: false,
              width: '300px'
            }
          ]
        },
        {
          tab: 'Services',
          title: 'Services'
        }
      ],
      tab: null,
      columns: [
        {
          text: 'Image',
          value: 'images',
          filterable: false,
          sortable: false
        },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Contact', value: 'contact' },
        { text: 'Address', value: 'address', sortable: false },
        { text: 'Services', value: 'services', sortable: false, width: '300px' }
      ]
    }
  },
  methods: {
    onDelete() {
      this.snackbarColor = 'red'
      this.snackbarText = 'Successfully Deleted Item!'
      this.snackbar = true
    },
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
.Finishing-Material {
  background-image: url('../../assets/images/products-main/finishing-materials-bg.png');
}
.Delivery-Vehicle {
  background-image: url('../../assets/images/products-main/delivery-vehaicles-bg.png');
}
</style>
