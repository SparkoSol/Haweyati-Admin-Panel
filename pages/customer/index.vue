<template>
  <v-container>
    <h2>Customers</h2>
    <v-row style="display: flex;justify-content: right;align-items: center">
      <v-col cols="12" md="4" sm="4"></v-col>
      <v-col cols="12" md="4" sm="4" style="text-align: center">
        <v-label style="background-color: red"
          >Showing 1 to 10 of 150 entries
        </v-label>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <v-text-field
          outlined
          color="#FF974D"
          hide-details
          dense
          label="Search..."
          append-icon="mdi-magnify"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <div
      style="display: grid; grid-template-columns: auto auto; grid-column-gap: 20px"
    >
      <v-card
        v-for="(item, i) in items"
        :key="i"
        style="padding: 10px;margin-bottom: 25px"
      >
        <v-row
          style="display: grid;grid-template-columns: 70px 2fr 100px; padding: 20px"
        >
          <div>
            <v-avatar size="60" color="white">
              <img :src="item.avatar" alt="John" />
            </v-avatar>
          </div>
          <div>
            <h3>{{ item.name }}</h3>
            <v-label>{{ item.name }}</v-label>
            <h5 style="color: grey">{{ item.address }}</h5>
          </div>
          <v-btn color="#FF974D" dark tile small @click="dialog = true"
            >Message
          </v-btn>
        </v-row>
        <div style="margin-top: 10px;margin-bottom: 15px;margin-left: 10px">
          <v-label>41 MaidStone Road,WENDY</v-label>
        </div>
      </v-card>
    </div>

    <v-dialog v-model="dialog" width="600px">
      <v-card>
        <v-container style="text-align: center;margin-top: 10px">
          <div style="display: inline-block;text-align: center">
            <v-row><h2>Send Mail</h2></v-row>
            <v-row><h2>Madiha Munawar</h2></v-row>
          </div>
        </v-container>
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field outlined label="Subject"></v-text-field>
            </v-row>
            <v-row>
              <v-textarea
                outlined
                label="Type Something..."
                class="scrollbar"
              ></v-textarea>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
          name: 'Madiha Munawar',
          email: 'madihamunawar@gmail.com',
          address: 'xxx-xxxx-xx'
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
          name: 'Madiha Munawar',
          email: 'madihamunawar@gmail.com',
          address: 'xxx-xxxx-xx'
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
          name: 'Madiha Munawar',
          email: 'madihamunawar@gmail.com',
          address: 'xxx-xxxx-xx'
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
          name: 'Madiha Munawar',
          email: 'madihamunawar@gmail.com',
          address: 'xxx-xxxx-xx'
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
          name: 'Madiha Munawar',
          email: 'madihamunawar@gmail.com',
          address: 'xxx-xxxx-xx'
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
          name: 'Madiha Munawar',
          email: 'madihamunawar@gmail.com',
          address: 'xxx-xxxx-xx'
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
          name: 'Madiha Munawar',
          email: 'madihamunawar@gmail.com',
          address: 'xxx-xxxx-xx'
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
          name: 'Madiha Munawar',
          email: 'madihamunawar@gmail.com',
          address: 'xxx-xxxx-xx'
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
          name: 'Madiha Munawar',
          email: 'madihamunawar@gmail.com',
          address: 'xxx-xxxx-xx'
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
          name: 'Madiha Munawar',
          email: 'madihamunawar@gmail.com',
          address: 'xxx-xxxx-xx'
        }
      ]
    }
  }
}
</script>

<style scoped></style>
