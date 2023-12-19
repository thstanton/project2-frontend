<script>
import { GoogleMap, Marker } from "vue3-google-map"
import getJwt from "@/methods/getUser"

const API_URL = `${process.env.VUE_APP_BACKEND_API}/venues/locations`
  
export default {
    name: 'AllVenueGoogleMap',
    components: { 
        GoogleMap,
        Marker,
    },
    data: () => ({
        apiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
        center: {
            lat: 54.26413345336914,
            lng: -3.985777735710144
        },
        venues: [],
        dataReady: false
    }),
    async mounted() {
        try {
            const response = await fetch(API_URL, {
            method: 'GET',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${getJwt()}` 
            },
        })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            if (response) {
                const data = await response.json()
                this.venues = data
                this.dataReady = true
            }
        } catch (err) {
            console.error(err)
        }
    }
}
</script>

<template>
        <v-card v-if="dataReady">
            <v-card-title>Venues</v-card-title>
            <GoogleMap 
                :api-key="apiKey" 
                style="width: 100%; height: 600px" 
                :center="center" 
                :zoom="5"
                >
                <Marker v-for="(venue, idx) of venues" :key="idx" :options="{ position: venue.geoData }" />
            </GoogleMap>
        </v-card>
</template>