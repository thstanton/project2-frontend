<template>
    <v-card width="100%">
        <v-card-item>
            <v-card-title>Venue:</v-card-title>
        </v-card-item>
        <v-card-text>
            <h4>{{ venue.name }}</h4>
            <p>{{ venue.address }}, {{ venue.postcode }}</p>
        </v-card-text>
        <v-card-actions>
            <v-btn :to="'/venues/' + venue._id">Details</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
const API_SINGLEVENUE_URL = 'http://localhost:4000/venues'

export default {
    name: 'SingleVenueWidget',
    props: ['id'],
    data: () => ({
        venue: {
            name: null,
            address: null,
            postcode: null
        }
    }),
    async mounted() {
        try {
            const response = await fetch(`${API_SINGLEVENUE_URL}/${this.id}`)
            let data = await response.json()
            this.venue = data
        } catch (err) {
            console.error(err)
        }
    }
}
</script>