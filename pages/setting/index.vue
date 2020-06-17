<template>
  <v-container>
    <v-card-title>Settings</v-card-title>
    <v-card style="padding:20px;">
      <v-card-title>Profile</v-card-title>
      <v-text-field
        color="#313F53"
        outlined
        style="color: #313F53"
        label="Name"
        dense
      ></v-text-field>
      <v-text-field
        color="#313F53"
        outlined
        style="color: #313F53"
        label="Email"
        dense
      ></v-text-field>
      <v-text-field
        color="#313F53"
        outlined
        style="color: #313F53"
        label="Phone"
        dense
      ></v-text-field>
      <v-text-field
        color="#313F53"
        outlined
        style="color: #313F53"
        label="Password"
        dense
      ></v-text-field>
    </v-card>
    <v-container
      style="margin-top:20px;display: flex;align-items: center;justify-content: center"
    >
      <v-btn color="#FF974D" style="color:#ffffff" x-large>
        Save
      </v-btn>
    </v-container>
  </v-container>
</template>

<script>
export default {}
</script>
