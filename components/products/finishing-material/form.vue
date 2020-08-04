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
            v-model="finishingMaterial.name"
            outlined
            label="Title"
            dense
          ></v-text-field>
          <v-textarea
            v-model="finishingMaterial.description"
            outlined
            label="Description"
            dense
          ></v-textarea>
        </v-card>
        <v-card style="padding:20px;margin-bottom: 20px">
          <v-card-title>Media</v-card-title>
          <ImageSelector
            v-model="imageFile"
            :image="finishingMaterial"
            @input="sendImage = $event"
          />
        </v-card>
        <v-card style="padding:20px;margin-bottom:20px">
          <v-card-title>Pricing</v-card-title>
          <v-text-field
            v-if="!variantCheck"
            v-model="finishingMaterial.price"
            outlined
            label="Price"
            dense
            prepend-inner-icon="mdi-cash"
          ></v-text-field>
          <v-checkbox
            v-model="variantCheck"
            label="This product has multiple variants"
          ></v-checkbox>
          <v-card v-if="variantCheck" style="padding: 20px">
            <v-card-title>Variations</v-card-title>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="12" md="9" sm="9">
                <v-card-title>Options</v-card-title>
              </v-col>
              <v-col
                v-if="optionCount <= 1"
                cols="12"
                md="3"
                sm="3"
                style="display: flex; align-items: center"
              >
                <v-btn
                  color="#FF974D"
                  style="color:#ffffff"
                  @click="addOption()"
                  >Add Option
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-for="(option, i) of finishingMaterialOptions" :key="i">
              <v-col cols="12" md="3" sm="3">
                <v-text-field
                  v-model="option.optionName"
                  outlined
                  :label="'Option ' + (i + 1)"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="8" sm="8">
                <v-text-field
                  v-model="option.optionValues"
                  outlined
                  label="Separate options with comma."
                  dense
                  @focusout="insertOptions"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="1" sm="1">
                <v-btn icon @click="removeOption(i)">
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-data-table
              :headers="headers"
              :items="finishingMaterialVarients"
              class="elevation-1"
              disable-pagination
              hide-default-footer
            >
              <template v-slot:item.varientPrice="{ item }">
                <v-text-field
                  v-model="item.varientPrice"
                  style="align-items: center !important;"
                  outlined
                  label="Price"
                  dense
                  hide-details
                ></v-text-field>
              </template>
            </v-data-table>
          </v-card>
        </v-card>
        <v-card style="padding: 20px;margin-bottom: 20px">
          <v-card-title style="color: #313F53">Stores</v-card-title>
          <EntitySelector
            endpoint="suppliers/getbyservice/Finishing Material"
            :selection="suppliers"
            multiple
            :columns-selected="columnsSelected"
            :columns-selector="columnsSelected"
            title-selected="Selected Suppliers"
            title-selector="Suppliers"
            @selected="finishingMaterial.suppliers = $event"
          />
        </v-card>
      </div>
    </SimpleForm>
  </v-container>
</template>

<script>
import { required } from '../../../common/utils/validators'
import { FinishingMaterial } from '../../../models/products/finishing-material'
import EntitySelector from '../../../common/ui/widgets/EntitySelector'
import { FinishingMaterialOptions } from '../../../models/products/finishing-material-options'
import SimpleForm from '../../../common/ui/widgets/SimpleForm'
import ImageSelector from '../../misc/image-selector'

export default {
  name: 'ProductAddVariant',
  components: {
    SimpleForm,
    EntitySelector,
    ImageSelector
  },
  props: {
    title: {
      type: String,
      default: 'Add Product Varient Wise'
    },
    isUpdate: {
      type: Boolean,
      default: false
    },
    endpoint: {
      type: String,
      default: 'product-add'
    },
    finishingMaterial: {
      type: FinishingMaterial,
      default: () => new FinishingMaterial()
    },
    finishingMaterialOptions: {
      type: Array,
      default: () => [new FinishingMaterialOptions()]
    },
    finishingMaterialVarients: {
      type: Array,
      default: () => []
    },
    suppliers: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    columnsSelected: [{ text: 'Name', value: 'person.name' }],
    optionValues: [],
    suppliersList: [],
    optionCount: 0,
    imageFile: null,
    sendImage: null,
    headers: [
      {
        text: 'Variant',
        align: 'start',
        sortable: false,
        value: 'varientName'
      },
      { text: 'Price', value: 'varientPrice' }
    ],
    variantCheck: false,
    options: [{ name: '', options: '' }]
  }),
  mounted() {
    this.getSuppliers()
    // this.getUpdateValues()
  },
  methods: {
    required,
    returnBack() {
      this.$router.back()
    },
    removeOption(i) {
      this.finishingMaterialOptions.splice(i, 1)
      this.optionCount--
      if (this.optionCount < 0) {
        this.optionCount = 0
        this.variantCheck = false
        this.finishingMaterialOptions.push({ optionName: '', optionValues: '' })
      }
    },
    addOption() {
      if (this.optionCount <= 1) {
        this.optionCount++
        this.finishingMaterialOptions.push({ optionName: '', optionValues: '' })
      }
    },
    getUpdateValues() {
      // window.console.log(this.optionCount)
      // window.console.log(this.finishingMaterialOptions.length - 1)
      if (this.finishingMaterial.varient.length >= 1) {
        this.variantCheck = true
        this.finishingMaterialVarients = []
        for (let i = 0; i < this.finishingMaterial.varient.length; i++) {
          let name = ''
          let price = ''
          for (
            let j = 0;
            j < Object.keys(this.finishingMaterial.varient[i]).length;
            j++
          ) {
            if (
              j === Object.keys(this.finishingMaterial.varient[i]).length - 2 &&
              Object.keys(this.finishingMaterial.varient[i])[j] !== 'price'
            ) {
              name =
                name +
                this.finishingMaterial.varient[i][
                  Object.keys(this.finishingMaterial.varient[i])[j]
                ]
            } else if (
              Object.keys(this.finishingMaterial.varient[i])[j] !== 'price'
            ) {
              name =
                name +
                this.finishingMaterial.varient[i][
                  Object.keys(this.finishingMaterial.varient[i])[j]
                ]
              name = name + '/ '
            }
            if (Object.keys(this.finishingMaterial.varient[i])[j] === 'price') {
              price = this.finishingMaterial.varient[i][
                Object.keys(this.finishingMaterial.varient[i])[j]
              ]
            }
          }
          // for (const key of Object.keys(this.finishingMaterial.varient[i])) {
          //   if (key === 'price') {
          //     price = this.finishingMaterial.varient[i][key]
          //   } else {
          //     name = name + this.finishingMaterial.varient[i][key]
          //   }
          // }
          this.finishingMaterialVarients.push({
            varientName: name,
            varientPrice: price
          })
        }
      }
    },
    insertOptions() {
      this.finishingMaterial.price = 0
      this.finishingMaterialVarients = []
      if (this.finishingMaterialOptions.length === 1) {
        if (this.finishingMaterialOptions[0].optionValues !== '') {
          let values1 = []
          values1 = this.finishingMaterialOptions[0].optionValues.split(',')
          for (let i = 0; i < values1.length; i++) {
            this.finishingMaterialVarients.push({
              varientName: values1[i],
              varientPrice: ''
            })
          }
        }
      } else if (this.finishingMaterialOptions.length === 2) {
        if (this.finishingMaterialOptions[0].optionValues !== '') {
          let values1 = []
          values1 = this.finishingMaterialOptions[0].optionValues.split(',')
          if (this.finishingMaterialOptions[1].optionValues !== '') {
            for (let i = 0; i < values1.length; i++) {
              let values2 = []
              values2 = this.finishingMaterialOptions[1].optionValues.split(',')
              for (let j = 0; j < values2.length; j++) {
                this.finishingMaterialVarients.push({
                  varientName: values1[i] + '/' + values2[j],
                  varientPrice: ''
                })
              }
            }
          } else {
            for (let i = 0; i < values1.length; i++) {
              this.finishingMaterialVarients.push({
                varientName: values1[i],
                varientPrice: ''
              })
            }
          }
        }
      } else if (this.finishingMaterialOptions.length === 3) {
        if (this.finishingMaterialOptions[0].optionValues !== '') {
          let values1 = []
          values1 = this.finishingMaterialOptions[0].optionValues.split(',')
          if (this.finishingMaterialOptions[1].optionValues !== '') {
            for (let i = 0; i < values1.length; i++) {
              let values2 = []
              values2 = this.finishingMaterialOptions[1].optionValues.split(',')
              for (let j = 0; j < values2.length; j++) {
                if (this.finishingMaterialOptions[2].optionValues !== '') {
                  let values3 = []
                  values3 = this.finishingMaterialOptions[2].optionValues.split(
                    ','
                  )
                  for (let k = 0; k < values3.length; k++) {
                    this.finishingMaterialVarients.push({
                      varientName:
                        values1[i] + '/' + values2[j] + '/' + values3[k],
                      varientPrice: ''
                    })
                  }
                } else {
                  for (let i = 0; i < values1.length; i++) {
                    this.finishingMaterialVarients.push({
                      varientName: values1[i] + '/' + values2[j],
                      varientPrice: ''
                    })
                  }
                }
              }
            }
          } else {
            for (let i = 0; i < values1.length; i++) {
              this.finishingMaterialVarients.push({
                varientName: values1[i],
                varientPrice: ''
              })
            }
          }
        }
      }
    },
    formData() {
      const formData = new FormData()
      if (this.variantCheck) {
        for (const key of Object.keys(this.finishingMaterial)) {
          if (key === 'options') {
            for (const item of this.finishingMaterialOptions) {
              for (const key of Object.keys(item)) {
                if (key === '_id') {
                  continue
                }
                formData.append(key, item[key])
              }
            }
          } else if (key === 'suppliers') {
            for (const item of this.finishingMaterial[key]) {
              formData.append(key, item._id)
            }
          } else if (key === 'varient') {
            for (const item of this.finishingMaterialVarients) {
              for (const key of Object.keys(item)) {
                formData.append(key, item[key])
              }
            }
          } else if (key === 'image') {
            if (this.sendImage) {
              formData.append(key, this.sendImage)
            }
          } else if (Array.isArray(this.finishingMaterial[key])) {
            for (const item of this.finishingMaterial[key]) {
              formData.append(key, item)
            }
          } else if (key === 'parent') {
            formData.append('parent', this.$route.params.id)
          } else formData.append(key, this.finishingMaterial[key])
        }
      } else {
        for (const key of Object.keys(this.finishingMaterial)) {
          if (key === 'image') {
            if (this.sendImage) {
              formData.append(key, this.sendImage)
            }
          } else if (key === 'suppliers') {
            for (const item of this.finishingMaterial[key]) {
              formData.append(key, item._id)
            }
          } else if (key === 'parent') {
            formData.append('parent', this.$route.params.id)
          } else if (key === 'varient') {
            continue
          } else if (key === 'options') {
            continue
          } else formData.append(key, this.finishingMaterial[key])
        }
      }
      formData.forEach((item) => window.console.log(item))
      return formData
    },
    splitOptionValues(value) {
      if (value === '') {
        return
      }
      let getValues = []
      getValues = value.split(',')
      this.optionValues = []
      for (value of getValues) {
        this.optionValues.push({ name: value })
      }
    },
    async getSuppliers() {
      // if (this.finishingMaterialOptions.length === 0) {
      //   this.optionCount++
      //   this.finishingMaterialOptions.push({ optionName: '', optionValues: '' })
      // }
      this.suppliersList = await this.$axios.$get('suppliers/all')
    }
  }
}
</script>

<style>
.form {
  width: 800px !important;
}
</style>
