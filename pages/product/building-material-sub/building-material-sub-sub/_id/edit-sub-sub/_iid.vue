<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <SubSubForm
      endpoint="building-material-sub-category"
      title="Edit Building Material Sub type"
      :building-material-sub="buildingMaterialSubSub"
      is-update
    />
  </div>
</template>

<script>
import SubSubForm from '@/components/products/building-material/sub-sub-form'
export default {
  components: {
    SubSubForm
  },
  async asyncData({ $axios, route }) {
    return {
      buildingMaterialSubSub: await $axios.$get(
        'building-material-sub-category/' + route.params.iid
      )
    }
  }
}
</script>
