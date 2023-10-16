<script>
const API_SAVEVENUE_URL = `${process.env.VUE_APP_BACKEND_API}/venues/new`
const API_UPDATEVENUE_URL = `${process.env.VUE_APP_BACKEND_API}/venues/update`
const API_SINGLEVENUE_URL = `${process.env.VUE_APP_BACKEND_API}/venues`

export default {
    name: 'VenueForm',
    props: ['venueId'],
    emits: ['closeDialog', 'venueAdd', 'venueUpdate'],
    data: () => ({
        venue: {},
        dataReady: false
    }),
    async mounted() {
        if (this.venueId) {
            try {
                const response = await fetch(`${API_SINGLEVENUE_URL}/${this.venueId}`)
                let data = await response.json()
                this.venue = data.venue
                this.dataReady = true
            } catch (err) {
                console.error(err)
            }
        }
    },
    methods: {
        addVenue: async function () {
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
    <v-card min-width="300" v-if="venueId && dataReady || !venueId">
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