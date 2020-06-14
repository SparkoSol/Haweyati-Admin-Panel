<template>
    <v-container>
        <v-row>
            <v-col style="display: flex ; align-items: center; justify-content: center" cols="12" md="1" sm="1">
                <v-btn icon @click="returnBack">
                    <v-icon>mdi-keyboard-backspace</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="12" md="11" sm="11">
                <v-card-title>Add Product With Variant</v-card-title>
            </v-col>
        </v-row>
        <v-card style="padding:20px;margin-bottom: 20px">
            <v-text-field
                    outlined
                    label="Title"
                    dense
            ></v-text-field>
            <v-textarea
                    outlined
                    label="Description"
                    dense
            ></v-textarea>
        </v-card>
        <v-card style="padding:20px;margin-bottom: 20px">
            <v-card-title>Media</v-card-title>
            <v-file-input
                    label="File input"
                    multiple
                    prepend-icon=""
                    prepend-inner-icon="mdi-camera"
                    outlined
                    dense
            ></v-file-input>
        </v-card>
        <v-card style="padding:20px">
            <v-card-title>Pricing</v-card-title>
            <v-text-field
                    v-if="!variantCheck"
                    outlined
                    label="Price"
                    dense
                    prepend-inner-icon="mdi-cash"
            ></v-text-field>
            <v-checkbox
                    v-model="variantCheck"
                    label="This product has multiple variants"
            ></v-checkbox>
            <v-card v-if="variantCheck" style="padding: 20px">
                <v-card-title>Variations</v-card-title>
                <v-divider></v-divider>
                <v-row>
                    <v-col cols="12" md="9" sm="9">
                        <v-card-title>Options</v-card-title>
                    </v-col>
                    <v-col cols="12" md="3" sm="3" style="display: flex; align-items: center">
                        <v-btn color="#FF974D" style="color:#ffffff" @click="options.push({ name: '', value: '' })">Add Option</v-btn>
                    </v-col>
                </v-row>
                <v-row v-for="(option, i) of options" :key="i">
                    <v-col cols="12" md="3" sm="3">
                        <v-text-field
                                v-model="option.name"
                                outlined
                                :label="'Option ' + (i + 1) "
                                dense
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="8" sm="8">
                        <v-text-field
                                @focusout="splitOptionValues(option.value)"
                                v-model="option.value"
                                outlined
                                label="Separate options with comma."
                                dense
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="1" sm="1">
                        <v-btn @click="removeOption(i)" icon>
                            <v-icon color="red">mdi-delete</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-data-table
                        :headers="headers"
                        :items="optionValues"
                        class="elevation-1"
                ></v-data-table>
            </v-card>
        </v-card>
        <v-container style="margin-top:20px;display: flex;align-items: center;justify-content: center">
            <v-btn color="#FF974D" style="color:#ffffff" x-large>
                Save
            </v-btn>
        </v-container>
    </v-container>
</template>

<script>
    export default {
        name: 'ProductAddVariant',

        data: () => ({
            optionValues:[],
            headers: [
                {
                    text: 'Variant',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                {text: 'Price', value: ''},
            ],
            variantCheck: false,
            options: [{name: "", value: ""}],
            ecosystem: [
                {
                    text: 'vuetify-loader',
                    href: 'https://github.com/vuetifyjs/vuetify-loader',
                },
                {
                    text: 'github',
                    href: 'https://github.com/vuetifyjs/vuetify',
                },
                {
                    text: 'awesome-vuetify',
                    href: 'https://github.com/vuetifyjs/awesome-vuetify',
                },
            ],
            importantLinks: [
                {
                    text: 'Documentation',
                    href: 'https://vuetifyjs.com',
                },
                {
                    text: 'Chat',
                    href: 'https://community.vuetifyjs.com',
                },
                {
                    text: 'Made with Vuetify',
                    href: 'https://madewithvuejs.com/vuetify',
                },
                {
                    text: 'Twitter',
                    href: 'https://twitter.com/vuetifyjs',
                },
                {
                    text: 'Articles',
                    href: 'https://medium.com/vuetify',
                },
            ],
            whatsNext: [
                {
                    text: 'Explore components',
                    href: 'https://vuetifyjs.com/components/api-explorer',
                },
                {
                    text: 'Select a layout',
                    href: 'https://vuetifyjs.com/layout/pre-defined',
                },
                {
                    text: 'Frequently Asked Questions',
                    href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
                },
            ],
        }),
        methods: {
            removeOption(i) {
                this.options.splice(i, 1);
                if (i <= 0) {
                    this.variantCheck = false;
                    this.options.push({name: "", value: ""});
                }
            },
            splitOptionValues(value){
                let getValues=[];
                getValues = value.split(",");
                for(value of getValues){
                    this.optionValues.push({name:value})
                }
            }
        }
    }
</script>
