<script>
    import BreadCrumbs from './building-blocks/BreadCrumbs'
    import GigGrid from './building-blocks/GigGrid'

    const API_VENUES_URL = "http://localhost:4000/venues"
    
    export default {
        name: 'VenueView',
        components: {
            BreadCrumbs, 
            GigGrid
        },
        data: () => ({
            venue: {},
            dataLoaded: false,
        }),
        async mounted() {
            const response = await fetch(`${API_VENUES_URL}/${this.$route.params.id}`)
            let data = await response.json()
            this.venue = data
            this.dataLoaded = true
        }
    }
</script>

<template>
    <BreadCrumbs />
    <v-container>
        <v-card>
            <v-card-title>{{ venue.name }}</v-card-title>
            <v-card-text>
                {{ venue.address }}
            </v-card-text>
        </v-card>
    </v-container>
    <GigGrid v-if="dataLoaded === true" :venueId="venue._id" />
</template>