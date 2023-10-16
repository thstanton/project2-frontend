<script>
import BreadCrumbs from './building-blocks/BreadCrumbs.vue'
import GigGrid from './building-blocks/GigGrid.vue'
import EditMenu from './building-blocks/EditMenu.vue'
import { formatDate } from '@/methods/formatDate'

const API_AGENCIES_URL = "http://localhost:4000/agencies"

export default {
    name: 'AgencyView',
    components: {
        BreadCrumbs,
        GigGrid,
        EditMenu
    },
    data: () => ({
        agency: {},
        gigs: [],
        stats: [],
        dataLoaded: false,
    }),
    async mounted() {
        try {
            const agencyResponse = await fetch(`${API_AGENCIES_URL}/${this.$route.params.id}`)
            
            if (!agencyResponse.ok) {
                throw new Error(`HTTP error! Status: ${agencyResponse.status}`);
            }

            if (agencyResponse) {
                let data = await agencyResponse.json()
                console.log(data)
                this.agency = data.agency
                this.stats = data.stats
                this.gigs = data.gigs
                this.dataLoaded = true

                // Format Date
                formatDate(this.gigs)
            }

        } catch (err) {
            console.error('Error:', err)
        }
    },
    methods: {
        handleUpdate(agencyData) {
        if (agencyData) this.agency = agencyData
        }
    } 
}
</script>

<template>
    <BreadCrumbs />
    <v-container>
        <v-row>
            <v-col class="v-col-8">
                <v-card>
                    <template v-slot:prepend>
                        <v-avatar>
                            <span class="text-h5">{{ agency.initials }}</span>
                        </v-avatar>
                    </template>
                    <v-card-title>{{ agency.name }}</v-card-title>
                    <v-card-text>
                        <p>{{ agency.email }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col class="v-col-4">
                <v-row>
                    <v-col>
                        <v-card>
                            <v-card-text v-if="dataLoaded">
                                <p>Gigs with this agency:</p>
                                <p>{{ stats[0].gigCount }}</p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-card>
                            <v-card-text v-if="dataLoaded">
                                <p>Earnings through this agency to date:</p>
                                <p>&pound;{{ stats[0].totalEarnings }}</p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        
        <!-- ? Gigs -->
        <GigGrid 
            v-if="dataLoaded" 
            :gigs="gigs" 
        />
    </v-container>

    <!-- ? Edit Menu -->
    <EditMenu
        v-if="dataLoaded"
        :agencyId="agency._id" 
        :gigCount="gigs.length" 
        @agencyUpdate="handleUpdate"
    />
</template>