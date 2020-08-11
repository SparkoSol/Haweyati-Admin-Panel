<template>
  <div style="display: flex;flex-direction: column;justify-content: center">
    <div style="padding: 20px">
      <v-text-field
        v-model="searchQuery"
        placeholder="search"
        @keyup="search"
      />
    </div>
    <div style="padding: 20px">
      <table v-if="orders">
        <thead>
          <tr>
            <th>All Resources</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) of orders" :key="i">
            <td>
              <li>
                {{ item.service }}
              </li>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data: () => ({
    searchQuery: null,
    orders: null
  }),
  mounted() {
    this.getOrders()
  },
  methods: {
    async getOrders() {
      this.orders = await this.$axios.$get('/orders')
    },
    async search() {
      console.log(
        await this.$axios.$get('/orders/search?name=' + this.searchQuery)
      )
      this.orders = await this.$axios.$get(
        '/orders/search?name=' + this.searchQuery
      )
    }
  }
}
</script>

<style scoped></style>
