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
            :rules="[required]"
            outlined
            label="Title"
            dense
          ></v-text-field>
          <v-textarea
            v-model="finishingMaterial.description"
            :rules="[required]"
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
            v-if="!allowVariants"
            v-model="finishingMaterial.price"
            :rules="[required, priceWZ]"
            type="number"
            outlined
            label="Price"
            dense
            prepend-inner-icon="mdi-cash"
          ></v-text-field>
          <v-text-field
            v-if="!allowVariants"
            v-model="finishingMaterial.volume"
            :rules="[required, priceWZ]"
            type="number"
            outlined
            label="Volume"
            dense
            prepend-inner-icon="mdi-cash"
          ></v-text-field>
          <v-text-field
            v-if="!allowVariants"
            v-model="finishingMaterial.weight"
            :rules="[required, priceWZ]"
            type="number"
            outlined
            label="Weight"
            dense
            prepend-inner-icon="mdi-cash"
          ></v-text-field>
          <v-checkbox
            v-model="allowVariants"
            label="This product has multiple variants"
          ></v-checkbox>
          <v-card v-if="allowVariants" style="padding: 20px">
            <v-card-title>Variations</v-card-title>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="12" md="9" sm="9">
                <v-card-title>Options</v-card-title>
              </v-col>
              <v-col
                v-if="options.length < 3"
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
            <v-row v-for="(option, i) of options" :key="i">
              <v-col cols="12" md="3" sm="3">
                <v-text-field
                  v-model="option.optionName"
                  :rules="[required]"
                  :label="'Option ' + (i + 1)"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" md="8" sm="8">
                <v-text-field
                  v-model="option.optionValues"
                  :rules="[required]"
                  dense
                  outlined
                  label="Separate options with comma."
                  @focusout="generateVariants()"
                />
              </v-col>
              <v-col cols="12" md="1" sm="1">
                <v-btn icon @click="removeOption(i)">
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-data-table
              :headers="headers"
              :items="variants"
              class="elevation-1"
              disable-pagination
              hide-default-footer
            >
              <template v-slot:item.varientPrice="{ item }">
                <div
                  style="display: grid; grid-template-columns: 1fr 1fr 1fr; grid-column-gap: 5px"
                >
                  <v-text-field
                    v-model="item.varientPrice"
                    :rules="[required, priceWZ]"
                    type="number"
                    style="align-items: center !important;"
                    outlined
                    label="Price"
                    dense
                    hide-details
                  ></v-text-field>
                  <v-text-field
                    v-model="item.varientVolume"
                    :rules="[required, priceWZ]"
                    type="number"
                    style="align-items: center !important;"
                    outlined
                    label="Volume"
                    dense
                    hide-details
                  ></v-text-field>
                  <v-text-field
                    v-model="item.varientWeight"
                    :rules="[required, priceWZ]"
                    type="number"
                    style="align-items: center !important;"
                    outlined
                    label="Weight"
                    dense
                    hide-details
                  ></v-text-field>
                </div>
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
            required
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
import { required, priceWZ } from '../../../common/utils/validators'
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
      default: 'Add Product Variant Wise'
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
    variants: [],
    options: [{}],
    allowVariants: false,
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
      { text: 'Price', value: 'varientPrice', sortable: false }
    ],
    variantCheck: false
  }),
  mounted() {
    this.getSuppliers()
    if (this.finishingMaterial.name) {
      if (
        this.finishingMaterial.varient.length > 0 ||
        this.finishingMaterial.options.length > 0
      ) {
        this.allowVariants = true
        this.options = this._parseOptions(this.finishingMaterial.options)
        this.variants = this._parseVariants(this.finishingMaterial.varient)
      }
    }
  },
  methods: {
    priceWZ,
    required,
    returnBack() {
      this.$router.back()
    },

    _parseOptions(options) {
      return options.map((option) => ({
        optionName: option.optionName,
        optionValues: option.optionValues
      }))
    },

    _parseVariants(variants) {
      const _variants = []

      for (const variant of variants) {
        const obj = { varientName: [] }
        for (const key of Object.keys(variant)) {
          console.log(key)
          if (key === 'price') {
            obj.varientPrice = variant[key]
          } else if (key === 'volume') {
            obj.varientVolume = variant[key]
          } else if (key === 'weight') {
            obj.varientWeight = variant[key]
          } else {
            obj.varientName.push(variant[key])
          }
        }

        obj.varientName = obj.varientName.join('/')
        _variants.push(obj)
      }

      return _variants
    },

    _combine(index = 0, prevData = []) {
      const variant = []
      if (!this.options[index].optionValues && !this.options[index].optionName)
        return []
      const values = this.options[index].optionValues.split(',')
      for (const value of values) {
        if (index === this.options.length - 1) {
          variant.push([...prevData, value.trim()].join('/'))
        } else {
          variant.push(...this._combine(index + 1, [...prevData, value.trim()]))
        }
      }
      return variant
    },

    generateVariants() {
      this.variants = this._combine().map((item) => ({
        varientName: item,
        varientPrice: 0
      }))
    },

    removeOption(i) {
      this.options.splice(i, 1)
      if (this.options.length <= 0) {
        this.allowVariants = false
        this.options.push({})
      }
      if (this.options.length > 0) {
        this.generateVariants()
      }
    },
    addOption() {
      if (this.options.length > 0) {
        this.optionCount++
        this.options.push({})
      }
    },
    formData() {
      const formData = new FormData()
      if (this.allowVariants) {
        for (const key of Object.keys(this.finishingMaterial)) {
          if (key === 'options') {
            for (const item of this.options) {
              for (const key of Object.keys(item)) {
                if (key === '_id') {
                  continue
                }
                formData.append(key, item[key])
              }
            }
          } else if (key === 'price') {
            formData.append(key, 0)
          } else if (key === 'suppliers') {
            for (const item of this.finishingMaterial[key]) {
              formData.append(key, item._id)
            }
          } else if (key === 'varient') {
            for (const item of this.variants) {
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
