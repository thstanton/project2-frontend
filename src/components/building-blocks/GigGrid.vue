<script>
import { renderIcon } from '@/methods/renderIcon'

export default {
    name: 'GigGrid',
    props: ['gigs'],
    methods: {
        renderIcon
    }
}
</script>

<template>
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
</template>

