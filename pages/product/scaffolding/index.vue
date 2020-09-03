<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <ScaffoldingMain detail-route="/product/scaffolding/detail/$id" />
  </div>
</template>

<script>
import ScaffoldingMain from '../../../components/products/scaffolding/main'
export default {
  components: { ScaffoldingMain }
}
</script>

<style scoped></style>
