<template>
  <v-card class="data-viewer" elevation="8">
    <v-card-title class="data-viewer__title">
      <v-btn v-if="back" icon style="margin-right: 50px" @click="returnBack">
        <v-icon>mdi-keyboard-backspace</v-icon>
      </v-btn>
      <span>{{ title }}</span>
      <v-spacer />

      <v-btn
        v-if="create"
        color="primary"
        elevation="0"
        style="padding: 0 13px 0 7px !important; border-radius: 4px; margin-right: 10px"
        @click="handleCreateEvent"
      >
        <v-icon small>mdi-plus</v-icon>

        <span>Add New</span>
      </v-btn>

      <!--      <v-bottom-sheet v-model="filter" persistent>-->
      <!--        <template v-slot:activator="{ on }">-->
      <!--          <v-btn icon v-on="on">-->
      <!--            <v-icon>mdi-filter</v-icon>-->
      <!--          </v-btn>-->
      <!--        </template>-->
      <!--        <v-sheet class="text-center" height="200px">-->
      <!--          <v-btn class="mt-6" flat color="error" @click="sheet = !sheet"-->
      <!--            >close</v-btn-->
      <!--          >-->
      <!--          <div class="py-3">-->
      <!--            This is a bottom sheet using the persistent prop-->
      <!--          </div>-->
      <!--        </v-sheet>-->
      <!--      </v-bottom-sheet>-->

      <v-btn aria-hidden="true" icon @click="load">
        <v-icon aria-hidden="true">mdi-reload</v-icon>
      </v-btn>
    </v-card-title>

    <div class="data-viewer__search">
      <div class="data-viewer__search--spacer" />
      <v-text-field
        v-model="search"
        placeholder="Search"
        aria-hidden="true"
        dense
        filled
        outlined
        style="margin-left: auto; width: 450px; margin-right: 20px"
        prepend-inner-icon="mdi-magnify"
      />
    </div>
    <v-data-table
      :headers="columns"
      :loading="loading"
      :search="search"
      :items="data"
      :dense="dense"
      height="500"
      fixed-header
      class="data-table__content"
    >
      <template v-slot:item.person.image="{ item }">
        <v-avatar
          v-if="item.person.image != null"
          style="margin: 5px;padding: 0"
        >
          <img
            style="object-fit: cover"
            alt="person"
            :src="$axios.defaults.baseURL + 'uploads/' + item.person.image.name"
          />
        </v-avatar>
        <p v-if="item.person.image == null" style="margin: 0">
          No Image
        </p>
      </template>
      <template v-slot:item.profile.image="{ item }">
        <v-avatar
          v-if="item.profile.image != null"
          style="margin: 5px;padding: 0"
        >
          <img
            style="object-fit: cover"
            alt="profile"
            :src="
              $axios.defaults.baseURL + 'uploads/' + item.profile.image.name
            "
          />
        </v-avatar>
        <p v-if="item.profile.image == null" style="margin: 0">
          No Image
        </p>
      </template>
      <template v-slot:item.driver.profile.image="{ item }">
        <v-avatar
          v-if="item.driver.profile.image != null"
          style="margin: 5px;padding: 0"
        >
          <img
            style="object-fit: cover"
            alt="driver"
            :src="
              $axios.defaults.baseURL +
                'uploads/' +
                item.driver.profile.image.name
            "
          />
        </v-avatar>
        <p v-if="item.driver.profile.image == null" style="margin: 0">
          No Image
        </p>
      </template>
      <template v-slot:item.image="{ item }">
        <v-avatar v-if="item.image != null" style="margin: 5px;padding: 0">
          <img
            style="object-fit: cover"
            alt="viewImage"
            :src="$axios.defaults.baseURL + 'uploads/' + item.image.name"
          />
        </v-avatar>
        <p v-if="item.image == null" style="margin: 0">
          No Image
        </p>
      </template>
      <template v-slot:item.images="{ item }">
        <v-avatar
          v-if="item.images != null && item.images.length !== 0"
          style="margin: 5px;padding: 0"
        >
          <img
            style="object-fit: cover"
            alt="multiImage"
            :src="$axios.defaults.baseURL + 'uploads/' + item.images[0].name"
          />
        </v-avatar>
        <p
          v-if="item.images == null || item.images.length === 0"
          style="margin: 0"
        >
          No Image
        </p>
      </template>
      <template v-slot:item.suppliers.person.image="{ item }">
        <v-avatar
          v-if="
            item.suppliers.person.image != null &&
              item.suppliers.person.image.length !== 0
          "
          style="margin: 5px;padding: 0"
        >
          <img
            style="object-fit: cover"
            alt="supplier"
            :src="
              $axios.defaults.baseURL +
                'uploads/' +
                item.suppliers.person.image.name
            "
          />
        </v-avatar>
        <p
          v-if="
            item.suppliers.person.image == null ||
              item.suppliers.person.image.length === 0
          "
          style="margin: 0"
        >
          No Image
        </p>
      </template>
      <template v-slot:item.createdAt="{ item }">
        <slot name="createdAt" :item="item" />
        {{ date(item.createdAt) }}
      </template>
      <template v-slot:item.person="{ item }">
        <slot name="person" :item="item" />
        <div v-if="item.person.length">
          <span v-for="(person, i) of item.person" :key="i">
            <span v-if="i === item.person.length - 1">
              {{ person ? person.name : 'No Name' }}
            </span>
            <span v-else>
              {{ person ? person.name + ' -' : 'No Name' + ' -' }}
            </span>
          </span>
        </div>
      </template>
      <template v-slot:item.status="{ item }">
        <slot name="status" :item="item" />
        <p style="margin: 0">
          {{
            getStatus(item.status) !== '' ? getStatus(item.status) : item.status
          }}
        </p>
      </template>
      <template v-slot:item.action="{ item }">
        <slot name="actions" :item="item" />
        <v-icon
          v-if="detail"
          style="margin: 5px"
          size="20"
          color="green"
          aria-hidden="true"
          @click="detailItem(item)"
          >mdi-clipboard</v-icon
        >
        <v-icon
          v-if="approve"
          size="20"
          style="margin: 5px"
          color="green"
          aria-hidden="true"
          @click="approveItem(item)"
          >mdi-check-circle</v-icon
        >
        <v-icon
          v-if="reject"
          style="margin: 5px"
          size="20"
          color="red"
          aria-hidden="true"
          @click="rejectItem(item)"
          >mdi-close-circle</v-icon
        >
        <v-icon
          v-if="change"
          style="margin: 5px"
          size="20"
          color="green"
          aria-hidden="true"
          @click="changeItem(item)"
          >mdi-pencil</v-icon
        >
        <v-icon
          v-if="remove"
          style="margin: 5px"
          size="20"
          color="red"
          aria-hidden="true"
          @click="removeItem(item)"
          >mdi-delete</v-icon
        >
        <v-icon
          v-if="block"
          style="margin: 5px"
          size="20"
          color="red"
          aria-hidden="true"
          @click="blockItem(item)"
          >mdi-block-helper</v-icon
        >
        <v-icon
          v-if="unblock"
          style="margin: 5px"
          small
          color="green"
          aria-hidden="true"
          @click="unblockItem(item)"
          >mdi-check</v-icon
        >
        <v-icon
          v-if="refund"
          style="margin: 5px"
          small
          color="green"
          aria-hidden="true"
          @click="handleRefundEvent(item)"
          >mdi-cash-refund</v-icon
        >
      </template>
      <template v-slot:item.custom-edit="{ item }">
        <slot name="custom-edit" :item="item" />
        <v-btn
          color="primary"
          small
          elevation="0"
          style="padding: 0 13px 0 7px !important; border-radius: 4px; margin-right: 10px"
          @click="handleCustomEditEvent(item)"
        >
          <v-icon x-small>mdi-pencil</v-icon>

          <span>Edit</span>
        </v-btn>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card v-if="editItem">
            <v-card-title>
              <span class="headline">Edit Reward Points</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-text-field
                  v-model="editItem.points"
                  label="Points"
                  outlined
                  dense
                ></v-text-field>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.points="{ item }">
        <slot name="points" :item="item" />
        <p style="margin: 0">{{ item.points }}</p>
      </template>
      <template v-slot:item.description="{ item }">
        <slot name="points" :item="item" />
        <p style="margin: 0">{{ item.description.substr(0, 75) }}</p>
      </template>
      <template v-slot:item.weight="{ item }">
        <slot name="weight" :item="item" />
        <p style="margin: 0">{{ item.minWeight }} - {{ item.maxWeight }}</p>
      </template>
      <template v-slot:item.volume="{ item }">
        <slot name="volume" :item="item" />
        <p style="margin: 0">{{ item.minVolume }} - {{ item.maxVolume }}</p>
      </template>
      <template v-slot:item.sr="{ item }">
        <p style="margin: 0">
          {{
            data
              .map(function(x) {
                return x
              })
              .indexOf(item) + 1
          }}
        </p>
      </template>
      <template v-slot:item.subSupplier="{ item }">
        <slot name="subSupplier" :item="item" />
        <p style="margin: 0">
          <v-icon style="margin: 0">
            mdi-account-multiple
          </v-icon>
          {{ item.__v }}
        </p>
      </template>
      <template v-slot:item.cbm="{ item }">
        <slot name="cbm" :item="item" />
        <p style="margin: 0">
          {{
            parseInt(item.cbmLength) *
              parseInt(item.cbmWidth) *
              parseInt(item.cbmHeight)
          }}
          <v-icon>mdi-cube</v-icon>
        </p>
      </template>
      <template v-slot:item.hasSupplier="item">
        <slot name="hasSupplier" :item="item" />
        <p v-if="item.item.supplier" style="margin: 0">
          <v-icon color="green">mdi-check-circle-outline</v-icon>
        </p>
        <p v-else style="margin: 0">
          <v-icon>mdi-check-circle-outline</v-icon>
        </p>
      </template>
      <template v-slot:item.rating="item">
        <slot name="rating" :item="item" />
        <p v-if="item.item.rating" style="margin: 0">
          <v-icon color="orange">mdi-star</v-icon>
          <span v-if="item.item.rating">{{
            parseFloat(item.item.rating).toFixed(2)
          }}</span>
        </p>
        <p v-else style="margin: 0">
          <v-icon color="grey">mdi-star</v-icon>
        </p>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import moment from 'moment'
import { defineComponent, onMounted, ref } from '@vue/composition-api'
import { setupDataLoader } from '../../lib/data-loader'

/**
 * @displayName DataViewer
 *
 * @version 1.0.0
 * @author Arish Khan <arishsultan104@gmail.com>
 */
export default defineComponent({
  name: 'DataViewer',

  props: {
    /**
     * Title of the Viewer, it determines the type
     * of data that is being displayed.
     *
     * @since 1.0.0
     */
    title: {
      type: String,
      required: true
    },

    /**
     * Material design related prop
     *
     * @since 1.0.0
     */
    dense: {
      type: Boolean,
      default: false
    },

    /**
     * List of columns that are required to be viewed.
     *
     * @since 1.0.0
     */
    columns: {
      type: Array,
      required: true
    },

    onBlock: Function,
    onUnblock: Function,
    onAccepted: Function,
    onRejected: Function,
    onDelete: Function,
    onRefund: Function,

    /**
     * Options or additional action that need to be
     * performed on the data such as, printing a summary
     * report etc.
     *
     * @since 1.0.0
     */
    options: {
      type: Array,
      required: false,
      default: () => []
    },

    /**
     * Determines if the account can create new items
     * or not.
     *
     * @since 1.0.0
     */
    create: {
      type: Boolean,
      default: false
    },

    /**
     * Determines if the account can change items or not.
     *
     * @since 1.0.0
     */
    change: {
      type: Boolean,
      default: false
    },

    detail: {
      type: Boolean,
      default: false
    },
    back: {
      type: Boolean,
      default: false
    },
    approve: {
      type: Boolean,
      default: false
    },
    reject: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    unblock: {
      type: Boolean,
      default: false
    },
    refund: {
      type: Boolean,
      default: false
    },

    /**
     * Determines if the account can create remove items
     * or not.
     *
     * @since 1.0.0
     */
    remove: {
      type: Boolean,
      default: false
    },
    action: {
      type: Boolean,
      default: true
    },

    /**
     * It is the Service that will make the request to
     * server including the parsing of request data and
     * response data.
     *
     * @since 1.0.0
     */
    endpoint: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false
    },

    pagination: {
      type: Boolean,
      default: false
    },

    createRoute: {
      type: String,
      default: null,
      required: false
    },

    changeRoute: {
      type: String,
      default: null,
      required: false
    },

    detailRoute: {
      type: String,
      default: null,
      required: false
    },
    approveRoute: {
      type: String,
      default: null,
      required: false
    },
    rejectRoute: {
      type: String,
      default: null,
      required: false
    },

    removeRoute: {
      type: String,
      default: null,
      required: false
    },
    blockRoute: {
      type: String,
      default: null,
      required: false
    },
    unblockRoute: {
      type: String,
      default: null,
      required: false
    },
    customEdit: {
      type: Boolean,
      default: false,
      required: false
    }
  },

  setup(props, context) {
    const loader = setupDataLoader(context.root.$axios, props.endpoint, true)

    onMounted(loader.load)

    const search = ref('')
    const filter = ref(false)
    console.log(props.columns[0])
    if (props.columns[0].text !== 'SR') {
      props.columns.unshift({
        text: 'SR',
        value: 'sr',
        sortable: false,
        filterable: false,
        align: 'center',
        width: '50px'
      })
    }
    if (
      props.columns[props.columns.length - 1].text !== 'Action' &&
      props.action
    )
      props.columns.push({
        text: 'Action',
        value: 'action',
        sortable: false,
        filterable: false,
        align: 'center',
        width: '150px'
      })

    function handleCreateEvent() {
      context.root.$options.router.push(props.createRoute)
    }

    async function removeItem(item) {
      window.console.log(item)
      if (confirm('Are you sure?')) {
        await context.root.$axios.$delete(
          props.removeRoute.replace('$id', item._id)
        )
        loader.data.value.splice(loader.data.value.indexOf(item), 1)
        if (this.onDelete() != null) {
          this.onDelete()
        }
      }
    }
    async function approveItem(item) {
      window.console.log(item)
      if (confirm('Are you sure?')) {
        await context.root.$axios.$patch(
          props.approveRoute.replace('$id', item._id)
        )
        loader.data.value.splice(loader.data.value.indexOf(item), 1)
        if (this.onAccepted() != null) {
          this.onAccepted()
        }
      }
    }
    async function rejectItem(item) {
      const result = prompt(
        'Please provide reason for rejection!',
        'Credential are not according to our policy!'
      )
      if (result != null && result !== '') {
        await context.root.$axios.$patch(
          props.rejectRoute.replace('$id', item._id),
          {
            message: result
          }
        )
        loader.data.value.splice(loader.data.value.indexOf(item), 1)
        if (this.onRejected() != null) {
          this.onRejected()
        }
      } else if (result === '') {
        await context.root.$axios.$patch(
          props.rejectRoute.replace('$id', item._id)
        )
        loader.data.value.splice(loader.data.value.indexOf(item), 1)
        if (this.onRejected() != null) {
          this.onRejected()
        }
      }
    }
    async function blockItem(item) {
      window.console.log(item)
      if (confirm('Are you sure?')) {
        await context.root.$axios.$patch(
          props.blockRoute.replace('$id', item._id)
        )
        loader.data.value.splice(loader.data.value.indexOf(item), 1)
        if (this.onBlock != null) {
          this.onBlock()
        }
      }
    }
    async function unblockItem(item) {
      window.console.log(item)
      if (confirm('Are you sure?')) {
        await context.root.$axios.$patch(
          props.unblockRoute.replace('$id', item._id)
        )
        loader.data.value.splice(loader.data.value.indexOf(item), 1)
        if (this.onUnblock != null) {
          this.onUnblock()
        }
      }
    }
    function handleRefundEvent(item) {
      console.log('open dialog for refund')
      console.log(item)
      this.onRefund(item)
    }

    function returnBack() {
      this.$router.back()
    }
    function changeItem(item) {
      context.root.$options.router.push(
        props.changeRoute.replace('$id', item._id)
      )
    }
    function detailItem(item) {
      if (this.detail) {
        context.root.$options.router.push(
          props.detailRoute.replace('$id', item._id)
        )
      }
    }
    function getStatus(i) {
      switch (i) {
        case 0:
          return 'Pending'
        case 1:
          return 'Accepted'
        case 2:
          return 'Preparing'
        case 3:
          return 'Dispatched'
        case 4:
          return 'Delivered'
        case 5:
          return 'Rejected'
        case 6:
          return 'Cancelled'
        default:
          return ''
      }
    }
    function handleCustomEditEvent(item) {
      this.editItem = item
      this.dialog = true
    }
    function close() {
      this.dialog = false
    }
    async function save() {
      this.editItem.type = props.type
      await this.$axios.$patch('reward-points', this.editItem)
      this.editItem = null
      this.dialog = false
      this.load()
    }

    return {
      search,
      filter,
      ...loader,
      close,
      save,
      getStatus,
      removeItem,
      unblockItem,
      handleRefundEvent,
      returnBack,
      changeItem,
      detailItem,
      blockItem,
      approveItem,
      rejectItem,
      date: (date) => moment(date).format('MMMM Do YYYY'),
      handleCreateEvent,
      handleCustomEditEvent,
      dialog: false,
      editItem: null
    }
  }
})
</script>

<style lang="sass">
.data-viewer
  width: 100% !important
.theme--light.v-data-table tbody tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper)
 background: #fff !important
</style>
