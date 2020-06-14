<template>
    <v-container>
        <v-row>
            <v-col style="display: flex ; align-items: center; justify-content: center" cols="12" md="1" sm="1">
                <v-btn icon @click="returnBack">
                    <v-icon>mdi-keyboard-backspace</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="12" md="11" sm="11">
                <v-card-title>Add Sand</v-card-title>
            </v-col>
        </v-row>
        <v-card style="padding:20px;margin-bottom: 20px">
            <v-text-field
                    color="#313F53"
                    outlined
                    style="color: #313F53"
                    label="Title"
                    dense
            ></v-text-field>
            <v-textarea
                    color="#313F53"
                    outlined
                    label="Description"
                    dense
            ></v-textarea>
        </v-card>
        <v-card style="padding:20px;margin-bottom: 20px">
            <v-card-title>Media</v-card-title>
            <v-file-input
                    color="#313F53"
                    label="File input"
                    prepend-icon=""
                    prepend-inner-icon="mdi-camera"
                    outlined
                    dense
            ></v-file-input>
        </v-card>
        <v-card style="padding: 20px;margin-bottom: 20px">
            <v-card-title style="color: #313F53">Pricing</v-card-title>
            <v-divider></v-divider>
            <v-row>
                <v-col cols="12" md="9" sm="9">
                    <v-card-title style="color: #313F53">City</v-card-title>
                </v-col>
                <v-col cols="12" md="3" sm="3" style="display: flex; align-items: center">
                    <v-btn color="Green" @click="cities.push({ name: '', value: '' })">Add City</v-btn>
                </v-col>
            </v-row>
            <v-row v-for="(city, i) of cities" :key="i">
                <v-col cols="12" md="5" sm="5">
                    <v-text-field
                            color="#313F53"
                            v-model="city.name"
                            outlined
                            :label="'City ' + (i + 1) "
                            dense
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="5" sm="5">
                    <v-text-field
                            color="#313F53"
                            v-model="city.value"
                            outlined
                            label="Price"
                            dense
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="1" sm="1">
                    <v-btn @click="removeCity(i)" icon>
                        <v-icon color="red">mdi-delete</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
        <v-card style="padding: 20px">
            <v-card-title style="color: #313F53">Stores</v-card-title>
            <v-select
                    multiple
                    v-model="store"
                    :items="stores"
                    label="Stores"
                    outlined
                    item-text="name"
                    dense
            >
            </v-select>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: 'BuildingMaterialAdd',

        data: () => ({
            store:[{}],
            optionValues: [],
            cities: [{name: "", value: ""}],
            stores: [{name: "Akram 1", id: 0}, {name: "Akram 2", id: 1}, {name: "Akram 3", id: 3}],
        }),
        methods: {
            returnBack() {
                this.$router.back();
            },
            reroute(route) {
                this.$router.push(route);
            },
            removeCity(i) {
                if (this.cities.length <= 1) {
                    return;
                }
                this.cities.splice(i, 1);
            },
            removeStore(i) {
                if (this.stores.length <= 1) {
                    return;
                }
                this.stores.splice(i, 1);
            },

        }
    }
</script>
