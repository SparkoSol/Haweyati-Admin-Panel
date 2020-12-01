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
                    price12yard: '',
                    price20yard: ''
                  })
                "
                >Add City
              </v-btn>
            </v-col>
          </v-row>
          <v-row
            v-for="(price, i) of pricing"
            :key="i"
            style="display: grid;grid-template-columns: auto auto auto  50px"
          >
            <v-col>
              <v-select
                v-model="price.city"
                color="#313F53"
                outlined
                dense
                :rules="[city(price.city, pricing)]"
                :items="citiesData"
                :label="'City ' + (i + 1)"
                item-text="name"
              >
              </v-select>
            </v-col>
            <v-col>
              <v-text-field
                v-model="price.price12yard"
                :rules="[required, priceWZ]"
                type="number"
                color="#313F53"
                outlined
                label="12 Yard Price"
                dense
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="price.price20yard"
                :rules="[required, priceWZ]"
                type="number"
                color="#313F53"
                outlined
                label="20 Yard Price"
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
import EntitySelector from '../../../common/ui/widgets/EntitySelector'
import ImageSelector from '../../misc/image-selector'
import { required, priceWZ, city } from '@/common/lib/validator'
import { BuildingMaterial } from '@/models/products/building-material'
import { BuildingMaterialPricing } from '@/models/products/building-material-pricing'

export default {
  name: 'BuildingMaterialForm',
  components: {
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
    citiesData: [
      'Riyadh',
      'Jeddah',
      'Damman',
      'Al-Khobar',
      'Dhahran',
      'Al-Ahsa',
      'Qatif',
      'Jubail',
      'Taif',
      'Tabouk',
      'Abba',
      'Al Baha',
      'Jizan',
      'Najran',
      'Hail',
      'Makkah Al-Mukkaramah',
      'Al-Madinah Al-Munawarah',
      'Al Qaseen',
      'Jouf',
      'Yanbu'
    ]
  }),
  mounted() {
    this.getSuppliers()
    // this.getCities()
  },
  methods: {
    required,
    priceWZ,
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
      for (const key of Object.keys(this.buildingMaterial)) {
        window.console.log(key)
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
          // console.log(key + ': ' + price[key])
          if (key === '_id') {
            continue
          }
          formData.append(key, price[key])
        }
      }
      // formData.forEach((item) => window.console.log(item))
      return formData
    },
    async getSuppliers() {
      this.suppliersList = await this.$axios.$get('suppliers/all')
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
