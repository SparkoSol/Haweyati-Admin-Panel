<template>
  <v-container style="display: flex;justify-content: center">
    <SimpleForm
      :method="isUpdate ? 'patch' : 'post'"
      :data="formData"
      endpoint="/suppliers"
      return
    >
      <template v-slot:header>
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
            <v-card-title>{{ title }}</v-card-title>
          </v-col>
        </v-row>
      </template>
      <div class="span-2">
        <v-card style="padding:20px;margin-bottom: 20px">
          <v-text-field
            v-model="supplier.name"
            color="#313F53"
            outlined
            style="color: #313F53"
            :rules="[required]"
            dense
            label="Name"
          />
          <v-text-field
            v-model="supplier.email"
            color="#313F53"
            outlined
            style="color: #313F53"
            dense
            :rules="[required, emailValidator]"
            label="Email"
          />
          <v-text-field
            v-model="supplier.contact"
            v-mask="['### - #######', '#### - ########']"
            color="#313F53"
            outlined
            style="color: #313F53"
            dense
            :rules="[required, phoneValidator]"
            label="Contact"
          />
          <v-text-field
            v-model="supplier.address"
            color="#313F53"
            outlined
            style="color: #313F53"
            dense
            :rules="[required]"
            label="Address"
          />
        </v-card>
        <v-card style="padding:20px;margin-bottom: 20px">
          <v-card-title>Media</v-card-title>
          <v-file-input
            v-model="supplier.images"
            color="#313F53"
            label="File input"
            multiple
            prepend-icon=""
            prepend-inner-icon="mdi-camera"
            outlined
            dense
          ></v-file-input>
        </v-card>
        <v-card style="padding:20px;margin-bottom: 20px">
          <v-card-title>Services</v-card-title>
          <v-select
            v-model="supplier.services"
            color="#313F53"
            outlined
            dense
            multiple
            :items="services"
            label="Services"
            item-text="name"
          >
          </v-select>
        </v-card>
        <v-card
          v-if="mainSupplier == null"
          style="padding:20px;margin-bottom: 20px"
        >
          <v-card-title>Main Supplier</v-card-title>
          <v-checkbox
            v-model="subBranchCheck"
            label="This store is a Sub-Branch."
            @change="getSuppliers"
          ></v-checkbox>
          <v-card v-if="subBranchCheck" style="padding: 20px">
            <v-card-title style="color: #313F53">Stores</v-card-title>
            <EntitySelector
              endpoint="suppliers"
              :selection="suppliers"
              :columns-selected="columnsSelected"
              :columns-selector="columnsSelected"
              title-selected="Selected Suppliers"
              title-selector="Suppliers"
              @selected="supplier.parent = $event"
            />
          </v-card>
          <v-container
            style="margin-top:20px;display: flex;align-items: center;justify-content: center"
          >
          </v-container>
        </v-card>
      </div>
    </SimpleForm>
  </v-container>
</template>

<script>
import SimpleForm from '../../common/ui/widgets/SimpleForm'
import { Supplier } from '../../models/supplier'
import {
  emailValidator,
  required,
  phoneValidator
} from '../../common/utils/validators'
import EntitySelector from '../../common/ui/widgets/EntitySelector'

export default {
  components: {
    SimpleForm,
    EntitySelector
  },
  props: {
    mainSupplier: {
      type: Supplier,
      default: null
    },
    supplier: {
      type: Supplier,
      default: () => new Supplier()
    },
    isUpdate: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Form'
    }
  },
  data: () => ({
    subBranchCheck: false,
    columnsSelected: [{ text: 'Name', value: 'name' }],
    suppliers: [],
    services: [
      { name: 'Construction Dumpster' },
      { name: 'Building Material' },
      { name: 'Finishing Material' },
      { name: 'Scaffolding' },
      { name: 'Delivery Vehicle' }
    ]
  }),
  methods: {
    emailValidator,
    required,
    phoneValidator,
    returnBack() {
      this.$router.back()
    },
    async getSuppliers() {
      if (this.subBranchCheck === true) {
        this.suppliers = await this.$axios.$get('suppliers')
      }
    },
    formData() {
      const formData = new FormData()
      for (const key of Object.keys(this.supplier)) {
        if (key === 'services') {
          this.supplier[key].forEach((item) => {
            formData.append(key, item)
          })
        } else if (key === 'images') {
          this.supplier[key].forEach((item) => {
            formData.append(key, item)
          })
        } else if (key === 'parent') {
          if (this.mainSupplier == null) {
            if (this.subBranchCheck) {
              formData.append(key, this.supplier[key]._id)
            }
          } else {
            formData.append(key, this.mainSupplier._id)
          }
        } else formData.append(key, this.supplier[key])
      }
      formData.forEach((item) => window.console.log(item))
      return formData
    }
  }
}
</script>
