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
        style="color: white;margin-right: 30px;"
        @click.stop="drawer = !drawer"
      />
      <img
        style="margin: auto 0"
        class="mx-2"
        src="~/assets/Haweyati_Logo_white.png"
        width="50px"
        height="50px"
        contain
      />
      <v-spacer />
      <v-badge overlap offset-x="8" offset-y="5" color="orange" dot>
        <v-icon color="orange">mdi-bell-outline</v-icon>
      </v-badge>

      <v-menu offset-y bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar
            size="45"
            style="margin-left: 25px"
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
          <v-list-item>
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
          icon: 'mdi-format-list-bulleted-square',
          title: 'Summary',
          to: '/report',
          show: true
        },
        {
          icon: 'mdi-currency-usd',
          title: 'Sales',
          to: '/report/sales',
          show: true
        },
        {
          icon: 'mdi-account-multiple',
          title: 'Suppliers',
          to: '/report/suppliers',
          show: true
        },
        {
          icon: 'mdi-gavel',
          title: 'Products',
          to: '/report/products',
          show: true
        },
        {
          icon: 'mdi-clipboard-multiple',
          title: 'Orders',
          to: '/report/orders',
          show: true
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
