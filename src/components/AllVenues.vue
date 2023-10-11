<script>
import BreadCrumbs from './building-blocks/BreadCrumbs'

const API_URL = 'http://localhost:4000/venues'

export default {
    name: 'AllVenues',
    components: {
        BreadCrumbs
    },
    data: () => ({
        venues: []
    }),
    async mounted() {
        const response = await fetch(API_URL)
        let data = await response.json()
        this.venues = data
    }
}
</script>

<template>
    <BreadCrumbs />
    <v-container>
        <h1 class="text-h4">All Venues</h1>
        <v-list>
            <v-list-item v-for="venue in venues" :key="venue._id" :to="'/venues/' + venue._id">{{ venue.name }}</v-list-item>
        </v-list>
    </v-container>
</template>