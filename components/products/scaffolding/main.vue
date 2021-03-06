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
        <v-card-title>Scaffolding Type</v-card-title>
      </v-col>
    </v-row>
    <div
      v-if="scaffoldingSubs !== null || scaffoldingSubs.length > 0"
      class="my-row"
    >
      <div
        v-for="(scaffoldingSub, i) of scaffoldingSubs"
        :key="i"
        class="scaffolding-card"
        style="display: inline-block"
      >
        <v-card
          class="scaffolding-card"
          height="200px"
          @click="detailItem(scaffoldingSub)"
        >
          <v-card-title
            style="padding-left: 170px;"
            v-text="scaffoldingSub.name"
          ></v-card-title>
        </v-card>
      </div>
    </div>
    <v-container
      v-if="
        (scaffoldingSubs === null || scaffoldingSubs.length <= 0) && !loading
      "
      style="display: flex;justify-content: center;align-items: center;height: 400px"
    >
      <h2>No Categories Found</h2>
    </v-container>
    <v-container
      v-if="
        (scaffoldingSubs === null || scaffoldingSubs.length <= 0) && loading
      "
      style="display: flex;justify-content: center;align-items: center;height: 400px"
    >
      <v-progress-circular indeterminate color="primary" />
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'ScaffoldingMain',
  props: {
    detailRoute: {
      type: String,
      default: null,
      required: false
    }
  },
  data: () => ({
    loading: true,
    scaffoldingSubs: []
  }),
  mounted() {
    this.getScaffoldingSubs()
  },
  setup(props, context) {
    function handleCreateEvent() {
      context.root.$options.router.push(props.createRoute)
    }

    function returnBack() {
      this.$router.back()
    }

    function detailItem(item) {
      context.root.$options.router.push(
        props.detailRoute.replace('$id', item._id)
      )
    }
    return {
      returnBack,
      detailItem,
      handleCreateEvent
    }
  },
  methods: {
    async getScaffoldingSubs() {
      this.scaffoldingSubs = await this.$axios.$get('scaffoldings')
      this.loading = false
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

.scaffolding-card {
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('../../../assets/images/scaffolding-main/Patented-Scaffolding.png');
  background-size: contain;
}
</style>
