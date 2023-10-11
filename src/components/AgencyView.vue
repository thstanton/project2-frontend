<script>
import BreadCrumbs from './building-blocks/BreadCrumbs'
import GigGrid from './building-blocks/GigGrid'
import EditMenu from './building-blocks/EditMenu'

const API_AGENCIES_URL = "http://localhost:4000/agencies"
const API_AGENCYSTATS_URL = "http://localhost:4000/gigs/stats/agencies"

export default {
    name: 'AgencyView',
    components: {
        BreadCrumbs,
        GigGrid,
        EditMenu
    },
    data: () => ({
        agency: {},
        stats: [],
        agencyDataLoaded: false,
        statsDataLoaded: false,
        alert: {
            message: '',
            display: false,
            timeout: 3000,
            color: 'primary'
        },
        gigCount: null
    }),
    async mounted() {
        try {
            const agencyResponse = await fetch(`${API_AGENCIES_URL}/${this.$route.params.id}`)
            
            if (!agencyResponse.ok) {
                throw new Error(`HTTP error! Status: ${agencyResponse.status}`);
            }

            if (agencyResponse) {
                let agencyData = await agencyResponse.json()
                this.agency = agencyData
                this.agencyDataLoaded = true
                
                const statsResponse = await fetch(`${API_AGENCYSTATS_URL}/${this.agency._id}`)
                if (!statsResponse.ok) {
                    throw new Error(`HTTP error! Status: ${statsResponse.status}`);
                }

                if (statsResponse) {
                    let statsData = await statsResponse.json()
                    if (statsData.length === 0) {
                        statsData.push({ 
                            gigCount: 0,
                            totalEarnings: 0
                        })
                    } 
                    this.stats = statsData
                    this.statsDataLoaded = true
                }
            }

        } catch (err) {
            console.error('Error:', err)
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
                            <v-card-text v-if="statsDataLoaded">
                                <p>Gigs with this agency:</p>
                                <p>{{ stats[0].gigCount }}</p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-card>
                            <v-card-text v-if="statsDataLoaded">
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
        v-if="agencyDataLoaded" 
        :agencyId="agency._id" 
    />

    <!-- ? Edit Menu -->
    <EditMenu
        v-if="statsDataLoaded"
        :agencyId="agency._id" 
        :gigCount="(stats[0].gigCount) ? stats[0].gigCount : 0" 
    />
</template>