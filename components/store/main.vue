<template>
  <div>
    <v-tabs v-model="tab" background-color="#313F53" color="#ff974d" dark>
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
          :block="item.block"
          :block-route="item.blockRoute"
          :unblock="item.unblock"
          :unblock-route="item.unblockRoute"
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
  </div>
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
          endpoint: '/suppliers/all',
          create: true,
          createRoute: '/store/add',
          change: true,
          changeRoute: '/store/edit/$id',
          remove: true,
          removeRoute: '/suppliers/$id',
          detail: true,
          detailRoute: '/store/detail/$id',
          approve: false,
          reject: false,
          block: true,
          blockRoute: 'suppliers/block/$id',
          columns: [
            {
              text: 'Image',
              value: 'person.image',
              filterable: false,
              sortable: false
            },
            { text: 'Name', value: 'person.name' },
            { text: 'Email', value: 'person.email' },
            { text: 'Contact', value: 'person.contact' },
            { text: 'City', value: 'city', sortable: false },
            {
              text: 'Services',
              value: 'services',
              sortable: false,
              width: '300px'
            },
            {
              text: 'Sub Suppliers',
              value: 'subSupplier',
              sortable: false,
              width: '100px'
            },
            { text: 'Rating', value: 'rating' },
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
          change: true,
          changeRoute: '/store/edit/$id',
          remove: false,
          detail: true,
          detailRoute: '/store/detail/$id',
          approve: true,
          approveRoute: '/suppliers/approve/$id',
          reject: true,
          rejectRoute: '/suppliers/getrejected/$id',
          columns: [
            {
              text: 'Image',
              value: 'person.image',
              filterable: false,
              sortable: false
            },
            { text: 'Name', value: 'person.name' },
            { text: 'Email', value: 'person.email' },
            { text: 'Contact', value: 'person.contact' },
            { text: 'City', value: 'city', sortable: false },
            {
              text: 'Services',
              value: 'services',
              sortable: false,
              width: '300px'
            },
            { text: 'Rating', value: 'rating' }
          ]
        },
        {
          tab: 'Rejected',
          title: 'Rejected Suppliers',
          endpoint: '/suppliers/getrejected',
          create: false,
          change: true,
          changeRoute: '/store/edit/$id',
          remove: false,
          detail: true,
          detailRoute: '/store/detail/$id',
          approve: true,
          approveRoute: '/suppliers/approve/$id',
          reject: false,
          columns: [
            {
              text: 'Image',
              value: 'person.image',
              filterable: false,
              sortable: false
            },
            { text: 'Name', value: 'person.name' },
            { text: 'Email', value: 'person.email' },
            { text: 'Contact', value: 'person.contact' },
            { text: 'City', value: 'city', sortable: false },
            {
              text: 'Services',
              value: 'services',
              sortable: false,
              width: '300px'
            },
            { text: 'Rating', value: 'rating' }
          ]
        },
        {
          tab: 'Blocked',
          title: 'Blocked Suppliers',
          endpoint: '/suppliers/block',
          create: false,
          change: true,
          changeRoute: '/store/edit/$id',
          remove: false,
          detail: true,
          detailRoute: '/store/detail/$id',
          approve: false,
          reject: false,
          unblock: true,
          unblockRoute: '/suppliers/approve/$id',
          columns: [
            {
              text: 'Image',
              value: 'person.image',
              filterable: false,
              sortable: false
            },
            { text: 'Name', value: 'person.name' },
            { text: 'Email', value: 'person.email' },
            { text: 'Contact', value: 'person.contact' },
            { text: 'City', value: 'city', sortable: false },
            {
              text: 'Services',
              value: 'services',
              sortable: false,
              width: '300px'
            },
            { text: 'Rating', value: 'rating' }
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
