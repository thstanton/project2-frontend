<script>
import BreadCrumbs from './building-blocks/BreadCrumbs.vue'
import GigGrid from './building-blocks/GigGrid'

const API_URL = 'http://localhost:4000/gigs'

export default {
    name: 'AllGigs',
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
        <h1 class="text-h4">Upcoming Gigs</h1>
        <GigGrid />
    </v-container>
</template>