<template>
  <v-card v-if="review" style="padding: 10px 30px;margin-top: 10px">
    <v-card-title>{{ title }}</v-card-title>
    <v-card style="padding: 10px; margin-bottom: 10px">
      <NuxtLink
        style="display: grid; grid-template-columns: 10% 75% 1fr; align-items: center; justify-content: center;text-decoration: none;color:black"
        :to="'/store/detail/' + review.supplier._id"
      >
        <v-avatar size="80" color="white">
          <img
            v-if="review.supplier.person && review.supplier.person.image"
            :src="
              $axios.defaults.baseURL +
                'uploads/' +
                review.supplier.person.image.name
            "
            alt="supplier"
          />
          <img
            v-else
            src="../../assets/images/placeholders/placeholder_person.jpg"
            alt="placeholder"
          />
        </v-avatar>
        <div style="cursor: pointer">
          <p style="margin: 0;cursor: pointer">Supplier Feedback</p>
          <p style="cursor: pointer">
            {{ review.supplierFeedback }}
          </p>
        </div>
        <div>
          <v-icon
            v-for="index in review.supplierRating"
            :key="index"
            color="orange"
            >mdi-star</v-icon
          >
          <div style="display: inline-block;margin-left: -4px">
            <v-icon
              v-for="index in 5 - review.supplierRating"
              :key="index"
              color="grey"
              >mdi-star</v-icon
            >
          </div>
        </div>
      </NuxtLink>
    </v-card>
    <v-card style="padding: 10px; margin-bottom: 10px">
      <NuxtLink
        style="display: grid; grid-template-columns: 10% 75% 1fr; align-items: center; justify-content: center;text-decoration: none;color:black"
        :to="'/driver/detail/' + review.driver._id"
      >
        <v-avatar size="80" color="white">
          <img
            v-if="review.driver.profile && review.driver.profile.image"
            :src="
              $axios.defaults.baseURL +
                'uploads/' +
                review.driver.profile.image.name
            "
            alt="driver"
          />
          <img
            v-else
            src="../../assets/images/placeholders/placeholder_person.jpg"
            alt="placeholder"
          />
        </v-avatar>
        <div style="cursor: pointer">
          <p style="margin: 0;cursor: pointer">Driver Feedback</p>
          <p style="cursor: pointer">
            {{ review.driverFeedback }}
          </p>
        </div>
        <div>
          <v-icon
            v-for="index in review.driverRating"
            :key="index"
            color="orange"
            >mdi-star</v-icon
          >
          <div style="display: inline-block;margin-left: -4px">
            <v-icon
              v-for="index in 5 - review.driverRating"
              :key="index"
              color="grey"
              >mdi-star</v-icon
            >
          </div>
        </div>
      </NuxtLink>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: 'OrderReviews',
  props: {
    title: {
      type: String,
      required: true
    },
    endpoint: {
      type: String,
      required: true
    }
  },
  data: () => ({
    reviews: [],
    review: null
  }),
  mounted() {
    this.getReviews()
  },
  methods: {
    async getReviews() {
      this.reviews = await this.$axios.$get(this.endpoint)
      this.review = this.reviews[0]
      console.log(this.reviews)
    }
  }
}
</script>

<style scoped></style>
