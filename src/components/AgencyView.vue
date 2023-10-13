<script>
import BreadCrumbs from './building-blocks/BreadCrumbs.vue'
import GigGrid from './building-blocks/GigGrid.vue'
import EditMenu from './building-blocks/EditMenu.vue'
import moment from 'moment'

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
                this.gigs.forEach(gig => {
                    console.log(gig.date)
                    const formattedDate = new Date(gig.date)
                    console.log(formattedDate)
                    gig.date = moment(formattedDate).format('D MMM YY')
                    console.log(gig.date)
                })
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
                        <v-avatar color="red">
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
    </v-container>

    <!-- ? Gigs -->
    <GigGrid 
        v-if="dataLoaded" 
        :gigs="gigs" 
    />

    <!-- ? Edit Menu -->
    <EditMenu
        v-if="dataLoaded"
        :agencyId="agency._id" 
        :gigCount="gigs.length" 
        @agencyUpdate="handleUpdate"
    />
</template>