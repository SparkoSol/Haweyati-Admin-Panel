<template>
  <ImageSelector v-model="imageFile" :image="data" />
</template>

<script>
import ImageSelector from '../../components/image-selector'
export default {
  components: { ImageSelector },
  async asyncData({ $axios, route }) {
    return {
      data: await $axios.$get('dumpsters/5f12c07ee7e0af3094e56d31')
    }
  },
  data() {
    return {
      imageFile: null
    }
  }
}
</script>
