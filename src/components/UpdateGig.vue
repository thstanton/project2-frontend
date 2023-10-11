<script>
// ? Imports
import BreadCrumbs from './building-blocks/BreadCrumbs'
import moment from 'moment'

// ? API Links
const API_SINGLEGIG_URL = 'http://localhost:4000/gigs'
const API_SAVEAGENCY_URL = 'http://localhost:4000/agencies/new'
const API_GETAGENCYNAMES_URL = 'http://localhost:4000/agencies/names'
const API_SAVEVENUE_URL = 'http://localhost:4000/venues/new'
const API_GETVENUENAMES_URL = 'http://localhost:4000/venues/names'
const API_UPDATEGIG_URL = 'http://localhost:4000/gigs/update'

export default {
    name: 'GigView',
    components: {
        BreadCrumbs
    },
    data: () => ({
        gig: {},
        newVenue: {},
        newAgency: {},
        newSet: {},
        newRequest: {},
        allAgencies: [],
        allVenues: [],
        allGenres: ['Jazz', 'Pop', 'Classical', 'Blues'],
        allGigTypes: ['Wedding', 'Function', 'Residency'],
        allLineUps: ['Solo', 'Duo', 'Trio', 'Quartet', 'Band'],
        alert: {
            message: '',
            display: false,
            timeout: 3000,
            color: 'primary'
        },
        menus: {
            agency: false,
            venue: false,
            set: false,
            request: false,
            datePicker: false
        },
        dataLoaded: false,
    }),
    async mounted() {
        try {
            // Fetch agencies and populate allAgencies list
            const agencyResponse = await fetch(API_GETAGENCYNAMES_URL)
            let agencyData = await agencyResponse.json()
            this.allAgencies = agencyData
            
            // Fetch venues and populate allVenues list
            const venueResponse = await fetch(API_GETVENUENAMES_URL)
            let venueData = await venueResponse.json()
            this.allVenues = venueData
            
            // Fetch gig
            const gigResponse = await fetch(`${API_SINGLEGIG_URL}/${this.$route.params.id}`)
            
            if (!gigResponse.ok) {
                throw new Error(`HTTP error! Status: ${gigResponse.status}`);
            }

            if (gigResponse) {
                let gigData = await gigResponse.json()
                this.gig = gigData

                //Format Date
                const gigDate = new Date(gigData.date)
                this.gig.date = moment(gigDate).format('YYYY-MM-DD')
                this.dataLoaded = true
            }
        } catch (err) {
            console.error(err)
        }
    },
    methods: {
        createSet: function () {
            this.gig.gigSets.push(this.newSet)
            this.newSet = {}
            this.menus.set = false
        },
        createRequest: function () {
            this.gig.requests.push(this.newRequest)
            this.newRequest = {}
            this.menus.request = false
        },
        addAgency: async function () {
            try {
                // Post new agency to DB
                const response = await fetch(API_SAVEAGENCY_URL, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.newAgency)
                })
                let result = await response.json()
                // Check if successful
                if (response.status === 201) {
                        // Return confirmed message
                        this.alert.message = "Agency Added Successfully"
                        this.alert.display = true
                        // Repopulate allAgencies
                        const allAgencies = await fetch(API_GETAGENCYNAMES_URL)
                        let allAgenciesData = await allAgencies.json()
                        this.allAgencies = allAgenciesData
                        // Select new agency name as input
                        this.newGig.agencyName = this.newAgency.name
                        // Close menu
                        this.menus.agency = false
                    } else {
                        // Return confirmed message
                        this.alert.message = result.error
                        this.alert.display = true
                    }
            } catch (err) {
                console.error(err)
            }
        },
        addVenue: async function () {
            try {
                const response = await fetch(API_SAVEVENUE_URL, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.newVenue)
                })
                let result = await response.json()
                // Check if successful
                if (response.status === 201) {
                        // Return confirmed message
                        this.alert.message = "Venue Added Successfully"
                        this.alert.display = true
                        // Repopulate allAgencies
                        const allVenues = await fetch(API_GETVENUENAMES_URL)
                        let allVenuesData = await allVenues.json()
                        this.allVenues = allVenuesData
                        // Select new agency name as input
                        this.newGig.venueName = this.newVenue.name
                        // Close menu
                        this.menus.venue = false
                    } else {
                        // Return confirmed message
                        this.alert.message = result.error
                        this.alert.display = true
                    }
            } catch (err) {
                console.error(err)
            }
        },
        updateGig: async function () {
            try {
                // Post new gig to DB
                const response = await fetch(`${API_UPDATEGIG_URL}/${this.gig._id}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.gig)
                })
                console.log(response)
                // Check if successful
                if (response.status === 201) {
                    // Return confirmed message
                    this.alert.message = "Gig Updated Successfully"
                    this.alert.display = true
                    // Redirect to single gig page
                    setTimeout(() => this.$router.replace({ path: `/gigs/${this.gig._id}` }), 4000)
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
        <v-form>

            <!-- ? Date -->
            <v-text-field 
                label="Date" 
                type="date"
                v-model="gig.date"
                >
            </v-text-field>
            <v-row>
                <v-col>

                    <!-- ? Start Time -->
                    <v-text-field 
                        type="time" 
                        label="Start Time" 
                        v-model="gig.startTime"
                    ></v-text-field>
                </v-col>
                <v-col>

                    <!-- ? End Time -->
                    <v-text-field 
                        type="time" 
                        label="End Time" 
                        v-model="gig.endTime"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>

                    <!-- ? Agency -->
                    <v-autocomplete 
                        label="Agency" 
                        :items="allAgencies"
                        v-model="gig.agencyName"
                    ></v-autocomplete>
                </v-col>
                <v-col>

                    <!-- ? Add Agency Dialog -->
                    <v-btn>Add new agency
                        <v-menu 
                            activator="parent" 
                            :close-on-content-click="false" 
                            location="end"
                            v-model="menus.agency"
                            ><v-card min-width="300">
                                <v-card-title>Add new agency</v-card-title>
                                <v-list>
                                    <v-text-field 
                                        label="Agency Name"
                                        v-model="newAgency.name"
                                    ></v-text-field>
                                    <v-text-field 
                                        label="Agency Email"
                                        v-model="newAgency.email"
                                    ></v-text-field>
                                </v-list>
                                <v-card-actions>
                                    <v-spacer></v-spacer>

                                    <v-btn variant="text" @click="menus.agency = false"> Cancel </v-btn>
                                    <v-btn color="primary" variant="text" @click="addAgency">
                                        Save
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-menu>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>

                    <!-- ? Venue -->
                    <v-autocomplete 
                        label="Venue" 
                        :items="allVenues"
                        v-model="gig.venueName"
                    ></v-autocomplete>
                </v-col>
                <v-col>

                    <!-- ? Add Venue Dialog -->
                    <v-btn>Add new venue
                        <v-menu activator="parent" :close-on-content-click="false" location="end">
                            <v-card min-width="300">
                                <v-card-title>Add new venue</v-card-title>
                                <v-list>
                                    <v-text-field 
                                        label="Venue Name"
                                        v-model="newVenue.name"
                                    ></v-text-field>
                                    <v-text-field 
                                        label="Venue Address"
                                        v-model="newVenue.address"
                                    ></v-text-field>
                                    <v-text-field 
                                        label="Venue Postcode"
                                        v-model="newVenue.postcode"
                                    ></v-text-field>
                                </v-list>
                                <v-card-actions>
                                    <v-spacer></v-spacer>

                                    <v-btn variant="text" @click="menus.venue = false"> Cancel </v-btn>
                                    <v-btn color="primary" variant="text" @click="addVenue">
                                        Save
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-menu>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>

                    <!-- ? Gig Type -->
                    <v-autocomplete label="Type" :items="allGigTypes" v-model="gig.gigType"></v-autocomplete>
                </v-col>
                <v-col>

                    <!-- ? Line Up -->
                    <v-combobox label="Line Up" :items="allLineUps" v-model="gig.lineUp"></v-combobox>
                </v-col>
            </v-row>
            <v-row>
                <v-col>

                    <!-- ? Sets -->
                    <v-btn>Add set
                        <v-menu activator="parent" :close-on-content-click="false" location="end">
                            <v-card min-width="300">

                                <!-- ? New Set Dialog -->
                                <v-card-title>Add new set</v-card-title>
                                <v-list>
                                    <v-text-field label="Length" suffix="minutes" v-model="newSet.length"></v-text-field>
                                    <v-text-field label="Description" v-model="newSet.desc"></v-text-field>
                                </v-list>
                                <v-card-actions>
                                    <v-spacer></v-spacer>

                                    <v-btn variant="text" @click="menus.request = false"> Cancel </v-btn>
                                    <v-btn color="primary" variant="text" @click="createSet">
                                        Save
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-menu>
                    </v-btn>
                </v-col>
                <v-col>

                    <!-- ? Display created sets -->
                    <v-list v-for="(set, i) in gig.gigSets" v-bind:key="i">
                        <v-card>
                            <v-card-title>{{ set.length }} minutes</v-card-title>
                            <v-card-subtitle>{{ set.desc }}</v-card-subtitle>
                            <v-card-actions>
                                <v-btn @click="gig.gigSets.splice(i, 1)">Remove</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-list>
                </v-col>
            </v-row>

            <!-- ? Notes -->
            <v-textarea label="Notes" v-model="gig.notes"></v-textarea>

            <!-- ? Fee -->
            <v-text-field label="Fee" v-model="gig.fee" prefix="&pound;"></v-text-field>

            <!-- ? Status -->
            <v-switch 
                label="Confirmed"
                true-value="confirmed"
                false-value="unconfirmed"
                v-model="gig.status"
            ></v-switch>

            <!-- ? Genre -->
            <v-combobox :items="allGenres" label="Genre(s)" v-model="gig.genres" multiple></v-combobox>
            <v-row>
                <v-col>

                    <!-- ? Requests -->
                    <v-btn>Add request
                        <v-menu activator="parent" :close-on-content-click="false" location="end">
                            <v-card min-width="300">

                                <!-- ? Add request dialog -->
                                <v-card-title>Add request</v-card-title>
                                <v-list>
                                    <v-text-field label="Piece" v-model="newRequest.name"></v-text-field>
                                    <v-text-field label="Description" v-model="newRequest.desc"></v-text-field>
                                </v-list>
                                <v-card-actions>
                                    <v-spacer></v-spacer>

                                    <v-btn variant="text" @click="menus.request = false"> Cancel </v-btn>
                                    <v-btn color="primary" variant="text" @click="createRequest">
                                        Save
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-menu>
                    </v-btn>
                </v-col>
                <v-col>

                    <!-- ? Display added requests -->
                    <v-list v-for="(piece, i) in gig.requests" v-bind:key="i">
                        <v-card prepend-icon="mdi-piano">
                            <template v-slot:title>{{ piece.name }} - {{ piece.desc }}</template>
                            <v-card-actions>
                                <v-btn @click="newGig.requests.splice(index, 1)">Remove</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-list>
                </v-col>
            </v-row>

            <!-- ? Submit -->
            <v-btn block @click="updateGig">Update Gig</v-btn>
        </v-form>

        <!-- ? Alerts -->
        <v-snackbar 
            v-model="alert.display" 
            :timeout="alert.timeout"
            :color="alert.color"
        >{{ alert.message }}</v-snackbar>
    </v-container>
</template>