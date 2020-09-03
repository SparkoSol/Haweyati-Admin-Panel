<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <DumpsterMain
      title="Construction Dumpster"
      endpoint="dumpsters"
      route="product/construction-dumpster"
    />
  </div>
</template>

<script>
import DumpsterMain from '../../../components/products/construction-dumpster/main'
export default {
  components: { DumpsterMain }
}
</script>

<style scoped></style>
