<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <DumpsterForm title="Add Construction Dumpster" endpoint="dumpsters" />
  </div>
</template>

<script>
import DumpsterForm from '../../../components/products/construction-dumpster/form'
export default {
  components: { DumpsterForm }
}
</script>

<style scoped></style>
