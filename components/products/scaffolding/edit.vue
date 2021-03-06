<template>
  <v-container style="display:flex;justify-content: center;align-items: center">
    <SimpleForm
      return
      :method="'patch'"
      :data="scaffolding"
      :endpoint="'/scaffoldings'"
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
          <v-col cols="12" md="9" sm="9">
            <v-card-title>Edit {{ scaffolding.name }}</v-card-title>
          </v-col>
        </v-row>
      </template>
      <div class="span-2">
        <v-container>
          <v-card style="padding: 20px">
            <v-card-title>Scaffolding Information</v-card-title>
            <v-text-field
              v-model="scaffolding.name"
              :rules="[required]"
              color="#313F53"
              outlined
              style="color: #313F53"
              label="Name"
              dense
            ></v-text-field>
            <v-textarea
              v-model="scaffolding.description"
              :rules="[required]"
              color="#313F53"
              outlined
              style="color: #313F53"
              label="Description"
              dense
            ></v-textarea>
          </v-card>
        </v-container>
        <v-container>
          <v-card style="padding: 20px">
            <v-row>
              <v-col cols="12" md="9" sm="9"
                ><v-card-title>Pricing</v-card-title></v-col
              >
              <v-col
                cols="12"
                md="3"
                sm="3"
                style="display: flex; align-items: center;justify-content: center"
              >
                <v-btn
                  color="#FF974D"
                  style="color:#ffffff"
                  @click="
                    scaffolding.pricing.push({
                      city: '',
                      rent: '',
                      days: '',
                      extraDayRent: '',
                      mesh: {
                        half: '',
                        full: ''
                      },
                      wheels: '',
                      connections: ''
                    })
                  "
                  >Add City
                </v-btn></v-col
              >
            </v-row>
            <v-card
              style="padding: 5px;box-shadow: none;overflow-x: scroll"
              class="scaffolding-price"
            >
              <div
                v-for="(price, i) of scaffolding.pricing"
                :key="i"
                style="display: flex;"
              >
                <v-col style="min-width: 30%">
                  <v-select
                    v-model="price.city"
                    color="#313F53"
                    outlined
                    dense
                    :rules="[city(price.city, scaffolding.pricing)]"
                    :items="citiesData"
                    :label="'City ' + (i + 1)"
                    item-text="name"
                  >
                  </v-select>
                </v-col>
                <v-col style="min-width: 20%">
                  <v-text-field
                    v-model="price.rent"
                    :rules="[required, priceWZ]"
                    type="number"
                    color="#313F53"
                    outlined
                    label="Rent"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col style="min-width: 20%">
                  <v-text-field
                    v-model="price.days"
                    :rules="[required, priceWZ]"
                    type="number"
                    color="#313F53"
                    outlined
                    label="Days"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col style="min-width: 20%">
                  <v-text-field
                    v-model="price.extraDayRent"
                    :rules="[required, priceWZ]"
                    type="number"
                    color="#313F53"
                    outlined
                    label="Extra Day Price"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col style="min-width: 20%">
                  <v-text-field
                    v-model="price.mesh.half"
                    :rules="[required, priceWZ]"
                    type="number"
                    color="#313F53"
                    outlined
                    label="Half Mesh Plate Price"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col style="min-width: 20%">
                  <v-text-field
                    v-model="price.mesh.full"
                    :rules="[required, priceWZ]"
                    type="number"
                    color="#313F53"
                    outlined
                    label="Full Mesh Plate Price"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col style="min-width: 20%">
                  <v-text-field
                    v-model="price.wheels"
                    :rules="[required, priceWZ]"
                    type="number"
                    color="#313F53"
                    outlined
                    label="Wheels Price (Set Of 4)"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col style="min-width: 20%">
                  <v-text-field
                    v-model="price.connections"
                    :rules="[required, priceWZ]"
                    type="number"
                    color="#313F53"
                    outlined
                    label="Connections Price (Set Of 4)"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col style="min-width: 10%" cols="12" md="1" sm="1">
                  <v-btn icon @click="removeCity(i)">
                    <v-icon color="red">mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </div>
            </v-card>
          </v-card>
        </v-container>
        <VolumetricWeightCalculator
          title="Scaffolding Size"
          :length="scaffolding.cbmLength"
          :width="scaffolding.cbmWidth"
          :height="scaffolding.cbmHeight"
          :weight="scaffolding.volumetricWeight"
          @data="getData($event)"
        />
        <v-container>
          <v-card style="padding: 20px">
            <v-card-title>Stores</v-card-title>
            <EntitySelector
              endpoint="suppliers/getbyservice/Scaffolding"
              :selection="scaffolding.suppliers"
              multiple
              required
              :columns-selected="columnsSelected"
              :columns-selector="columnsSelected"
              title-selected="Selected Suppliers"
              title-selector="Suppliers"
              @selected="scaffolding.suppliers = $event"
            />
          </v-card>
        </v-container>
      </div>
    </SimpleForm>
  </v-container>
</template>

<script>
import SimpleForm from '../../../common/ui/widgets/SimpleForm'
import EntitySelector from '../../../common/ui/widgets/EntitySelector'
import { required, priceWZ, city } from '@/common/lib/validator'
import { Scaffolding } from '@/models/products/scaffolding'
import VolumetricWeightCalculator from '@/components/misc/volumetric-weight-calculator'

export default {
  name: 'ScaffoldingEdit',
  components: {
    SimpleForm,
    EntitySelector,
    VolumetricWeightCalculator
  },
  props: {
    scaffolding: {
      type: [Object, Scaffolding],
      default: () => new Scaffolding()
    },
    changeRoute: {
      type: String,
      default: null
    }
  },
  data: () => ({
    columnsPrice: [
      { text: 'City', value: 'city' },
      { text: 'Rent', value: 'rent' },
      { text: 'Days', value: 'days' },
      { text: 'Extra Days Rent', value: 'extraDayRent' },
      { text: 'Half Mesh Plate Price', value: 'mesh.half' },
      { text: 'Full Mesh Plate Price', value: 'mesh.full' },
      { text: 'Wheels Price (Set Of 4)', value: 'wheels' },
      { text: 'Connections Price (Set Of 4)', value: 'connections' }
    ],
    columnsStore: [
      { text: 'Image', value: 'image' },
      { text: 'Name', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Contact', value: 'contact' },
      { text: 'Address', value: 'address' },
      { text: 'Services', value: 'services' }
    ],
    columnsSelected: [{ text: 'Name', value: 'person.name' }],
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
    this.getCities()
  },
  methods: {
    required,
    priceWZ,
    city,
    returnBack() {
      this.$router.back()
    },
    changeItem(item) {
      this.$router.push(this.$props.changeRoute.replace('$id', item._id))
    },
    removeCity(i) {
      if (this.scaffolding.pricing.length <= 1) {
        return
      }
      this.scaffolding.pricing.splice(i, 1)
    },
    getData(e) {
      this.scaffolding.cbmLength = e.length
      this.scaffolding.cbmWidth = e.width
      this.scaffolding.cbmHeight = e.height
      this.scaffolding.volumetricWeight = e.weight
    },
    formData() {
      const formData = new FormData()
      for (const key of Object.keys(this.scaffolding)) {
        if (key === 'pricing') {
          for (const price of this.scaffolding[key]) {
            for (const data of Object.keys(price)) {
              console.log('in price')
              console.log(data)
              console.log(price[data])
              formData.append(data, price[data])
            }
          }
        } else if (key === 'suppliers') {
          for (const item of this.scaffolding[key]) {
            formData.append(key, item._id)
          }
        } else if (key === 'images') {
          for (const item of this.scaffolding[key]) {
            formData.append(key, item)
          }
        } else if (Array.isArray(this.scaffolding[key])) {
          for (const item of this.scaffolding[key]) {
            formData.append(key, item)
          }
        } else formData.append(key, this.scaffolding[key])
      }
      formData.append('cbmLength', this.data.length)
      formData.append('cbmWidth', this.data.width)
      formData.append('cbmHeight', this.data.height)
      formData.append('volumetricWeight', this.data.weight)
      if (this.sendImage !== null) {
        formData.append('image', this.sendImage)
      }
      formData.forEach((item) => window.console.log(item))
      return formData
    },
    async getCities() {
      this.citiesData = await this.$axios.$get('city')
    },
    cityValidator(v) {
      this.scaffolding.pricing.forEach((item) => {
        console.log(item)
        if (item.city === v) {
          console.log('not')
          return 'City is already selected.'
        } else {
          console.log('yes')
          return true
        }
      })
    }
  }
}
</script>

<style>
.form {
  width: 100% !important;
}
.scaffolding-price::-webkit-scrollbar {
  height: 20px;
  background-color: #41b883;
}

.scaffolding-price::-webkit-scrollbar-track {
  background-color: #fff;
}

.scaffolding-price::-webkit-scrollbar-thumb {
  background-color: #babac0;
  border-radius: 16px;
  border: 5px solid #fff;
}

.scaffolding-price::-webkit-scrollbar {
  display: block;
}
</style>
