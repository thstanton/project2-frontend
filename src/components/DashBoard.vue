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
            <v-col>
                <AgencyChart />
            </v-col>
            <v-col>
                <AllVenueGoogleMap />
            </v-col>
        </v-row>
    </v-container>
</template>