<script>
import BreadCrumbs from './building-blocks/BreadCrumbs.vue'
import GigGrid from './building-blocks/GigGrid.vue'
import { formatDate } from '@/methods/formatDate'

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
            const response = await fetch(`${API_URL}/upcoming`)

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
            
            if (response) {
                let data = await response.json()
                if (data[0].gigs) this.thisWeek = data[0].gigs
                if (data[1].gigs) this.nextWeek = data[1].gigs
                if (data[2].gigs) this.thisMonth = data[2].gigs
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
            <GigGrid :gigs="thisWeek" />
            <h2 class="text-h6">Next week</h2>
            <GigGrid :gigs="nextWeek" />
            <h2 class="text-h6">This month</h2>
            <GigGrid :gigs="thisMonth" />
        </div>
    </v-container>
</template>