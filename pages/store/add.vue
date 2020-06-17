<template>
  <v-container
    style="display: flex;align-items: center;justify-content: center;"
  >
    <SimpleForm
      return
      title="Add Supplier"
      :data="formData"
      endpoint="/suppliers"
    >
      <v-text-field v-model="supplier.name" :rules="[required]" label="Name" />
      <v-text-field
        v-model="supplier.email"
        :rules="[required, emailValidator]"
        label="Email"
      />
      <v-text-field
        v-model="supplier.contact"
        v-mask="['### - #######', '#### - ########']"
        :rules="[required, phoneValidator]"
        label="Contact"
      />
      <v-text-field
        v-model="supplier.address"
        :rules="[required]"
        label="Address"
      />
      <v-file-input v-model="supplier.profilePic" label="Image" />
      <v-select
        v-model="supplier.services"
        multiple
        :items="services"
        label="Services"
        item-text="name"
      >
      </v-select>
    </SimpleForm>
  </v-container>
</template>

<script>
import SimpleForm from '../../common/ui/widgets/SimpleForm'
import { Supplier } from '../../models/supplier'
import {
  emailValidator,
  required,
  phoneValidator
} from '../../common/utils/validators'

export default {
  components: {
    SimpleForm
  },
  data: () => ({
    supplier: new Supplier(),
    services: [
      { name: 'Construction Dumpster' },
      { name: 'Building Material' },
      { name: 'Finishing Material' },
      { name: 'Scaffolding' },
      { name: 'Delivery Vehicle' }
    ]
  }),
  methods: {
    emailValidator,
    required,
    phoneValidator,
    formData() {
      const formData = new FormData()

      for (const key of Object.keys(this.supplier)) {
        formData.append(key, this.supplier[key])
      }
      return formData
    }
  }
}
</script>
