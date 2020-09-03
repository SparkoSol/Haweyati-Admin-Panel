<template>
  <div
    style="width: 100%;height: 100%;background-color:#fff;border-top-left-radius:40px;padding: 10px"
  >
    <NotificationForm />
  </div>
</template>

<script>
import NotificationForm from '../../components/notification/form'
export default {
  name: 'Send',
  components: { NotificationForm }
}
</script>

<style scoped></style>
