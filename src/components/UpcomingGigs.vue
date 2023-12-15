<script>
import BreadCrumbs from './building-blocks/BreadCrumbs.vue'
import GigGrid from './building-blocks/GigGrid.vue'
import { formatDate } from '@/methods/formatDate'
import getJwt from '@/methods/getUser'

const API_URL = `${process.env.VUE_APP_BACKEND_API}/gigs`

export default {
    name: 'UpcomingGigs',
    components: {
        BreadCrumbs, GigGrid
    },
    data: () => ({
        thisWeek: [],
        nextWeek: [],
        thisMonth: [],
        thisYear: [],
        dataReady: false
    }),
    async mounted() {
        try {
            const response = await fetch(`${API_URL}/upcoming`, {
            method: 'GET',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${getJwt()}` 
            },
        })

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
            
            if (response) {
                let data = await response.json()
                console.log(data)
                if (data.length >= 1) this.thisWeek = data[0].gigs
                if (data.length >= 2) this.nextWeek = data[1].gigs
                if (data.length >= 3) this.thisMonth = data[2].gigs
                this.dataReady = true

                // Format Dates
                formatDate(this.thisWeek)
                formatDate(this.nextWeek)
                formatDate(this.thisMonth)
                formatDate(this.thisYear)
            }
        
        } catch (err) {
            console.error(err)
        }
    },
    methods: {}
}
</script>

<template>
    <BreadCrumbs />
    <v-container>
        <h1 class="text-h4">Upcoming Gigs</h1>
        <div v-if="dataReady">
            <h2 class="text-h6">This week</h2>
            <GigGrid v-if="thisWeek.length" :gigs="thisWeek" />
            <p v-else>No gigs this week</p>
            <h2 class="text-h6">Next week</h2>
            <GigGrid v-if="nextWeek.length" :gigs="nextWeek" />
            <p v-else>No gigs next week</p>
            <h2 class="text-h6">This month</h2>
            <GigGrid v-if="thisMonth.length" :gigs="thisMonth" />
            <p v-else>No gigs for the rest of the month</p>
        </div>
    </v-container>
</template>