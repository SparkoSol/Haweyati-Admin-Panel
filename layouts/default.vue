<template>
  <v-app class="window-scrollbar">
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
        <div v-for="item in items" :key="item.title">
          <v-list-item
            v-if="!item.items"
            ripple
            :to="item.to"
            dense
            active-class="drawer-menu-item-active"
            class="drawer-menu-item"
          >
            <v-list-item-action>
              <v-icon color="#FF974D" dense>{{ item.action }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="drawer-menu-item-title">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group
            v-else
            v-model="item.active"
            class="drawer-menu-item"
            no-action
          >
            <v-list-item slot="activator" style="padding: 0" dense>
              <v-list-item-action>
                <v-icon dense color="#FF974D">{{ item.action }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="drawer-menu-item-title">{{
                  item.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-for="subItem in item.items"
              :key="subItem.title"
              dense
              :to="subItem.to"
            >
              <v-list-item-content>
                <v-list-item-title class="drawer-menu-item-title">{{
                  subItem.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left elevation="0" dense color="#313F53" fixed app>
      <v-icon
        aria-hidden="true"
        style="color: white;margin-right: 30px;text-align: center"
        @click.stop="drawer = !drawer"
        >mdi-menu</v-icon
      >
      <v-spacer />
      <img
        alt="logo"
        style="margin: auto 0"
        class="mx-2"
        src="~/assets/Haweyati_Logo_white.png"
        width="50px"
        height="50px"
      />
      <v-spacer />
      <v-menu offset-y bottom transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-badge :value="badge === 'true'" overlap color="#ff974d" dot>
            <v-icon aria-hidden="true" v-bind="attrs" color="#ff974d" v-on="on"
              >mdi-bell</v-icon
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
                    color="#ff974d"
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
            <v-list-item v-if="!notifications || notifications.length <= 0">
              <p>No Notifications Yet!!</p>
            </v-list-item>
          </v-list>
        </div>
      </v-menu>
      <v-menu offset-y bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar
            size="35"
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
              alt="profile"
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
    <v-content style="background-color: #313F53;">
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
          action: 'mdi-home',
          title: 'Dashboard',
          to: '/',
          active: false
        },
        {
          action: 'mdi-account-multiple',
          title: 'Customers',
          to: '/customer',
          active: true
        },
        {
          action: 'mdi-account',
          title: 'Drivers',
          to: '/driver',
          active: false
        },
        {
          action: 'mdi-store',
          title: 'Suppliers',
          to: '/store',
          active: false
        },
        {
          action: 'mdi-gavel',
          title: 'Products',
          to: '/product',
          active: false
        },
        {
          action: 'mdi-gavel',
          title: 'Requests',
          to: '/request',
          active: false
        },
        {
          action: 'mdi-clipboard-multiple',
          title: 'Orders',
          to: '/order',
          active: false
        },
        {
          action: 'mdi-star',
          title: 'Rewards',
          to: '/reward',
          active: false
        },
        {
          action: 'mdi-clock-time-four',
          title: 'Manage Time Slots',
          to: '/time-slot',
          active: false
        },
        {
          action: 'mdi-bell',
          title: 'Manage Notifications',
          to: '/notification',
          active: false
        },
        {
          action: 'mdi-car',
          title: 'Manage Vehicle Type',
          to: '/vehicle-type',
          active: false
        },
        {
          action: 'mdi-vector-square',
          title: 'Manage Units',
          to: '/unit',
          active: false
        },
        {
          action: 'mdi-city',
          title: 'Manage Cities',
          to: '/city',
          active: false
        },
        {
          action: 'mdi-cog',
          title: 'Settings',
          to: '/setting',
          active: false
        },
        {
          action: 'mdi-file-chart',
          title: 'Reports',
          active: false,
          items: [
            // { title: 'Sales', to: '/report/sales' },
            // { title: 'Suppliers', to: '/report/suppliers' },
            // { title: 'Products', to: '/report/products' },
            { title: 'Orders', to: '/report/orders' }
          ]
        },
        {
          action: 'mdi-account-plus',
          title: 'Register Admin',
          to: '/auth/signup',
          active: false
        }
      ]
    }
  },
  created() {},
  mounted() {
    this.socket = this.$nuxtSocket({})
    /* Listen for events: */
    this.socket.on('msgToClient', (msg, cb) => {
      console.log('cb')
      console.log(cb)
      localStorage.setItem('badge', cb)
      this.getNotificationBadge()
      this.getNotifications()
      if (cb) this.audio()
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
    toHome() {
      this.$router.push('/')
    },
    audio() {
      try {
        const data = {
          soundurl: 'http://178.128.16.246:4000/uploads/notificationTone.mpeg'
        }
        const audio = new Audio(data.soundurl)
        audio.play()
      } catch (e) {
        setTimeout(1000)
        this.audio()
      }
    },
    async openNotification(item) {
      if (item.type === 'Order') {
        await this.$router.push('/order')
      } else if (item.type === 'Service') {
        await this.$router.push('/request')
      } else if (item.type === 'Customer') {
        await this.$router.push('/customer')
      } else if (item.type === 'Driver') {
        await this.$router.push('/driver')
      } else if (item.type === 'Supplier') {
        await this.$router.push('/store')
      } else {
      }
      await this.$axios.$patch('admin-notifications')
      localStorage.setItem('badge', false)
      this.getNotificationBadge()
      await this.getNotifications()
    }
  }
}
</script>

<style>
.v-divider {
  margin: 15px 0;
}
.theme--light.v-navigation-drawer .v-divider {
  border-color: #313f53;
}
.theme--light.v-navigation-drawer:not(.v-navigation-drawer--floating)
  .v-navigation-drawer__border {
  display: none;
}
.drawer {
  border: none;
}
.drawer-menu-item {
  color: white;
  border: none;
}
.drawer-menu-item {
  color: white;
}
.drawer-menu-item-title {
  color: white;
}
.drawer-menu-item:hover {
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
  background-color: white;
  text-decoration: none;
  opacity: 1 !important;
}
.drawer-menu-item:hover {
  color: #313f53;
  text-decoration: none !important;
}
.drawer-menu-item:hover .drawer-menu-item-title {
  color: #313f53;
  text-decoration: none !important;
}
.drawer-menu-item-active .drawer-menu-item-title {
  color: #313f53;
  text-decoration: none !important;
}
.drawer-menu-item-active {
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
  background-color: white !important;
  opacity: 1 !important;
}
.drawer-menu-item:hover::before {
  opacity: 1;
}
.drawer-menu-item-title:hover {
  text-decoration: none !important;
}
.v-list-item {
  text-decoration: none !important;
}
.v-list-item--link:before {
  background-color: rgba(255, 255, 255, 1);
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
}
</style>
