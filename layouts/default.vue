<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      class="drawer"
      color="#313F53"
      clipped
      fixed
      app
    >
      <v-divider />
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          active-class="drawer-menu-item-active"
          class="drawer-menu-item"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon class="drawer-menu-item-icon">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              class="drawer-menu-item-title"
              v-text="item.title"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left elevation="0" color="#313F53" fixed app>
      <v-app-bar-nav-icon
        style="color: white;margin-right: 30px;text-align: center"
        @click.stop="drawer = !drawer"
      />
      <v-spacer />
      <img
        style="margin: auto 0"
        class="mx-2"
        src="~/assets/Haweyati_Logo_white.png"
        width="50px"
        height="50px"
        contain
      />
      <v-spacer />
      <v-menu offset-y bottom transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-badge :value="badge === 'true'" overlap color="orange" dot>
            <v-icon v-bind="attrs" color="orange" v-on="on"
              >mdi-bell-outline</v-icon
            >
          </v-badge>
        </template>
        <div style="max-height: 500px; overflow: auto" class="scrollbar">
          <v-list>
            <v-list-item
              v-for="(notification, i) of notifications"
              :key="i"
              two-line
              @click="openNotification(notification)"
            >
              <v-list-item-content>
                <v-list-item-title>
                  <v-badge
                    :value="!notification.seen"
                    offset-y="11"
                    offset-x="-10"
                    color="orange"
                    dot
                  >
                    {{ notification.title }}
                  </v-badge>
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ notification.message }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action-text>
                {{ calcAgo(notification.createdAt) }}
              </v-list-item-action-text>
            </v-list-item>
          </v-list>
        </div>
      </v-menu>
      <v-menu offset-y bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar
            size="45"
            style="margin-left: 25px;"
            v-bind="attrs"
            v-on="on"
          >
            <img
              v-if="!$auth.user.image"
              src="../assets/images/placeholders/placeholder_person.jpg"
              alt="John"
            />
            <img
              v-else
              :src="
                $axios.defaults.baseURL + 'uploads/' + $auth.user.image.name
              "
            />
          </v-avatar>
        </template>
        <v-list>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>
                {{ dropdownMenuItems[0].title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ dropdownMenuItems[0].subtitle }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="toSetting">
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ dropdownMenuItems[1].title }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ dropdownMenuItems[2].title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      drawer: 'true',
      notifications: null,
      badge: null,
      dropdownMenuItems: [
        { title: this.$auth.user.name, subtitle: this.$auth.user.contact },
        { title: 'Settings' },
        { title: 'Logout' }
      ],
      items: [
        {
          icon: 'mdi-home',
          title: 'Dashboard',
          to: '/',
          show: true
        },
        {
          icon: 'mdi-account-multiple',
          title: 'Customers',
          to: '/customer',
          show: true
        },
        {
          icon: 'mdi-account',
          title: 'Drivers',
          to: '/driver',
          show: true
        },
        {
          icon: 'mdi-store',
          title: 'Suppliers',
          to: '/store',
          show: true
        },
        {
          icon: 'mdi-gavel',
          title: 'Products',
          to: '/product',
          show: true
        },
        {
          icon: 'mdi-gavel',
          title: 'Requests',
          to: '/request',
          show: true
        },
        {
          icon: 'mdi-clipboard-multiple',
          title: 'Orders',
          to: '/order',
          show: true
        },
        {
          icon: 'mdi-clock-time-four',
          title: 'Manage Time Slots',
          to: '/time-slot',
          show: true
        },
        {
          icon: 'mdi-bell',
          title: 'Manage Notifications',
          to: '/notification',
          show: true
        },
        {
          icon: 'mdi-cog',
          title: 'Settings',
          to: '/setting',
          show: false
        },
        {
          icon: 'mdi-file-chart',
          title: 'Reports',
          show: true
        },
        {
          icon: 'mdi-account-plus',
          title: 'Register Admin',
          to: '/auth/signup',
          show: true
        }
      ]
    }
  },
  created() {},
  mounted() {
    this.socket = this.$nuxtSocket({})
    /* Listen for events: */
    this.socket.on('msgToClient', (msg, cb) => {
      console.log(msg)
      localStorage.setItem('badge', cb)
      this.getNotificationBadge()
      this.getNotifications()
      console.log(cb)
    })
    this.getNotifications()
    this.getNotificationBadge()
  },
  methods: {
    getNotificationBadge() {
      if (!localStorage.getItem('badge')) {
        localStorage.setItem('badge', false)
      }
      this.badge = localStorage.getItem('badge')
    },
    async logout() {
      try {
        await this.$auth.logout()
        location.reload()
      } catch (err) {}
    },
    async getNotifications() {
      this.notifications = await this.$axios.$get('admin-notifications')
    },
    calcAgo(time) {
      if (moment().diff(time, 'days') !== 0) {
        return moment().diff(time, 'days') + ' Days Ago'
      } else if (moment().diff(time, 'hour') !== 0) {
        return moment().diff(time, 'hour') + ' Hrs Ago '
      } else if (moment().diff(time, 'minute') !== 0) {
        return moment().diff(time, 'minute') + ' Mins Ago'
      } else if (moment().diff(time, 'second') !== 0) {
        return moment().diff(time, 'second') + ' Secs Ago'
      } else {
        return 'Just Now'
      }
    },
    toSetting() {
      this.$router.push('setting')
    },
    audio() {
      const data = {
        sound: '@/assets/audio/notification.mp3',
        soundurl:
          'http://soundbible.com/mp3/analog-watch-alarm_daniel-simion.mp3'
      }
      const audio = new Audio(data.sound)
      audio.play()
    },
    async openNotification(item) {
      if (item.type === 'Order') {
        this.$router.push('/order')
      } else if (item.type === 'Service') {
        this.$router.push('/request')
      } else if (item.type === 'Customer') {
        this.$router.push('/customer')
      } else if (item.type === 'Driver') {
        this.$router.push('/driver')
      } else if (item.type === 'Supplier') {
        this.$router.push('/store')
      } else {
      }
      await this.$axios.$patch('admin-notifications')
      localStorage.setItem('badge', false)
      this.getNotificationBadge()
      this.getNotifications()
    }
  }
}
</script>

<style scoped>
.drawer {
  border: none;
}
.drawer-menu-item {
  color: white;
  border: none;
}
.drawer-menu-item-icon {
  color: white;
}
.drawer-menu-item-title {
  color: white;
}
.drawer-menu-item:hover {
  background-color: white;
}
.drawer-menu-item:hover .drawer-menu-item-icon {
  color: #313f53;
}
.drawer-menu-item:hover .drawer-menu-item-title {
  color: #313f53;
}
.drawer-menu-item-active {
  background-color: white;
}
.drawer-menu-item-active .drawer-menu-item-icon {
  color: #313f53;
}
.drawer-menu-item-active .drawer-menu-item-title {
  color: #313f53;
}
</style>
