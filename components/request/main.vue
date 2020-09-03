<template>
  <v-container>
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
  name: 'RequestMain',
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
          tab: 'Pending',
          title: 'Pending Requests',
          endpoint: '/service-requests/pending',
          detail: true,
          detailRoute: '/request/detail/$id',
          approve: true,
          approveRoute: '/service-requests/completed/$id',
          reject: true,
          rejectRoute: 'service-requests/rejected/$id',
          columns: [
            {
              text: 'Supplier Image',
              value: 'suppliers.person.image',
              width: '120px',
              filterable: false,
              sortable: false
            },
            { text: 'Supplier Name', value: 'suppliers.person.name' },
            { text: 'Request Type', value: 'type' },
            {
              text: 'status',
              value: 'status'
            }
          ]
        },
        {
          tab: 'Completed',
          title: 'Completed Requests',
          endpoint: '/service-requests/completed',
          detail: true,
          detailRoute: '/store/detail/$id',
          columns: [
            {
              text: 'Supplier Image',
              value: 'suppliers.person.image',
              width: '120px',
              filterable: false,
              sortable: false
            },
            { text: 'Supplier Name', value: 'suppliers.person.name' },
            { text: 'Request Type', value: 'type' },
            {
              text: 'status',
              value: 'status'
            }
          ]
        },
        {
          tab: 'Rejected',
          title: 'Rejected Requests',
          endpoint: '/service-requests/rejected',
          detail: true,
          detailRoute: '/store/detail/$id',
          columns: [
            {
              text: 'Supplier Image',
              value: 'suppliers.person.image',
              width: '120px',
              filterable: false,
              sortable: false
            },
            { text: 'Supplier Name', value: 'suppliers.person.name' },
            { text: 'Request Type', value: 'type' },
            {
              text: 'status',
              value: 'status'
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
      this.snackbarText = 'Successfully Completed Request!'
      this.snackbar = true
    },
    onRejected() {
      this.snackbarColor = 'red'
      this.snackbarText = 'Successfully Rejected Request!'
      this.snackbar = true
    }
  }
}
</script>

<style scoped></style>
