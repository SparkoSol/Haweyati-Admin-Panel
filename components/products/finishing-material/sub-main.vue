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
        <v-card-title>{{ title }}</v-card-title>
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
          Add {{ title }}
        </v-btn>
      </v-col>
    </v-row>
    <div
      v-if="finishingMaterialSubs !== null || finishingMaterialSubs.length >= 0"
      class="my-row"
    >
      <div
        v-for="(finishingMaterialSub, i) of finishingMaterialSubs"
        :key="i"
        class="finishing-material-card"
        style="display: inline-block"
      >
        <v-card
          class="finishing-material-card"
          height="200px"
          @click="productDetail(finishingMaterialSub)"
        >
          <v-img
            src="https://image.freepik.com/free-photo/sand-beach-as-background_102618-461.jpg"
            width="100%"
            height="100%"
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title
              class="justify-center"
              v-text="finishingMaterialSub.name"
            ></v-card-title>
          </v-img>
        </v-card>
        <v-btn
          color="#FF974D"
          style="color:#ffffff;margin: 10px;z-index: 100"
          fab
          small
          class="finishing-material-edit-btn"
          @click="changeItem(finishingMaterialSub)"
        >
          <v-icon small>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn
          color="#FF974D"
          style="color:red;margin: 10px;z-index: 100"
          fab
          small
          class="finishing-material-delete-btn"
          @click="removeItem(finishingMaterialSub)"
        >
          <v-icon small>
            mdi-delete
          </v-icon>
        </v-btn>
      </div>
    </div>
    <v-container
      v-if="finishingMaterialSubs === null || finishingMaterialSubs.length <= 0"
      style="display: flex;justify-content: center;align-items: center;height: 400px"
    >
      <h2>No Categories Found</h2>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'FinishingMaterialSub',
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
    finishingMaterialSubs: []
  }),
  mounted() {
    this.getfinishingMaterialSubs()
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
        location.reload()
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
    async getfinishingMaterialSubs() {
      this.finishingMaterialSubs = await this.$axios.$get(
        'finishing-material-category'
      )
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

.finishing-material-card {
  position: relative;
}

.finishing-material-edit-btn {
  position: absolute;
  top: 0;
  right: 0;
}
.finishing-material-delete-btn {
  position: absolute;
  top: 0;
  right: 50px;
}
</style>
