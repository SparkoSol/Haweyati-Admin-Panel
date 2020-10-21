<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <RewardMain
      title="Manage Reward Points"
      route="/reward/add"
      endpoint="/reward-points/get-all"
    />
  </div>
</template>

<script>
import RewardMain from '@/components/reward/main'
export default {
  name: 'Index',
  components: { RewardMain }
}
</script>

<style scoped></style>
