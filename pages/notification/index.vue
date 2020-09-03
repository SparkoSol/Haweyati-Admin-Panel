<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <NotificationMain
      title="Manage Notifications"
      endpoint="fcm/get-history"
      route="/notification"
    />
  </div>
</template>

<script>
import NotificationMain from '../../components/notification/main'
export default {
  name: 'Index',
  components: { NotificationMain }
}
</script>

<style scoped></style>
