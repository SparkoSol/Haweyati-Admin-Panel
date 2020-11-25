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
        <v-card style="padding:20px;margin-bottom: 10px">
          <v-text-field
            v-model="buildingMaterialSub.name"
            color="#313F53"
            :rules="[required]"
            outlined
            style="color: #313F53"
            label="Title"
            dense
          ></v-text-field>
          <v-textarea
            v-model="buildingMaterialSub.description"
            :rules="[required]"
            color="#313F53"
            outlined
            style="color: #313F53"
            label="Description"
            dense
          ></v-textarea>
          <ImageSelector
            v-model="imageFile"
            :image="buildingMaterialSub"
            @input="sendImage = $event"
          />
        </v-card>
      </div>
    </SimpleForm>
  </v-container>
</template>

<script>
import SimpleForm from '../../../common/ui/widgets/SimpleForm'
import { BuildingMaterialSub } from '../../../models/products/building-material-sub'
import { required } from '../../../common/utils/validators'
import ImageSelector from '../../misc/image-selector'

export default {
  name: 'BuildingMaterialSubSubAdd',
  components: {
    SimpleForm,
    ImageSelector
  },
  props: {
    title: {
      type: String,
      default: 'Add Sub Category'
    },
    isUpdate: {
      type: Boolean,
      default: false
    },
    endpoint: {
      type: String,
      default: 'product-add'
    },
    buildingMaterialSub: {
      type: [Object, BuildingMaterialSub],
      default: () => new BuildingMaterialSub()
    }
  },
  data: () => ({
    imageFile: null,
    sendImage: null
  }),
  methods: {
    required,
    returnBack() {
      this.$router.back()
    },
    reroute(route) {
      this.$router.push(route)
    },
    formData() {
      const formData = new FormData()
      for (const key of Object.keys(this.buildingMaterialSub)) {
        if (key === 'image') {
          if (this.sendImage) {
            formData.append(key, this.sendImage)
          }
        } else formData.append(key, this.buildingMaterialSub[key])
      }
      if (!this.isUpdate) {
        formData.append('category', this.$route.params.id)
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
