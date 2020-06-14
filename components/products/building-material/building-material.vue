<template>
    <v-container>
        <v-row>
            <v-col style="display: flex ; align-items: center; justify-content: center" cols="12" md="1" sm="1">
                <v-btn icon @click="returnBack">
                    <v-icon>mdi-keyboard-backspace</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="12" md="8" sm="8">
                <v-card-title>{{ name }}</v-card-title>
            </v-col>
            <v-col cols="12" md="3" sm="3" style="display: flex;align-items: center;justify-content: center"
                   @click="reroute('/building-material-add')">
                <v-btn color="#FF974D" style="color:#ffffff">Add Sand</v-btn>
            </v-col>
        </v-row>
        <v-text-field
                style="width: 30%"
                outlined
                label="Search"
                dense
                append-icon="mdi-magnify"
        ></v-text-field>
        <v-data-table
                :headers="headers"
                :items="dumpsters"
                class="elevation-1"
        >
            <template v-slot:item="row">
                <tr>
                    <td>
                        <v-avatar size="40">
                            <img
                                    :src='row.item.image'
                            >
                        </v-avatar>
                    </td>
                    <td>{{row.item.type}}</td>
                    <td>{{row.item.status}}</td>
                    <td style="display: flex;align-items: center;justify-content: center">
                        <v-btn color="#FF974D" style="color:#ffffff;margin-right: 10px"
                               @click="reroute('/building-material-edit')">Edit
                        </v-btn>
                        <v-btn color="red" style="color:#ffffff;">Delete</v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
    export default {
        name: 'BuildingMaterial',

        data: () => ({
            name: '',
            headers: [
                {text: 'Image', value: 'image'},
                {text: 'Type', value: 'type'},
                {text: 'Status', value: 'status'},
                {text: 'Actions', value: 'actions', align: 'center'},
            ],
            dumpsters: [{
                image: "https://cdn.vuetifyjs.com/images/john.jpg",
                type: "Fine Sand",
                status: "Active"
            }, {
                image: "https://cdn.vuetifyjs.com/images/john.jpg",
                type: "Regular Sand",
                status: "Active",
            }],
        }),

        mounted() {
            this.name = this.$route.params.name
            console.log(this.$route.params)
        },

        methods: {
            returnBack() {
                this.$router.back();
            },
            reroute(route) {
                this.$router.push(route);
            }
        }
    }
</script>

<style>

</style>
