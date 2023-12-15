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
        gigs: [],
        dataReady: false
    }),
    async mounted() {
        try {
            const response = await fetch(`${API_URL}/status/unconfirmed`, {
            method: 'GET',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${getJwt()}` 
            },
        })

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
            
            if (response) {
                let data = await response.json()
                this.gigs = data
                this.dataReady = true
                formatDate(this.gigs)
            }
        
        } catch (err) {
            console.error(err)
        }
    }
}
</script>

<template>
    <BreadCrumbs />
    <v-container>
        <h1 class="text-h4">Unconfirmed Gigs</h1>
        <GigGrid :gigs="gigs" />
    </v-container>
</template>