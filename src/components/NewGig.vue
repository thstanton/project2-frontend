<template>
    <!-- ? Breadcrumbs -->
    <v-breadcrumbs :items="breadcrumbs" divider="/"></v-breadcrumbs>
    <v-container>
        <v-form>

            <!-- ? Date -->
            <v-text-field label="Date" v-model="newGig.date">
                <v-menu 
                activator="parent"
                :close-on-content-click="false"
                ><v-date-picker 
                    v-model="newGig.date"
                ></v-date-picker>
                </v-menu>
            </v-text-field>
            <v-row>
                <v-col>

                    <!-- ? Start Time -->
                    <v-text-field 
                        type="time" 
                        label="Start Time" 
                        v-model="newGig.startTime"
                    ></v-text-field>
                </v-col>
                <v-col>

                    <!-- ? End Time -->
                    <v-text-field 
                        type="time" 
                        label="End Time" 
                        v-model="newGig.endTime"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>

                    <!-- ? Agency -->
                    <v-autocomplete 
                        label="Agency" 
                        :items="allAgencies"
                        v-model="newGig.agencyName"
                    ></v-autocomplete>
                </v-col>
                <v-col>

                    <!-- ? Add Agency Dialog -->
                    <v-btn>Add new agency
                        <v-menu 
                            activator="parent" 
                            :close-on-content-click="false" 
                            location="end"
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

                                    <v-btn variant="text" @click="menu = false"> Cancel </v-btn>
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
                        v-model="newGig.venueName"
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
                                        v-model="newVenue.postCode"
                                    ></v-text-field>
                                </v-list>
                                <v-card-actions>
                                    <v-spacer></v-spacer>

                                    <v-btn variant="text" @click="menu = false"> Cancel </v-btn>
                                    <v-btn color="primary" variant="text" @click="menu = false">
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
                    <v-autocomplete label="Type" :items="allGigTypes" v-model="newGig.gigType"></v-autocomplete>
                </v-col>
                <v-col>

                    <!-- ? Line Up -->
                    <v-combobox label="Line Up" :items="allLineUps" v-model="newGig.lineUp"></v-combobox>
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

                                    <v-btn variant="text" @click="menu = false"> Cancel </v-btn>
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
                    <v-list v-for="(set, i) in newGig.gigSets" v-bind:key="i">
                        <v-card>
                            <v-card-title>{{ set.length }} minutes</v-card-title>
                            <v-card-subtitle>{{ set.desc }}</v-card-subtitle>
                            <v-card-actions>
                                <v-btn @click="newGig.gigSets.splice(i, 1)">Remove</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-list>
                </v-col>
            </v-row>

            <!-- ? Notes -->
            <v-textarea label="Notes" v-model="newGig.notes"></v-textarea>

            <!-- ? Fee -->
            <v-text-field label="Fee" v-model="newGig.fee" prefix="&pound;"></v-text-field>

            <!-- ? Status -->
            <v-switch 
                label="Confirmed"
                true-value="confirmed"
                false-value="unconfirmed"
                v-model="newGig.status"
            ></v-switch>

            <!-- ? Genre -->
            <v-combobox :items="allGenres" label="Genre(s)" v-model="newGig.genres" multiple></v-combobox>
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

                                    <v-btn variant="text" @click="menu = false"> Cancel </v-btn>
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
                    <v-list v-for="(piece, i) in newGig.requests" v-bind:key="i">
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
            <v-btn block @click="addGig">Save Gig</v-btn>
        </v-form>
        <v-snackbar 
            v-model="alert.display" 
            :timeout="alert.timeout"
            :color="alert.color"
        >{{ alert.message }}</v-snackbar>
    </v-container>
</template>

<script>
const API_SAVEGIG_URL = 'http://localhost:4000/gigs/new'
const API_SAVEAGENCY_URL = 'http://localhost:4000/agencies/new'
const API_GETAGENCYNAMES_URL = 'http://localhost:4000/agencies/names'

export default {
    name: 'GigView',
    data: () => ({
        breadcrumbs: [
            {
                title: 'Dashboard',
                disabled: false,
                href: '/',
            },
            {
                title: 'New Gig',
                disabled: true,
                href: 'breadcrumbs_link_1',
            }
        ],
        newGig: {
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
        }
    }),
    async mounted() {
        // Fetch agencies and populate allAgencies list
        const agencyResponse = await fetch(API_GETAGENCYNAMES_URL)
        let agencyData = await agencyResponse.json()
        this.allAgencies = agencyData
        // Fetch venues and populate allVenues list

    },
    methods: {
        createSet: function () {
            this.newGig.gigSets.push(this.newSet)
            this.newSet = {}
            this.menu = false
        },
        deleteSet: function () {

        },
        createRequest: function () {
            this.newGig.requests.push(this.newRequest)
            this.newRequest = {}
        },
        deleteRequest: function () {

        },
        addAgency: async function () {
            try {
                // Check not duplicate
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
            // Post new agency to DB
            
            // Repopulate allAgencies
            
        },
        addGig: async function () {
            try {
                // Post new gig to DB
                const response = await fetch(API_SAVEGIG_URL, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.newGig)
                })
                console.log(response)
                // Check if successful
                if (response.status === 201) {
                    // Return confirmed message
                    this.alert.message = "Gig Added Successfully"
                    this.alert.display = true
                    // Redirect to single gig page
                    setTimeout(() => this.$router.replace({ path: '/gig'}), 4000)
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

<style scoped></style>