<script>
    import BreadCrumbs from './building-blocks/BreadCrumbs.vue'
    import GigGrid from './building-blocks/GigGrid.vue'
    import EditMenu from './building-blocks/EditMenu.vue'

    const API_VENUES_URL = "http://localhost:4000/venues"
    
    export default {
        name: 'VenueView',
        components: {
            BreadCrumbs, 
            GigGrid,
            EditMenu
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
        },
        methods: {
            handleUpdate: function (venueData) {
                if (venueData) this.venue = venueData
            }
        }
    }
</script>

<template>
    <BreadCrumbs />
    <v-container>
        <v-card>
            <v-card-title>{{ venue.name }}</v-card-title>
            <v-card-text>
                {{ venue.address }}, {{ venue.postcode }}
            </v-card-text>
        </v-card>
    </v-container>
    
    <!-- ? Gig Grid -->
    <GigGrid v-if="dataLoaded === true" :venueId="venue._id" />
    
    <!-- ? Edit Menu -->
    <EditMenu
        v-if="dataLoaded"
        :venueId="venue._id"
        @venueUpdate="handleUpdate"
    />
</template>