<template>
  <NotificationMain
    title="Manage Notifications"
    endpoint="fcm/get-history"
    route="/notification"
  />
</template>

<script>
import NotificationMain from '../../components/notification/main'
export default {
  name: 'Index',
  components: { NotificationMain }
}
</script>

<style scoped></style>
