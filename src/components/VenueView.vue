<script>
import BreadCrumbs from './building-blocks/BreadCrumbs.vue'
import GigGrid from './building-blocks/GigGrid.vue'
import EditMenu from './building-blocks/EditMenu.vue'
import { formatDate } from '@/methods/formatDate'
import VenueGoogleMap from './building-blocks/VenueGoogleMap.vue'

const API_VENUES_URL = `${process.env.VUE_APP_BACKEND_API}/venues`

export default {
    name: 'VenueView',
    components: {
        BreadCrumbs,
        GigGrid,
        EditMenu,
        VenueGoogleMap
    },
    data: () => ({
        venue: {},
        gigs: [],
        locationData: {},
        dataLoaded: false,
    }),
    async mounted() {
        try {
        const response = await fetch(`${API_VENUES_URL}/${this.$route.params.id}`)
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        if (response) {
            let data = await response.json()
            console.log(data)
            this.venue = data.venue
            this.gigs = data.gigs
            this.locationData = data.locationData
            this.dataLoaded = true

            // Format Date
            formatDate(this.gigs)
        }

    } catch (err) {
        console.error('Error:', err)
    }
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
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>{{ venue.name }}</v-card-title>
                    <v-card-text>
                        {{ venue.address }}, {{ venue.postcode }}
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <VenueGoogleMap :center="locationData" />
            </v-col>
        </v-row>

        <!-- ? Gig Grid -->
        <GigGrid 
            v-if="dataLoaded" 
            :gigs="gigs" 
        />
    </v-container>
    
    <!-- ? Edit Menu -->
    <EditMenu
        v-if="dataLoaded"
        :venueId="venue._id"
        :gigCount="gigs.length"
        @venueUpdate="handleUpdate"
    />
</template>