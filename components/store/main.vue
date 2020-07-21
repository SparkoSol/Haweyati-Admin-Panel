<template>
  <v-container>
    <v-tabs v-model="tab" background-color="#313F53" color="white" dark>
      <v-tab v-for="item in tabs" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabs" :key="item.tab">
        <data-viewer
          :title="item.title"
          :columns="item.columns"
          :endpoint="item.endpoint"
          :create="item.create"
          :create-route="item.createRoute"
          :change="item.change"
          :change-route="item.changeRoute"
          :remove="item.remove"
          :remove-route="item.removeRoute"
          :detail="item.detail"
          :detail-route="item.detailRoute"
          :approve="item.approve"
          :approve-route="item.approveRoute"
          :reject="item.reject"
          :reject-route="item.rejectRoute"
          :on-delete="onDelete"
          :on-accepted="onAccepted"
          :on-rejected="onRejected"
        />
      </v-tab-item>
    </v-tabs-items>
    <v-snackbar
      v-model="snackbar"
      bottom
      :color="snackbarColor"
      :timeout="1500"
    >
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script>
import DataViewer from '../../common/ui/widgets/DataViewer'

export default {
  name: 'SupplierMain',
  components: {
    DataViewer
  },
  data() {
    return {
      snackbarText: 'Success!',
      snackbarColor: 'green',
      snackbar: false,
      tabs: [
        {
          tab: 'Active',
          title: 'Active Suppliers',
          endpoint: '/suppliers',
          create: true,
          createRoute: '/store/add',
          change: true,
          changeRoute: '/store/edit/$id',
          remove: true,
          removeRoute: '/suppliers/$id',
          detail: true,
          detailRoute: '/store/detail/$id',
          approve: false,
          approveRoute: '/suppliers/getapproved/$id',
          reject: false,
          rejectRoute: 'suppliers/getrejected/$id',
          columns: [
            {
              text: 'Image',
              value: 'images',
              filterable: false,
              sortable: false
            },
            { text: 'Name', value: 'name' },
            { text: 'Email', value: 'email' },
            { text: 'Contact', value: 'contact' },
            { text: 'Address', value: 'address', sortable: false },
            {
              text: 'Services',
              value: 'services',
              sortable: false,
              width: '300px'
            },
            {
              text: 'status',
              value: 'status'
            }
          ]
        },
        {
          tab: 'Pending',
          title: 'Pending Suppliers',
          endpoint: '/suppliers/pending',
          create: false,
          createRoute: '/store/add',
          change: true,
          changeRoute: '/store/edit/$id',
          remove: false,
          removeRoute: '/suppliers/$id',
          detail: true,
          detailRoute: '/store/detail/$id',
          approve: true,
          approveRoute: '/suppliers/getapproved/$id',
          reject: true,
          rejectRoute: 'suppliers/getrejected/$id',
          columns: [
            {
              text: 'Image',
              value: 'images',
              filterable: false,
              sortable: false
            },
            { text: 'Name', value: 'name' },
            { text: 'Email', value: 'email' },
            { text: 'Contact', value: 'contact' },
            { text: 'Address', value: 'address', sortable: false },
            {
              text: 'Services',
              value: 'services',
              sortable: false,
              width: '300px'
            }
          ]
        },
        {
          tab: 'Rejected',
          title: 'Rejected Suppliers',
          endpoint: '/suppliers/getrejected',
          create: false,
          createRoute: '/store/add',
          change: true,
          changeRoute: '/store/edit/$id',
          remove: false,
          removeRoute: '/suppliers/$id',
          detail: true,
          detailRoute: '/store/detail/$id',
          approve: false,
          approveRoute: '/suppliers/getapproved/$id',
          reject: false,
          rejectRoute: 'suppliers/getrejected/$id',
          columns: [
            {
              text: 'Image',
              value: 'images',
              filterable: false,
              sortable: false
            },
            { text: 'Name', value: 'name' },
            { text: 'Email', value: 'email' },
            { text: 'Contact', value: 'contact' },
            { text: 'Address', value: 'address', sortable: false },
            {
              text: 'Services',
              value: 'services',
              sortable: false,
              width: '300px'
            }
          ]
        }
      ],
      tab: null
    }
  },
  methods: {
    onDelete() {
      this.snackbarColor = 'red'
      this.snackbarText = 'Successfully Deleted Item!'
      this.snackbar = true
    },
    onAccepted() {
      this.snackbarColor = 'green'
      this.snackbarText = 'Successfully Approved Supplier!'
      this.snackbar = true
    },
    onRejected() {
      this.snackbarColor = 'red'
      this.snackbarText = 'Successfully Rejected Supplier!'
      this.snackbar = true
    }
  }
}
</script>

<style scoped></style>