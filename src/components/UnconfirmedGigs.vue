<script>
import BreadCrumbs from './building-blocks/BreadCrumbs.vue'
import GigGrid from './building-blocks/GigGrid.vue'

const API_URL = 'http://localhost:4000/gigs'

export default {
    name: 'UpcomingGigs',
    components: {
        BreadCrumbs, GigGrid
    },
    data: () => ({
        gigs: []
    }),
    async mounted() {
        const response = await fetch(API_URL)
        let data = await response.json()
        this.gigs = data
    },
    methods: {}
}
</script>

<template>
    <BreadCrumbs />
    <v-container>
        <h1 class="text-h4">Unconfirmed Gigs</h1>
        <GigGrid status="unconfirmed" />
    </v-container>
</template>