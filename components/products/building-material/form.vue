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
            v-model="buildingMaterial.name"
            :rules="[required]"
            color="#313F53"
            outlined
            style="color: #313F53"
            label="Name"
            dense
          ></v-text-field>
          <v-textarea
            v-model="buildingMaterial.description"
            :rules="[required]"
            color="#313F53"
            outlined
            label="Description"
            dense
          ></v-textarea
        ></v-card>
        <v-card style="padding:20px;margin-bottom: 20px">
          <v-card-title>Media</v-card-title>
          <ImageSelector
            v-model="imageFile"
            :image="buildingMaterial"
            @input="sendImage = $event"
          />
        </v-card>
        <v-card style="padding: 20px;margin-bottom: 20px">
          <v-card-title style="color: #313F53">Pricing</v-card-title>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12" md="7" sm="7">
              <v-card-title style="color: #313F53">City</v-card-title>
            </v-col>
            <v-col
              cols="12"
              md="2"
              sm="2"
              style="display: flex; align-items: center;"
            >
              <v-btn color="#FF974D" style="color:#ffffff" @click="addCity"
                >Add City
              </v-btn>
            </v-col>
            <v-col
              v-if="pricing[0].price.length < units.length"
              cols="12"
              md="2"
              sm="2"
              style="display: flex; align-items: center"
            >
              <v-btn color="#FF974D" style="color:#ffffff" @click="addUnitPrice"
                >Add Price
              </v-btn>
            </v-col>
          </v-row>
          <v-data-table
            :items="pricing"
            :headers="columns"
            hide-default-footer
            disable-pagination
            dense
          >
            <template v-slot:item.city="{ item }">
              <slot name="city" :item="item" />
              <div style="padding: 5px 0">
                <v-select
                  v-model="item.city"
                  color="#313F53"
                  outlined
                  dense
                  hide-details
                  :rules="[city(item.city, pricing), required]"
                  :items="citiesData"
                  :label="'City'"
                  item-text="name"
                >
                </v-select>
              </div>
            </template>
            <template v-slot:item.price="{ item }">
              <slot name="price" :item="item" />
              <div v-for="(price, j) of item.price" :key="j">
                <v-card
                  style="display: grid; grid-template-columns: calc(50% - 5px) calc(50% - 5px); grid-column-gap: 5px;margin: 10px 0;padding: 10px"
                >
                  <v-text-field
                    v-model="price.price"
                    :rules="[required, priceWZ]"
                    type="number"
                    color="#313F53"
                    hide-details
                    outlined
                    label="Price"
                    dense
                  ></v-text-field>
                  <v-select
                    v-model="price.unit"
                    color="#313F53"
                    outlined
                    dense
                    :items="units"
                    hide-details
                    :rules="[unit(price.unit, item.price), required]"
                    :label="'Unit ' + (j + 1)"
                    item-text="name"
                    :append-outer-icon="
                      item.price.length > 1 ? 'mdi-close' : ''
                    "
                    @click:append-outer="deletePrice(item, price)"
                  />
                </v-card>
              </div>
            </template>
            <template v-slot:item.action="{ item }">
              <slot name="action" :item="item" />
              <div style="padding: 5px 0">
                <div v-if="pricing.length > 1" class="pricing-delete">
                  <v-btn icon @click="removeCity(item)">
                    <v-icon color="red">mdi-delete</v-icon>
                  </v-btn>
                </div>
              </div>
            </template>
          </v-data-table>
        </v-card>
        <VolumetricWeightCalculator
          title="Material Size"
          :length="buildingMaterial.cbmLength"
          :width="buildingMaterial.cbmWidth"
          :height="buildingMaterial.cbmHeight"
          :weight="buildingMaterial.volumetricWeight"
          @data="data = $event"
        />
        <v-card style="padding: 20px; margin-bottom: 10px">
          <v-card-title style="color: #313F53">Stores</v-card-title>
          <EntitySelector
            endpoint="suppliers/getbyservice/Building Material"
            :selection="suppliers"
            multiple
            required
            :columns-selected="columnsSelected"
            :columns-selector="columnsSelected"
            title-selected="Selected Suppliers"
            title-selector="Suppliers"
            @selected="buildingMaterial.suppliers = $event"
          />
        </v-card>
      </div>
    </SimpleForm>
  </v-container>
</template>

<script>
import SimpleForm from '../../../common/ui/widgets/SimpleForm'
import EntitySelector from '../../../common/ui/widgets/EntitySelector'
import ImageSelector from '../../misc/image-selector'
import { required, priceWZ, city, unit } from '@/common/lib/validator'
import { BuildingMaterial } from '@/models/products/building-material'
import { BuildingMaterialPricing } from '@/models/products/building-material-pricing'
import VolumetricWeightCalculator from '@/components/misc/volumetric-weight-calculator'

export default {
  name: 'BuildingMaterialForm',
  components: {
    VolumetricWeightCalculator,
    SimpleForm,
    EntitySelector,
    ImageSelector
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
    buildingMaterial: {
      type: [Object, BuildingMaterial],
      default: () => new BuildingMaterial()
    },
    pricing: {
      type: Array,
      default: () => [new BuildingMaterialPricing()]
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
    citiesData: [],
    units: [],
    columns: [
      { text: 'City', value: 'city' },
      { text: 'Pricing', value: 'price' },
      { text: 'Actions', value: 'action', width: '10px' }
    ],
    data: null
  }),
  mounted() {
    this.getSuppliers()
    this.getUnits()
    this.getCities()
  },
  methods: {
    required,
    priceWZ,
    city,
    unit,
    returnBack() {
      this.$router.back()
    },
    addUnitPrice() {
      for (const price of this.pricing) {
        console.log(price)
        price.price.push({
          name: '',
          price: ''
        })
      }
    },
    addCity() {
      const priceArray = []
      if (this.pricing[0].price.length > 0) {
        // eslint-disable-next-line no-unused-vars
        for (const item of this.pricing[0].price) {
          priceArray.push({
            unit: '',
            price: ''
          })
        }
      }
      this.pricing.push({
        city: '',
        price: priceArray
      })
    },
    reroute(route) {
      this.$router.push(route)
    },
    removeCity(i) {
      const index = this.pricing.indexOf(i)
      if (this.pricing.length <= 1) {
        return
      }
      this.pricing.splice(index, 1)
    },
    deletePrice(i, j) {
      const indexCity = this.pricing.indexOf(i)
      const indexPrice = this.pricing[indexCity].price.indexOf(j)
      for (const city of this.pricing) {
        city.price.splice(indexPrice, 1)
      }
      // this.pricing[indexCity].price.splice(indexPrice, 1)
    },
    formData() {
      const formData = new FormData()
      for (const key of Object.keys(this.buildingMaterial)) {
        console.log(key)
        if (key === 'pricing') continue
        else if (key === 'price12yard') {
          continue
        } else if (key === 'price20yard') {
          continue
        } else if (key === 'suppliers') {
          for (const item of this.buildingMaterial[key]) {
            formData.append(key, item._id)
          }
        } else if (key === 'parent') {
          if (!this.isUpdate) {
            formData.append(key, this.$route.params.iid)
          } else {
            formData.append(key, this.buildingMaterial.parent)
          }
        } else if (key === 'image') {
          if (this.sendImage) {
            formData.append(key, this.sendImage)
          }
        } else formData.append(key, this.buildingMaterial[key])
      }
      for (const price of this.pricing) {
        for (const key of Object.keys(price)) {
          if (key === '_id') {
            continue
          } else if (key === 'price') {
            for (const cityPrice of price[key]) {
              formData.append('price', cityPrice.price)
              formData.append('unit', cityPrice.unit)
            }
          } else {
            formData.append(key, price[key])
          }
        }
      }
      formData.append('count', this.pricing[0].price.length)
      formData.append('cbmLength', this.data.length)
      formData.append('cbmWidth', this.data.width)
      formData.append('cbmHeight', this.data.height)
      formData.append('volumetricWeight', this.data.weight)
      formData.forEach((item) => window.console.log(item))
      return formData
    },
    async getSuppliers() {
      this.suppliersList = await this.$axios.$get('suppliers/all')
    },
    async getCities() {
      this.citiesData = await this.$axios.$get('city')
    },
    async getUnits() {
      this.units = await this.$axios.$get('unit')
    }
  }
}
</script>

<style>
.form {
  width: 800px !important;
}
.pricing-table {
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 20px 0;
  border: 1px solid black;
}
.pricing-price {
  min-width: 40%;
  max-width: 40%;
  margin: 0 5px;
}
.pricing-city {
  min-width: 30%;
  max-width: 30%;
  margin: 0 5px;
}
.pricing-delete {
  min-width: 10%;
  max-width: 10%;
  margin: 0 5px;
}
.pricing-table::-webkit-scrollbar {
  display: inline-block;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
