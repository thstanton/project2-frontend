<script>
import SingleVenueWidget from '../components/building-blocks/SingleVenueWidget.vue'
import SingleAgencyWidget from '../components/building-blocks/SingleAgencyWidget.vue'
import BreadCrumbs from './building-blocks/BreadCrumbs.vue'
import EditMenu from './building-blocks/EditMenu.vue'
import moment from 'moment'

const API_SINGLEGIG_URL = 'http://localhost:4000/gigs'

export default {
    name: 'GigView',
    components: {
        SingleVenueWidget, 
        SingleAgencyWidget,
        BreadCrumbs,
        EditMenu
     },
    data: () => ({
        gig: {
            _id: null,
            date: null,
            startTime: null,
            endTime: null,
            agencyName: null,
            venueName: null,
            gigType: null,
            lineUp: null,
            gigSets: [],
            notes: null,
            fee: null,
            status: null,
            genres: [],
            requests: []
        },
        alert: {
            message: '',
            display: false,
            timeout: 3000,
            color: 'primary'
        },
        dataLoaded: false,
        deleteDialog: false,
    }),
    async mounted() {
        try {
            let response = await fetch(`${API_SINGLEGIG_URL}/${this.$route.params.id}`)

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            if (response) {
                let data = await response.json()
                this.gig = data.gig
                this.agency = data.agency
                this.venue = data.venue
                this.dataLoaded = true

                // Format Date
                const formattedDate = new Date(this.gig.date)
                this.gig.date = moment(formattedDate).format('D MMM YY')
            }
        } catch (err) {
            console.error('Error:', err)
        }
    },
    methods: {
        
    }
}
</script>

<template>
    <BreadCrumbs />
    <v-container>
        
        <!-- ? Date, Time, Type -->
        <v-row>
            <v-col class="v-col-12">

                <v-card width="100%">
                    <v-row>
                        
                        <v-col class="v-col-10">
                            <v-card-title>{{ gig.date }}</v-card-title>
                            <v-card-subtitle>{{ gig.startTime }}-{{ gig.endTime }}</v-card-subtitle>
                            <v-card-text>{{ gig.gigType }}</v-card-text>
                        </v-col>

                        <v-col class="v-col-2">
                            <v-avatar>
                                <v-icon icon="mdi-city" />
                            </v-avatar>
                        </v-col>
                        
                    </v-row>
                </v-card>

            </v-col>
        </v-row>

        
        <v-row>

            <!-- ? Details -->
            <v-col class="v-col-8">
                <v-card width="100%">

                    <v-card-item>
                        <v-card-title>Details:</v-card-title>
                    </v-card-item>

                    <v-card-text>
                        <v-list lines="two">
                            
                            <v-list-item title="Line-up:" :subtitle="gig.lineUp"></v-list-item>
                            <v-divider></v-divider>
                            
                            <v-list-item title="Sets:"></v-list-item>
                            <v-timeline density="compact">
                                <v-timeline-item v-for="(set, i) in gig.gigSets" :key="i" size="x-small" dot-color="indigo">{{ set.length }} minutes</v-timeline-item>
                            </v-timeline>
                            <v-divider></v-divider>
                            
                            <v-list-item title="Notes:" :subtitle="gig.notes"></v-list-item>
                            <v-divider></v-divider>
                            
                            <v-list-item title="Fee:" :subtitle="'&pound;' + gig.fee"></v-list-item>
                            <v-divider></v-divider>
                            
                            <v-list-item title="Status:"></v-list-item>
                            <v-chip>{{ gig.status }}</v-chip>

                        </v-list>
                    </v-card-text>

                </v-card>
            </v-col>

            <v-col class="v-col-4">

                <!-- ? Venue -->
                <v-row v-if="dataLoaded">
                    <v-col>
                        <SingleVenueWidget :venue="venue" />
                    </v-col>
                </v-row>
                
                <!-- ? Agency -->
                <v-row v-if="dataLoaded">
                    <v-col>

                        <SingleAgencyWidget :agency="agency" />

                    </v-col>
                </v-row>
            
            </v-col>
        
        </v-row>
        
        <!-- ? Music  -->
        <v-row>
            <v-col class="v-col-8">

                <v-card width="100%">
                    <v-card-item>
                        <v-card-title>Music:</v-card-title>
                    </v-card-item>
                    
                    <v-card-text>
                        <v-list lines="one">
                            
                            <v-list-item title="Genre(s):"></v-list-item>
                            <v-chip v-for="genre in gig.genres" :key="genre">{{ genre }}</v-chip>
                            
                            <v-list-item title="Requests:"></v-list-item>
                            <v-list-item v-for="piece in gig.requests" :key="piece" prepend-icon="mdi-piano">{{ piece.name }}</v-list-item>

                        </v-list>
                    </v-card-text>

                </v-card>

            </v-col>
        </v-row>

    </v-container>

    <!-- ? Edit Menu -->
    <EditMenu
        v-if="dataLoaded"
        :gigId="gig._id" 
    />

    <!-- ? Alerts -->
    <v-snackbar 
            v-model="alert.display" 
            :timeout="alert.timeout"
            :color="alert.color"
        >{{ alert.message }}</v-snackbar>
</template>