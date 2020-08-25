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
        <div v-for="item in items" :key="item.title">
          <v-list-item
            v-if="!item.items"
            ripple
            :to="item.to"
            active-class="drawer-menu-item-active"
            class="drawer-menu-item"
          >
            <v-list-item-action>
              <v-icon color="#FF974D">{{ item.action }}</v-icon>
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
            active-class="drawer-menu-item-active"
            class="drawer-menu-item"
            no-action
          >
            <v-list-item slot="activator">
              <v-list-item-action>
                <v-icon color="#FF974D">{{ item.action }}</v-icon>
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
              @click="close"
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
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: 'true',
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
            { title: 'Sales' },
            { title: 'Suppliers' },
            { title: 'Products' },
            { title: 'Orders' }
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
  methods: {
    async logout() {
      try {
        await this.$auth.logout()
        location.reload()
      } catch (err) {}
    },
    close() {
      this.items.forEach((item) => {
        if (item.active) {
          this.delay(function() {
            item.active = false
          }, 300)
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.v-list-group-prepend-icon .v-icon {
  color: green;
}
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
