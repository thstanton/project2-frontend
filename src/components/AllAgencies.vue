<script>
import BreadCrumbs from './building-blocks/BreadCrumbs'

const API_URL = `${process.env.VUE_APP_BACKEND_API}/agencies`

export default {
    name: 'AllAgencies',
    components: {
        BreadCrumbs
    },
    data: () => ({
        agencies: []
    }),
    async mounted() {
        const response = await fetch(API_URL)
        let data = await response.json()
        this.agencies = data
    }
}
</script>

<template>
    <BreadCrumbs />
    <v-container>
        <h1 class="text-h4">All Agencies</h1>
        <v-list>
            <v-list-item v-for="agency in agencies" :key="agency._id" :to="'/agencies/' + agency._id">{{ agency.name }}</v-list-item>
        </v-list>
    </v-container>
</template>