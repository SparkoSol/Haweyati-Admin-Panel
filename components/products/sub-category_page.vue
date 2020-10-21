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
        <v-card-title>{{ name }}</v-card-title>
      </v-col>
      <v-col
        style="display: flex; justify-content: center;align-items: center;"
        cols="12"
        md="3"
        sm="3"
      >
        <v-btn
          color="#FF974D"
          style="color:#ffffff"
          @click="reroute('/building-material-sub-add')"
        >
          Add {{ name }}
        </v-btn>
      </v-col>
    </v-row>
    <div class="my-row">
      <v-card
        v-for="(subCategory, i) of subCategories"
        :key="i"
        class="building-material-card"
        height="200px"
        to="/product/construction-dumpster"
      >
        <v-img
          src="https://res.cloudinary.com/parallax-agency/image/upload/c_fill%2Cq_auto%2Cf_auto%2Cw_1780%2Ch_780/statamic/clear-channel-production/old_blog/ASDA-1024x684.jpg"
          width="100%"
          height="100%"
          class="white--text align-center"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        >
          <v-card-title
            class="justify-center"
            v-text="subCategory.name"
          ></v-card-title>
        </v-img>
        <v-btn
          color="#FF974D"
          style="color:#ffffff;margin: 10px"
          fab
          small
          class="building-material-edit-btn"
          @click="reroute('/building-material-sub-edit')"
        >
          <v-icon small>
            mdi-pencil
          </v-icon>
        </v-btn>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'SubCategoryPage',
  props: {
    title: {
      type: String,
      default: 'title'
    }
  },
  data: () => ({
    name: 'Main Category Name',
    subCategories: [
      {
        name: 'Sub Category 1'
      }
    ]
  }),
  mounted() {},
  methods: {
    reroute(route, params) {
      this.$router.push({ name: route, params })
    },
    returnBack() {
      this.$router.back()
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
</style>
