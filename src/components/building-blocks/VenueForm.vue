<script>
const API_SAVEVENUE_URL = 'http://localhost:4000/venues/new'
const API_UPDATEVENUE_URL = 'http://localhost:4000/venues/update'
const API_SINGLEVENUE_URL = 'http://localhost:4000/venues'

export default {
    name: 'VenueForm',
    props: ['venueId'],
    emits: ['closeDialog', 'venueAdd', 'venueUpdate'],
    data: () => ({
        venue: {}
    }),
    async mounted() {
        if (this.venueId) {
            try {
                const response = await fetch(`${API_SINGLEVENUE_URL}/${this.venueId}`)
                let data = await response.json()
                this.venue = data.venue
            } catch (err) {
                console.error(err)
            }
        }
    },
    methods: {
        addvenue: async function () {
            try {
                // Post new agency to DB
                const response = await fetch(API_SAVEVENUE_URL, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.venue)
                })

                // Check if successful
                if (response.status === 201) {
                        this.$emit('venueAdd', this.venue.name)
                    } else {
                        this.$emit('venueAdd', false)
                    }
            } catch (err) {
                console.error(err)
            }
        },
        updateVenue: async function () {
            try {
                // Post new agency to DB
                const response = await fetch(`${API_UPDATEVENUE_URL}/${this.venueId}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.venue)
                })

                // Check if successful
                if (response.status === 201) {
                        this.$emit('venueUpdate', this.venue)
                    } else {
                        this.$emit('venueUpdate', false)
                    }
            } catch (err) {
                console.error(err)
            }
        }
    }
}
</script>

<template>
    <v-card min-width="300">
        <v-card-title v-if="venueId">Edit venue</v-card-title>
        <v-card-title v-else>Add new venue</v-card-title>
        <v-list>
            <v-text-field label="Venue Name" v-model="venue.name"></v-text-field>
            <v-text-field label="Venue Address" v-model="venue.address"></v-text-field>
            <v-text-field label="Venue Postcode" v-model="venue.postcode"></v-text-field>
        </v-list>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="text" @click="$emit('closeDialog')">
                Cancel
            </v-btn>
            <v-btn v-if="venueId" color="primary" variant="text" @click="updateVenue">
                Update
            </v-btn>
            <v-btn v-else color="primary" variant="text" @click="addVenue">
                Save
            </v-btn>
        </v-card-actions>
    </v-card>
</template> 