<template>
    <v-container>
        <v-row>
            <v-col style="display: flex ; align-items: center; justify-content: center" cols="12" md="1" sm="1">
                <v-btn icon @click="returnBack">
                    <v-icon>mdi-keyboard-backspace</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="12" md="8" sm="8">
                <v-card-title>Building Material Type</v-card-title>
            </v-col>
            <v-col style="display: flex; justify-content: center;align-items: center;" cols="12" md="3" sm="3">
                <v-btn @click="reroute('/building-material-sub-add')" color="#FF974D" style="color:#ffffff">
                    Add Building Material Type
                </v-btn>
            </v-col>
        </v-row>
        <div class="my-row">
            <v-card class="building-material-card" v-for="(productType, i) of productTypes" :key="i" height="200px"
                    @click="reroute('BuildingMaterial', { name: productType.name })">
                <v-img
                        src="https://res.cloudinary.com/parallax-agency/image/upload/c_fill%2Cq_auto%2Cf_auto%2Cw_1780%2Ch_780/statamic/clear-channel-production/old_blog/ASDA-1024x684.jpg"
                        width="100%"
                        height="100%"
                        class="white--text align-center"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                >
                    <v-card-title class="justify-center" v-text="productType.name"></v-card-title>
                </v-img>
                <v-btn @click="reroute('/building-material-sub-edit')" color="#FF974D"
                       style="color:#ffffff;margin: 10px" fab small class="building-material-edit-btn">
                    <v-icon small>
                        mdi-pencil
                    </v-icon>
                </v-btn>
            </v-card>
        </div>
    </v-container>
</template>

<script>
    export default {
        name: 'BuildingMaterialSub',
        props: {
            title: String
        },
        data: () => ({
            productTypes: [{
                name: "Cement & Gypsum", path: '/building-material'
            }, {
                name: "Sand", path: '/building-material'
            }, {
                name: "Gravel", path: '/building-material'
            }, {
                name: "Blocks & Related", path: 'BuildingMaterial'
            }]

        }),
        methods: {
            reroute(route, params) {
                this.$router.push({name: route, params});
            },
            returnBack() {
                this.$router.back();
            }
        }
    }
</script>

<style>
    .my-row {
        display: grid !important;
        grid-template-columns: 50% 50%;
        grid-column-gap: 20px;
        grid-row-gap: 20px;
    }

    .building-material-card {
        position: relative;
    }

    .building-material-edit-btn {
        position: absolute;
        top: 0;
        right: 0;
    }
</style>
