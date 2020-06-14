<template>
    <v-container>
        <v-row>
            <v-col style="display: flex ; align-items: center; justify-content: center" cols="12" md="1" sm="1">
                <v-btn icon @click="returnBack">
                    <v-icon>mdi-keyboard-backspace</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="12" md="8" sm="8">
                <v-card-title>{{name}}</v-card-title>
            </v-col>
            <v-col cols="12" md="3" sm="3" style="display: flex;align-items: center;justify-content: center"
                   @click="reroute('/construction-dumpster-add')">
                <v-btn color="#FF974D" style="color:#ffffff">Add {{name}}</v-btn>
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
                :items="products"
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
                               @click="reroute('/construction-dumpster-edit')">Edit
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
        name: 'ProductPage',

        data: () => ({
            name: '',
            headers: [
                {text: 'Image', value: 'image'},
                {text: 'Type', value: 'type'},
                {text: 'Status', value: 'status'},
                {text: 'Actions', value: 'actions', align: 'center'},
            ],
            products: [],
        }),
        mounted() {
            this.name = this.$route.params.name;
            this.products = this.$route.params.data;
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
