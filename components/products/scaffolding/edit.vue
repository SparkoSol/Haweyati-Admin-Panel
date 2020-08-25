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
            <v-card-title>Edit {{ scaffolding.type }}</v-card-title>
          </v-col>
        </v-row>
      </template>
      <div class="span-2">
        <v-container>
          <v-card style="padding: 20px">
            <v-card-title>Scaffolding Information</v-card-title>
            <v-text-field
              :rules="[required]"
              v-model="scaffolding.type"
              color="#313F53"
              outlined
              style="color: #313F53"
              label="Type"
              dense
            ></v-text-field>
            <v-textarea
              :rules="[required]"
              v-model="scaffolding.description"
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
                      extraDayRent: ''
                    })
                  "
                  >Add City
                </v-btn></v-col
              >
            </v-row>
            <v-card style="padding: 20px">
              <v-row
                v-for="(price, i) of scaffolding.pricing"
                :key="i"
                style="display: grid;grid-template-columns: auto auto auto auto auto 50px"
              >
                <v-col>
                  <v-text-field
                    v-model="price.city"
                    :rules="[required]"
                    color="#313F53"
                    outlined
                    :label="'City ' + (i + 1)"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    :rules="[required, priceWZ]"
                    type="number"
                    v-model="price.rent"
                    color="#313F53"
                    outlined
                    label="Rent"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    :rules="[required, priceWZ]"
                    type="number"
                    v-model="price.days"
                    color="#313F53"
                    outlined
                    label="Days"
                    dense
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    :rules="[required, priceWZ]"
                    type="number"
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
          </v-card>
        </v-container>
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
import { Scaffolding } from '../../../models/products/scaffolding'
import SimpleForm from '../../../common/ui/widgets/SimpleForm'
import EntitySelector from '../../../common/ui/widgets/EntitySelector'
import { required, priceWZ } from '../../../common/lib/validator'

export default {
  name: 'ScaffoldingEdit',
  components: {
    SimpleForm,
    EntitySelector
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
      { text: 'Extra Days Rent', value: 'extraDayRent' }
    ],
    columnsStore: [
      { text: 'Image', value: 'image' },
      { text: 'Name', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Contact', value: 'contact' },
      { text: 'Address', value: 'address' },
      { text: 'Services', value: 'services' }
    ],
    columnsSelected: [{ text: 'Name', value: 'person.name' }]
  }),
  methods: {
    required,
    priceWZ,
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
    formData() {
      const formData = new FormData()
      for (const key of Object.keys(this.scaffolding)) {
        if (key === 'pricing') {
          for (const price of this.scaffolding[key]) {
            for (const data of Object.keys(price)) {
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
      formData.forEach((item) => window.console.log(item))
      return formData
    }
  }
}
</script>

<style>
.form {
  width: 800px !important;
}
</style>
