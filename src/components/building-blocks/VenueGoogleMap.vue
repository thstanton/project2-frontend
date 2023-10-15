<script>
import { GoogleMap, Marker } from "vue3-google-map"
  
export default {
    name: 'VenueGoogleMap',
    props: ['center'],
    components: { 
        GoogleMap,
        Marker 
    },
    data: () => ({
        apiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    })
}
</script>

<template>
        <v-card>
            <GoogleMap 
                :api-key="apiKey" 
                style="width: 100%; height: 300px" 
                :center="center" 
                :zoom="15"
                >
                <Marker :options="{ position: center }"/>
            </GoogleMap>
        </v-card>
</template>