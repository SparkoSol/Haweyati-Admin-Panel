<template>
  <v-container style="display:flex;justify-content: center;align-items: center">
    <SimpleForm return :method="'post'" :data="formData" :endpoint="'/'">
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
            <v-card-title>Add Finishing Material</v-card-title>
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
          <v-file-input
            v-model="finishingMaterial.images"
            label="File input"
            multiple
            prepend-icon=""
            prepend-inner-icon="mdi-camera"
            outlined
            dense
          ></v-file-input>
        </v-card>
        <v-card style="padding:20px;margin-bottom:10px">
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
      </div>
    </SimpleForm>
  </v-container>
</template>

<script>
import { required } from '../../common/utils/validators'
import { FinishingMaterial } from '../../models/products/finishing-material'
import { FinishingMaterialOptions } from '../../models/products/finishing-material-options'
import SimpleForm from '../../common/ui/widgets/SimpleForm'
export default {
  name: 'ProductAddVariant',
  components: {
    SimpleForm
  },
  props: {
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
    }
  },
  data: () => ({
    optionValues: [],
    optionCount: 0,
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
  methods: {
    required,
    returnBack() {
      this.$router.back()
    },
    removeOption(i) {
      this.options.splice(i, 1)
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
    insertOptions() {
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
      // let values1 = []
      // values1 = this.options[0].options.split(',')
      // for (let i = 0; i < values1.length; ++i) {
      //   if (this.options.length === 2) {
      //     let values2 = []
      //     values2 = this.options[1].options.split(',')
      //     for (let j = 0; i < values2.length; ++j) {
      //       if (this.options.length === 3) {
      //         let values3 = []
      //         values3 = this.options[2].options.split(',')
      //         for (let k = 0; k < values3.length; ++k) {
      //           this.optionValues.push({
      //             name: ' ' + values1[i] + '/' + values2[j] + '/' + values3[k]
      //           })
      //         }
      //       } else {
      //         this.optionValues.push({
      //           name: ' ' + values1[i] + '/' + values2[j]
      //         })
      //       }
      //     }
      //   } else {
      //     this.optionValues.push({ name: values1[i] })
      //   }
      // }
    },
    formData() {
      const formData = new FormData()
      if (this.variantCheck) {
        for (const key of Object.keys(this.finishingMaterial)) {
          if (key === 'options') {
            for (const item of this.finishingMaterialOptions) {
              for (const key of Object.keys(item)) {
                // window.console.log(key + ':' + item[key])
                formData.append(key, item[key])
              }
            }
          } else if (key === 'varients') {
            for (const item of this.finishingMaterialVarients) {
              for (const key of Object.keys(item)) {
                // window.console.log(key + ':' + item[key])
                formData.append(key, item[key])
              }
            }
          } else if (key === 'images') {
            if (Array.isArray(this.finishingMaterial[key])) {
              for (const item of this.finishingMaterial[key]) {
                formData.append(key, item)
              }
            } else {
              formData.append(key, this.finishingMaterial[key])
            }
          } else if (Array.isArray(this.finishingMaterial[key])) {
            for (const item of this.finishingMaterial[key]) {
              formData.append(key, item)
            }
          } else formData.append(key, this.finishingMaterial[key])
        }
      } else {
        for (const key of Object.keys(this.finishingMaterial)) {
          if (key === 'images') {
            if (Array.isArray(this.finishingMaterial[key])) {
              for (const item of this.finishingMaterial[key]) {
                formData.append(key, item)
              }
            } else {
              formData.append(key, this.finishingMaterial[key])
            }
          } else if (Array.isArray(this.finishingMaterial[key])) {
            for (const item of this.finishingMaterial[key]) {
              formData.append(key, item)
            }
          } else formData.append(key, this.finishingMaterial[key])
        }
      }
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
    }
  }
}
</script>

<style>
.form {
  width: 800px !important;
}
</style>
