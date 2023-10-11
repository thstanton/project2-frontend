<script>
    import BreadCrumbs from './building-blocks/BreadCrumbs'
    import GigGrid from './building-blocks/GigGrid'

    const API_AGENCIES_URL = "http://localhost:4000/agencies"
    
    export default {
        name: 'AgencyView',
        components: {
            BreadCrumbs, 
            GigGrid
        },
        data: () => ({
            agency: {},
            dataLoaded: false,
        }),
        async mounted() {
            const response = await fetch(`${API_AGENCIES_URL}/${this.$route.params.id}`)
            let data = await response.json()
            this.agency = data
            this.dataLoaded = true
        }
    }
</script>

<template>
    <BreadCrumbs />
    <v-container>
        <v-card>
            <template v-slot:prepend>
                <v-avatar color="red">
                    <span class="text-h5">{{ agency.initials }}</span>
                </v-avatar>
            </template>
            <v-card-title>{{ agency.name }}</v-card-title>
            <v-card-text>
                {{ agency.email }}
            </v-card-text>
        </v-card>
    </v-container>
    <GigGrid v-if="dataLoaded === true" :agencyId="agency._id" />
</template>