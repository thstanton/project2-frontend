<script>
import { Pie } from 'vue-chartjs'
import Chart from 'chart.js/auto'

Chart.register()

const API_URL = `${process.env.VUE_APP_BACKEND_API}/gigs/stats/agencies`

export default {
    name: 'AgencyChart',
    components: {
        Pie
    },
    data: () => ({
        chartData: {},
        chartOptions: {
            plugins: {
                legend: {
                    position: 'bottom'
                },
            }
        },
        dataReady: false            
    }),
    async mounted() {
        try {
            let response = await fetch(API_URL)
            
            if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
            if (response) {
                let data = await response.json()
                this.chartData = data
                this.dataReady = true
            }

        } catch (err) {
            console.error(err)
        }        
    },
    methods: {

    }
}
</script>

<template>
        <v-card v-if="dataReady">
            <v-card-title>Earnings by Agency (£)</v-card-title>
            <Pie :data="chartData" :options="chartOptions" />
        </v-card>
</template>