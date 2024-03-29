<script>
// ? Imports
import AgencyForm from "./AgencyForm.vue";
import VenueForm from "./VenueForm.vue";
import AlertBar from "./AlertBar.vue";
import moment from "moment";
import getJwt from "@/methods/getUser";

// ? API Links
const API_GIGS_URL = `${process.env.VUE_APP_BACKEND_API}/gigs`;

export default {
  name: "GigView",
  props: ["gigId"],
  components: {
    AgencyForm,
    VenueForm,
    AlertBar,
  },
  data: () => ({
    gig: {
      date: "",
      startTime: "",
      endTime: "",
      agencyName: "",
      venueName: "",
      gigType: "",
      lineUp: "",
      gigSets: [],
      notes: "",
      fee: "",
      status: "",
      genres: [],
      requests: [],
    },
    newVenue: {},
    newAgency: {},
    newSet: {
      length: "",
      desc: "",
    },
    newRequest: {
      piece: "",
      desc: "",
    },
    allAgencies: [],
    allVenues: [],
    allGenres: ["Jazz", "Pop", "Classical", "Blues"],
    allGigTypes: ["Wedding", "Function", "Residency"],
    allLineUps: ["Solo", "Duo", "Trio", "Quartet", "Band"],
    menus: {
      agency: false,
      venue: false,
      set: false,
      request: false,
      datePicker: false,
    },
    setMenu: false,
    requestMenu: false,
    dataLoaded: false,
    alertBar: false,
    alertMessage: "",
  }),
  async mounted() {
    try {
      let response;

      if (this.gigId) {
        response = await fetch(`${API_GIGS_URL}/populate-form/${this.gigId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer: ${getJwt()}`,
          },
        });
      } else {
        response = await fetch(`${API_GIGS_URL}/populate-form`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer: ${getJwt()}`,
          },
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (response) {
        let data = await response.json();
        this.allAgencies = data.agencies;
        this.allVenues = data.venues;

        if (this.gigId) {
          this.gig = data.gig;
          //Format Date
          const gigDate = new Date(data.gig.date);
          this.gig.date = moment(gigDate).format("YYYY-MM-DD");
          this.dataLoaded = true;
        }
      }
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    createSet: function () {
      this.gig.gigSets.push(this.newSet);
      this.newSet = {
        length: "",
        desc: "",
      };
      this.setMenu = false;
    },
    createRequest: function () {
      this.gig.requests.push(this.newRequest);
      this.newRequest = {
        piece: "",
        desc: "",
      };
      this.requestMenu = false;
    },
    updateGig: async function () {
      try {
        // Post new gig to DB
        const response = await fetch(`${API_GIGS_URL}/update/${this.gig._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.gig),
        });

        // Check if successful
        if (response.status === 201) {
          // Return confirmed message
            this.alertMessage = "Gig updated"
            this.alertBar = true
          // Redirect to single gig page
          setTimeout(
            () => this.$router.replace({ path: `/gigs/${this.gig._id}` }),
            2000
          );
        } else {
          // Return confirmed message
          console.log(response);
        }
      } catch (err) {
        console.error(err);
      }
    },
    addGig: async function () {
      try {
        // Post new gig to DB
        const response = await fetch(`${API_GIGS_URL}/new`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer: ${getJwt()}`,
          },
          body: JSON.stringify({ gig: this.gig }),
        });
        // Check if successful
        if (response.status === 201) {
          this.alertMessage = "Gig added successfully";
          this.alertBar = true;
          setTimeout(() => this.$router.replace({ path: `/gigs` }), 2000);
        } else {
          console.log(response);
        }
      } catch (err) {
        console.error(err);
      }
    },
    handleNewAgency: function (agencyName) {
      if (agencyName) this.gig.agencyName = agencyName;
      this.menus.agency = false;
    },
    handleNewVenue: function (venueName) {
      if (venueName) this.gig.venueName = venueName;
      this.menus.venue = false;
    },
  },
};
</script>

<template>
  <v-container>
    <AlertBar :message="alertMessage" v-model="alertBar" />
    <v-form>
      <!-- ? Date -->
      <v-text-field label="Date" type="date" v-model="gig.date"> </v-text-field>
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
          <v-btn
            >Add new agency
            <v-menu
              activator="parent"
              :close-on-content-click="false"
              location="end"
              v-model="menus.agency"
            >
              <AgencyForm
                @agencyAdd="handleNewAgency"
                @closeDialog="menus.agency = false"
              />
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
          <v-btn
            >Add new venue
            <v-menu
              activator="parent"
              v-model="menus.venue"
              :close-on-content-click="false"
              location="end"
            >
              <VenueForm
                @venueAdd="handleNewVenue"
                @closeDialog="menus.venue = false"
              />
            </v-menu>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <!-- ? Gig Type -->
          <v-autocomplete
            label="Type"
            :items="allGigTypes"
            v-model="gig.gigType"
          ></v-autocomplete>
        </v-col>
        <v-col>
          <!-- ? Line Up -->
          <v-combobox
            label="Line Up"
            :items="allLineUps"
            v-model="gig.lineUp"
          ></v-combobox>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <!-- ? Sets -->
          <v-btn
            >Add set
            <v-menu
              v-model="setMenu"
              activator="parent"
              :close-on-content-click="false"
              location="end"
            >
              <v-card min-width="300">
                <!-- ? New Set Dialog -->
                <v-card-title>Add new set</v-card-title>
                <v-card-text>
                  <v-list>
                    <v-text-field
                      label="Length"
                      suffix="minutes"
                      v-model="newSet.length"
                    ></v-text-field>
                    <v-text-field
                      label="Description"
                      v-model="newSet.desc"
                    ></v-text-field>
                  </v-list>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn @click="setMenu = false"> Cancel </v-btn>
                  <v-btn @click="createSet"> Save </v-btn>
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
      <v-text-field
        label="Fee"
        v-model="gig.fee"
        prefix="&pound;"
      ></v-text-field>

      <!-- ? Status -->
      <v-radio-group v-model="gig.status">
        <v-radio label="Unconfirmed" value="unconfirmed"></v-radio>
        <v-radio label="Confirmed" value="confirmed"></v-radio>
      </v-radio-group>

      <!-- ? Genre -->
      <v-combobox
        :items="allGenres"
        label="Genre(s)"
        v-model="gig.genres"
        multiple
      ></v-combobox>
      <v-row>
        <v-col>
          <!-- ? Requests -->
          <v-btn
            >Add request
            <v-menu
              activator="parent"
              v-model="requestMenu"
              :close-on-content-click="false"
              location="end"
            >
              <v-card min-width="300">
                <!-- ? Add request dialog -->
                <v-card-title>Add request</v-card-title>
                <v-card-text>
                  <v-list>
                    <v-text-field
                      label="Piece"
                      v-model="newRequest.name"
                    ></v-text-field>
                    <v-text-field
                      label="Description"
                      v-model="newRequest.desc"
                    ></v-text-field>
                  </v-list>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn @click="requestMenu = false"> Cancel </v-btn>
                  <v-btn color="primary" @click="createRequest"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-btn>
        </v-col>
        <v-col>
          <!-- ? Display added requests -->
          <v-list v-for="(piece, i) in gig.requests" v-bind:key="i">
            <v-card prepend-icon="mdi-piano">
              <template v-slot:title
                >{{ piece.name }} - {{ piece.desc }}</template
              >
              <v-card-actions>
                <v-btn @click="gig.requests.splice(index, 1)">Remove</v-btn>
              </v-card-actions>
            </v-card>
          </v-list>
        </v-col>
      </v-row>

      <!-- ? Submit -->
      <v-btn v-if="gigId" block @click="updateGig" class="mt-3"
        >Update Gig</v-btn
      >
      <v-btn v-else block @click="addGig" class="mt-3">Add Gig</v-btn>
    </v-form>
  </v-container>
</template>
