<template>
  <v-card v-if="reviews.length > 0" style="padding: 10px 30px;margin-top: 10px">
    <v-card-title>{{ title }}</v-card-title>
    <v-card
      v-for="review in reviews"
      :key="review"
      style="padding: 10px; margin-bottom: 10px"
    >
      <div
        style="display: grid; grid-template-columns: 10% 75% 1fr; align-items: center; justify-content: center"
      >
        <v-avatar size="80" color="white">
          <img
            v-if="review.customer.profile && review.customer.profile.image"
            :src="
              $axios.defaults.baseURL +
                'uploads/' +
                review.customer.profile.image.name
            "
            alt="customer"
          />
          <img
            v-else
            src="../../assets/images/placeholders/placeholder_person.jpg"
            alt="placeholder"
          />
        </v-avatar>
        <div>
          <p style="margin: 0">{{ review.customer.profile.name }}</p>
          <p>
            {{ isDriver ? review.driverFeedback : review.supplierFeedback }}
          </p>
        </div>
        <div v-if="isDriver">
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
        <div v-else>
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
      </div>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: 'Reviews',
  props: {
    title: {
      type: String,
      required: true
    },
    endpoint: {
      type: String,
      required: true
    },
    isDriver: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    reviews: []
  }),
  mounted() {
    this.getReviews()
  },
  methods: {
    async getReviews() {
      this.reviews = await this.$axios.$get(this.endpoint)
      console.log(this.reviews)
    }
  }
}
</script>

<style scoped></style>
