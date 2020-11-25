<template>
  <v-container>
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
      <v-col cols="12" md="8" sm="8">
        <v-card-title>Building Material Sub Type</v-card-title>
      </v-col>
      <v-col
        style="display: flex; justify-content: center;align-items: center;"
        cols="12"
        md="3"
        sm="3"
      >
        <v-btn
          v-if="create"
          color="#FF974D"
          style="color:#ffffff"
          @click="handleCreateEvent"
        >
          Add Building Material Sub Type
        </v-btn>
      </v-col>
    </v-row>
    <div
      v-if="
        buildingMaterialSubSubs !== null || buildingMaterialSubSubs.length >= 0
      "
      class="my-row"
    >
      <div
        v-for="(buildingMaterialSub, i) of buildingMaterialSubSubs"
        :key="i"
        class="building-material-card"
        style="display: inline-block"
      >
        <v-card
          class="building-material-card"
          height="200px"
          @click="productDetail(buildingMaterialSub)"
        >
          <v-img
            :src="
              $axios.defaults.baseURL +
                'uploads/' +
                buildingMaterialSub.image.name
            "
            width="100%"
            height="100%"
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title
              class="justify-center"
              v-text="buildingMaterialSub.name"
            ></v-card-title>
          </v-img>
        </v-card>
        <v-btn
          color="#FF974D"
          style="color:red;margin: 10px;z-index: 100"
          fab
          small
          class="building-material-delete-btn"
          @click="removeItem(buildingMaterialSub)"
        >
          <v-icon small>
            mdi-delete
          </v-icon>
        </v-btn>
        <v-btn
          color="#FF974D"
          style="color:#ffffff;margin: 10px;z-index: 100"
          fab
          small
          class="building-material-edit-btn"
          @click="changeItem(buildingMaterialSub)"
        >
          <v-icon small>
            mdi-pencil
          </v-icon>
        </v-btn>
      </div>
    </div>
    <v-container
      v-if="
        (buildingMaterialSubSubs === null ||
          buildingMaterialSubSubs.length <= 0) &&
          !loading
      "
      style="display: flex;justify-content: center;align-items: center;height: 400px"
    >
      <h2>No Sub Categories Found</h2>
    </v-container>
    <v-container
      v-if="
        (buildingMaterialSubSubs === null ||
          buildingMaterialSubSubs.length <= 0) &&
          loading
      "
      style="display: flex;justify-content: center;align-items: center;height: 400px"
    >
      <v-progress-circular indeterminate color="primary" />
    </v-container>
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
export default {
  name: 'BuildingMaterialSubSub',
  props: {
    title: {
      type: String,
      default: 'Sub Category'
    },
    productsRoute: {
      type: String,
      default: 'products'
    },
    create: {
      type: Boolean,
      default: false
    },
    change: {
      type: Boolean,
      default: false
    },
    detail: {
      type: Boolean,
      default: false
    },
    remove: {
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
    removeRoute: {
      type: String,
      default: null,
      required: false
    }
  },
  data: () => ({
    loading: true,
    snackbarText: 'Success!',
    snackbarColor: 'green',
    snackbar: false,
    buildingMaterialSubSubs: []
  }),
  mounted() {
    this.getbuildingMaterialSubSubs()
  },
  setup(props, context) {
    function handleCreateEvent() {
      context.root.$options.router.push(props.createRoute)
    }

    async function removeItem(item) {
      window.console.log(item)
      if (confirm('Are you sure?')) {
        await context.root.$axios.$delete(
          props.removeRoute.replace('$id', item._id)
        )
        this.loading = true
        this.onDelete()
        await this.getbuildingMaterialSubSubs()
        this.loading = false
        // location.reload()
      }
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
    function productDetail(item) {
      context.root.$options.router.push(
        props.productsRoute.replace('$id', item._id)
      )
    }
    return {
      productDetail,
      removeItem,
      returnBack,
      changeItem,
      detailItem,
      handleCreateEvent
    }
  },
  methods: {
    async getbuildingMaterialSubSubs() {
      this.buildingMaterialSubSubs = await this.$axios.$get(
        'building-material-sub-category/getByParent/' + this.$route.params.id
      )
      console.log(this.buildingMaterialSubSubs)
      this.loading = false
    },
    onDelete() {
      this.snackbarColor = 'red'
      this.snackbarText = 'Successfully Deleted Item!'
      this.snackbar = true
    }
  }
}
</script>

<style>
.my-row {
  display: grid !important;
  grid-template-columns: 50% 50%;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}

.building-material-card {
  position: relative;
}

.building-material-edit-btn {
  position: absolute;
  top: 0;
  right: 0;
}
.building-material-delete-btn {
  position: absolute;
  top: 0;
  right: 50px;
}
</style>
