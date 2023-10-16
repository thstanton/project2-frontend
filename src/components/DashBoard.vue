<script>
import AgencyChart from './building-blocks/AgencyChart.vue'
import AllVenueGoogleMap from './building-blocks/AllVenueGoogleMap.vue';

export default {
    name: 'DashBoard',
    components: {
    AgencyChart,
    AllVenueGoogleMap
},
    data: () => ({

    }),

}
</script>

<template>
    <v-container>
        <v-row>
            <h1 class="text-h4">Dashboard</h1>
        </v-row>
        <v-row>
            <v-col class="v-col-3">
                <v-card>
                    <v-img
                        :src="require('../assets/splash-screen.png')"
                    ></v-img>
                    <v-card-title><h1 class="text-h6 text-center"><span>Welcome to</span> Gig Manager</h1></v-card-title>
                    <v-card-text></v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <AllVenueGoogleMap />
            </v-col>
        <!-- </v-row> -->
        <!-- <v-row> -->
            <v-col>
                <AgencyChart />
            </v-col>
        </v-row>
    </v-container>
</template>