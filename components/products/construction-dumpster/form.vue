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
            :rules="[required]"
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
            :rules="[required]"
            label="Description"
            dense
          ></v-textarea
        ></v-card>
        <v-card style="padding:20px;margin-bottom: 20px">
          <v-card-title>Media</v-card-title>
          <ImageSelector
            v-model="imageFile"
            :image="constructionDumpster"
            @input="sendImage = $event"
          />
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
                    extraDayRent: '',
                    helperPrice: ''
                  })
                "
                >Add City
              </v-btn>
            </v-col>
          </v-row>
          <v-row
            v-for="(price, i) of pricing"
            :key="i"
            style="display: grid;grid-template-columns: calc(20% - 15px) calc(20% - 15px) calc(20% - 15px) calc(20% - 15px) calc(20% - 15px) 50px;grid-column-gap: 5px"
          >
            <v-select
              v-model="price.city"
              color="#313F53"
              outlined
              :rules="[city(price.city, pricing)]"
              dense
              :items="citiesData"
              :label="'City ' + (i + 1)"
              item-text="name"
            >
            </v-select>
            <v-text-field
              v-model="price.rent"
              color="#313F53"
              type="number"
              :rules="[required, priceWZ]"
              outlined
              label="Rent"
              dense
            ></v-text-field>
            <v-text-field
              v-model="price.days"
              type="number"
              :rules="[required, priceWZ]"
              color="#313F53"
              outlined
              label="Days"
              dense
            ></v-text-field>
            <v-text-field
              v-model="price.extraDayRent"
              color="#313F53"
              outlined
              type="number"
              :rules="[required, priceWZ]"
              label="Extra Day Price"
              dense
            ></v-text-field>
            <v-text-field
              v-model="price.helperPrice"
              color="#313F53"
              outlined
              label="Helper Price"
              :rules="[rentHelper]"
              type="number"
              dense
            ></v-text-field>
            <v-btn icon @click="removeCity(i)">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </v-row>
        </v-card>
        <v-card style="padding: 20px">
          <v-card-title style="color: #313F53">Stores</v-card-title>
          <EntitySelector
            endpoint="suppliers/getbyservice/Construction Dumpster"
            :selection="suppliers"
            multiple
            required
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
import SimpleForm from '../../../common/ui/widgets/SimpleForm'
import { ConstructionDumpster } from '../../../models/products/construction-dumpsters'
import { ConstructionDumpsterPricing } from '../../../models/products/construction-dumpster-pricing'
import { required, priceWZ, rentHelper } from '../../../common/lib/validator'
// import { Supplier } from '../../../models/supplier'
import EntitySelector from '../../../common/ui/widgets/EntitySelector'
import ImageSelector from '../../misc/image-selector'
import { city } from '@/common/lib/validator'

export default {
  name: 'DumpsterForm',
  components: {
    ImageSelector,
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
      default: () => []
    }
  },
  data: () => ({
    columnsSelected: [{ text: 'Name', value: 'person.name' }],
    optionValues: [],
    cities: [{ name: '', value: '' }],
    suppliersList: [],
    imageFile: null,
    sendImage: null,
    citiesData: []
  }),
  mounted() {
    this.getSuppliers()
    this.getCities()
  },
  methods: {
    priceWZ,
    rentHelper,
    required,
    city,
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
        } else if (key === 'image') {
          if (this.sendImage !== null) {
            window.console.log('here')
            formData.append(key, this.sendImage)
          } else {
            window.console.log(this.sendImage)
          }
        } else if (Array.isArray(this.constructionDumpster[key])) {
          for (const item of this.constructionDumpster[key]) {
            formData.append(key, item)
          }
        } else formData.append(key, this.constructionDumpster[key])
      }
      for (const price of this.pricing) {
        for (const key of Object.keys(price)) {
          if (key === '_id') {
            continue
          }
          formData.append(key, price[key])
        }
      }
      return formData
    },
    async getSuppliers() {
      console.log(this.suppliersList)
      this.suppliersList = await this.$axios.$get('suppliers/all')
      console.log(this.suppliersList)
    },
    async getCities() {
      this.citiesData = await this.$axios.$get('suppliers/cities')
    }
  }
}
</script>

<style>
.form {
  width: 800px !important;
}
</style>
