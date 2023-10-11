<script>
import SingleVenueWidget from '../components/building-blocks/SingleVenueWidget.vue'
import SingleAgencyWidget from '../components/building-blocks/SingleAgencyWidget.vue'
import BreadCrumbs from './building-blocks/BreadCrumbs.vue'

const API_SINGLEGIG_URL = 'http://localhost:4000/gigs'
const API_DELETE_URL = 'http://localhost:4000/gigs/delete'

export default {
    name: 'GigView',
    components: {
        SingleVenueWidget, 
        SingleAgencyWidget,
        BreadCrumbs
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
                this.gig = data
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
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
                return rawDate.toLocaleString('en-GB', options)
            }
            return ''
        },
        async deleteGig() {
            this.deleteDialog = false
            try {
                const response = await fetch(`${API_DELETE_URL}/${this.gig._id}`, {
                    method: 'DELETE'
                })
                console.log(response)
                // Check if successful
                if (response.status === 200) {
                    // Return confirmed message
                    this.alert.message = "Gig deleted"
                    this.alert.display = true
                    // Redirect to single gig page
                    setTimeout(() => this.$router.replace({ path: '/gigs/upcoming'}), 4000)
                } else {
                    // Return confirmed message
                    this.alert.message = "There was a problem"
                    this.alert.display = true
                }
            } catch (err) {
                console.error(err)
            }
        }
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
                            <v-card-title>{{ formatDate(gig.date) }}</v-card-title>
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
                        <SingleVenueWidget :id="gig.venueId" />
                    </v-col>
                </v-row>
                
                <!-- ? Agency -->
                <v-row v-if="dataLoaded">
                    <v-col>

                        <SingleAgencyWidget :id="gig.agencyId" />

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
    <VLayoutItem model-value position="bottom" class="text-end" size="88">
        <div class="ma-4">
            <v-btn size="x-large" icon="mdi-file-edit" color="primary" elevation="8" id="edit-menu"></v-btn>

            <v-menu activator="#edit-menu">
                <v-list>
                    <v-list-item :to="'/gigs/update/' + gig._id">Edit Gig</v-list-item>
                    <v-list-item @click="deleteDialog = true">Delete Gig</v-list-item>
                </v-list>
            </v-menu>
        </div>
    </VLayoutItem>

    <!-- ? Delete Dialog -->
    <v-dialog 
        v-model="deleteDialog"
        width="auto"
        >
        <v-card>
            <v-card-text>
                Are you sure you want to delete this gig?
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="deleteGig">Delete</v-btn>
                <v-btn @click="deleteDialog = false">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- ? Alerts -->
    <v-snackbar 
            v-model="alert.display" 
            :timeout="alert.timeout"
            :color="alert.color"
        >{{ alert.message }}</v-snackbar>
</template>