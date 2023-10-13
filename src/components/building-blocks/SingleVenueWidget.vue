<script>
export default {
    name: 'SingleVenueWidget',
    props: ['venue'],
}
</script>

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