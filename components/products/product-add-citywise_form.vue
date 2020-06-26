<template>
  <v-container style="display:flex;justify-content: center;align-items: center">
    <SimpleForm
      return
      :method="isUpdate ? 'patch' : 'post'"
      :data="formData"
      :endpoint="'/' + endpoint"
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
            v-model="constructionDumpster.size"
            color="#313F53"
            outlined
            style="color: #313F53"
            label="Size"
            dense
          ></v-text-field>
          <v-textarea
            v-model="constructionDumpster.description"
            color="#313F53"
            outlined
            label="Description"
            dense
          ></v-textarea
        ></v-card>
        <v-card style="padding:20px;margin-bottom: 20px">
          <v-card-title>Media</v-card-title>
          <v-file-input
            v-model="constructionDumpster.images"
            color="#313F53"
            label="File input"
            multiple
            prepend-icon=""
            prepend-inner-icon="mdi-camera"
            outlined
            dense
          ></v-file-input>
        </v-card>
        <v-card style="padding: 20px;margin-bottom: 20px">
          <v-card-title style="color: #313F53">Pricing</v-card-title>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12" md="9" sm="9">
              <v-card-title style="color: #313F53">City</v-card-title>
            </v-col>
            <v-col
              cols="12"
              md="3"
              sm="3"
              style="display: flex; align-items: center"
            >
              <v-btn
                color="#FF974D"
                style="color:#ffffff"
                @click="
                  pricing.push({
                    city: '',
                    rent: '',
                    days: '',
                    extraDayRent: ''
                  })
                "
                >Add City
              </v-btn>
            </v-col>
          </v-row>
          <v-row
            v-for="(price, i) of pricing"
            :key="i"
            style="display: grid;grid-template-columns: auto auto auto auto 50px"
          >
            <v-col>
              <v-text-field
                v-model="price.city"
                color="#313F53"
                outlined
                :label="'City ' + (i + 1)"
                dense
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="price.rent"
                color="#313F53"
                outlined
                label="Rent"
                dense
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="price.days"
                color="#313F53"
                outlined
                label="Days"
                dense
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="price.extraDayRent"
                color="#313F53"
                outlined
                label="Extra Day Price"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="1" sm="1">
              <v-btn icon @click="removeCity(i)">
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
        <v-card style="padding: 20px">
          <v-card-title style="color: #313F53">Stores</v-card-title>
          <EntitySelector
            endpoint="suppliers"
            :selection="suppliers"
            multiple
            :columns-selected="columnsSelected"
            :columns-selector="columnsSelected"
            title-selected="Selected Suppliers"
            title-selector="Suppliers"
            @selected="constructionDumpster.suppliers = $event"
          />
        </v-card>
        <v-container
          style="margin-top:20px;display: flex;align-items: center;justify-content: center"
        >
        </v-container>
      </div>
    </SimpleForm>
  </v-container>
</template>

<script>
import SimpleForm from '../../common/ui/widgets/SimpleForm'
import { ConstructionDumpster } from '../../models/products/construction-dumpsters'
import { ConstructionDumpsterPricing } from '../../models/products/construction-dumpster-pricing'
import { Supplier } from '../../models/supplier'
import EntitySelector from '../../common/ui/widgets/EntitySelector'

export default {
  name: 'ProductAddCityWise',
  components: {
    SimpleForm,
    EntitySelector
  },
  props: {
    title: {
      type: String,
      default: 'Add Product City Wise'
    },
    isUpdate: {
      type: Boolean,
      default: false
    },
    endpoint: {
      type: String,
      default: 'product-add'
    },
    constructionDumpster: {
      type: [Object, ConstructionDumpster],
      default: () => new ConstructionDumpster()
    },
    pricing: {
      type: Array,
      default: () => [new ConstructionDumpsterPricing()]
    },
    suppliers: {
      type: Array,
      default: () => [new Supplier()]
    }
  },
  data: () => ({
    columnsSelected: [{ text: 'Name', value: 'name' }],
    optionValues: [],
    cities: [{ name: '', value: '' }],
    suppliersList: []
  }),
  mounted() {
    this.getSuppliers()
  },
  methods: {
    returnBack() {
      this.$router.back()
    },
    reroute(route) {
      this.$router.push(route)
    },
    removeCity(i) {
      if (this.pricing.length <= 1) {
        return
      }
      this.pricing.splice(i, 1)
    },
    formData() {
      const formData = new FormData()
      for (const key of Object.keys(this.constructionDumpster)) {
        if (key === 'pricing') continue
        else if (key === 'suppliers') {
          for (const item of this.constructionDumpster[key]) {
            formData.append(key, item._id)
          }
        } else if (key === 'images') {
          for (const item of this.constructionDumpster[key]) {
            formData.append(key, item)
          }
        } else if (Array.isArray(this.constructionDumpster[key])) {
          for (const item of this.constructionDumpster[key]) {
            formData.append(key, item)
          }
        } else formData.append(key, this.constructionDumpster[key])
      }
      for (const price of this.pricing) {
        for (const key of Object.keys(price)) {
          formData.append(key, price[key])
        }
      }
      return formData
    },
    async getSuppliers() {
      this.suppliersList = await this.$axios.$get('suppliers')
    }
  }
}
</script>

<style>
.form {
  width: 800px !important;
}
</style>
