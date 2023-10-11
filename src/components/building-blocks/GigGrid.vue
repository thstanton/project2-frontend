<script>
const API_GIG_URL = 'http://localhost:4000/gigs'

export default {
    name: 'GigGrid',
    props: ['agencyId', 'venueId', 'status'],
    data: () => ({
        gigs: [],
        dataLoaded: false,
        icons: {
            wedding: "mdi-ring",
            residency: "mdi-city",
            function: "mdi-office-building"
        }
    }),
    async mounted() {
        try {
            let response = null
            if (this.agencyId) {
                response = await fetch(`${API_GIG_URL}/agency/${this.agencyId}`)
            } else if (this.venueId) {
                response = await fetch(`${API_GIG_URL}/venue/${this.venueId}`)
            } else if (this.status) {
                response = await fetch(`${API_GIG_URL}/status/${this.status}`)
            }

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            if (response) {
                let data = await response.json()
                this.gigs = data
                this.dataLoaded = true
            }
        } catch (err) {
            console.error('Error:', err)
        }
    },
    methods: {
        formatDate(date) {
            if (this.dataLoaded) {
                const rawDate = new Date(date)
                const options = {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                }
                return rawDate.toLocaleString('en-GB', options)
            }
            return ''
        },
        renderIcon(gigType) {
            if (gigType === 'Wedding') return this.icons.wedding
            if (gigType === 'Function') return this.icons.function
            if (gigType === 'Residency') return this.icons.residency
        }
    }
}
</script>

<template>
    <v-container fluid>
        <v-row>
            <v-col v-for="gig in gigs" :key="gig._id" :cols="4">
                <v-card
                    :prepend-icon="renderIcon(gig.gigType)"
                >
                    <v-card-title>{{ formatDate(gig.date) }}</v-card-title>
                    <v-card-subtitle>{{ gig.startTime }}-{{ gig.endTime }}</v-card-subtitle>
                    <v-card-actions>
                        <v-btn :to="'/gigs/' + gig._id">Details</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

