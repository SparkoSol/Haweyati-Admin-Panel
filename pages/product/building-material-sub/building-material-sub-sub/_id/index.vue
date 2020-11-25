<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <SubSub
      create
      :create-route="
        '/product/building-material-sub/building-material-sub-sub/' +
          this.$route.params.id +
          '/sub-sub-add'
      "
      change
      :change-route="
        '/product/building-material-sub/building-material-sub-sub/' +
          this.$route.params.id +
          '/edit-sub-sub/$id'
      "
      :remove-route="'/building-materials/delete-sub-category/$id'"
      :products-route="
        '/product/building-material-sub/building-material-sub-sub/building-material/$id'
      "
    />
  </div>
</template>

<script>
import SubSub from '@/components/products/building-material/sub-sub'
export default {
  name: 'Index',
  components: { SubSub }
}
</script>

<style scoped></style>
