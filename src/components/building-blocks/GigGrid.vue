<script>
export default {
    name: 'GigGrid',
    props: ['gigs'],
    data: () => ({
        dataLoaded: false,
        icons: {
            wedding: "mdi-ring",
            residency: "mdi-city",
            function: "mdi-office-building"
        }
    }),
    mounted() {
       
    },
    methods: {
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
                    <v-card-title>{{ gig.date }}</v-card-title>
                    <v-card-subtitle>{{ gig.startTime }}-{{ gig.endTime }}</v-card-subtitle>
                    <v-card-actions>
                        <v-btn :to="'/gigs/' + gig._id">Details</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

