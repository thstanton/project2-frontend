<script>
import AgencyForm from './AgencyForm'

const API_AGENCYDELETE_URL = "http://localhost:4000/agencies/delete"

export default {
    name: 'EditMenu',
    props: ['gigId', 'agencyId', 'venueId', 'gigCount'],
    components: {
        AgencyForm
    },
    data: () => ({
        deleteDialog: false,
        agencyEditDialog: false,
        venueEditDialog: false
    }),
    methods: {
    //     async deleteGig() {
    //         this.deleteDialog = false
    //         try {
    //             const response = await fetch(`${API_DELETE_URL}/${this.gig._id}`, {
    //                 method: 'DELETE'
    //             })
    //             console.log(response)
    //             // Check if successful
    //             if (response.status === 200) {
    //                 // Return confirmed message
    //                 this.alert.message = "Gig deleted"
    //                 this.alert.display = true
    //                 // Redirect to single gig page
    //                 setTimeout(() => this.$router.replace({ path: '/gigs/upcoming'}), 4000)
    //             } else {
    //                 // Return confirmed message
    //                 this.alert.message = "There was a problem"
    //                 this.alert.display = true
    //             }
    //         } catch (err) {
    //             console.error(err)
    //         }
    //     },
        async deleteAgency() {
            this.deleteDialog = false
            try {
                const response = await fetch(`${API_AGENCYDELETE_URL}/${this.agencyId}`, {
                    method: 'DELETE'
                })
                // Check if successful
                if (response.status === 200) {
                    setTimeout(() => this.$router.replace({ path: '/agencies'}), 4000)
                } else {
                    console.log(response)
                }
            } catch (err) {
                console.error(err)
            }
        },
    //     async deleteVenue() {
    //         this.deleteDialog = false
    //         try {
    //             const response = await fetch(`${API_DELETE_URL}/${this.gig._id}`, {
    //                 method: 'DELETE'
    //             })
    //             console.log(response)
    //             // Check if successful
    //             if (response.status === 200) {
    //                 // Return confirmed message
    //                 this.alert.message = "Gig deleted"
    //                 this.alert.display = true
    //                 // Redirect to single gig page
    //                 setTimeout(() => this.$router.replace({ path: '/gigs/upcoming'}), 4000)
    //             } else {
    //                 // Return confirmed message
    //                 this.alert.message = "There was a problem"
    //                 this.alert.display = true
    //             }
    //         } catch (err) {
    //             console.error(err)
    //         }
    //     }
    }
}
</script>

<template>
    <!-- ? Edit Menu -->
    <VLayoutItem 
        model-value 
        position="bottom" 
        class="text-end" 
        size="88"
        >
        <div class="ma-4">
            <v-btn 
                size="x-large" 
                icon="mdi-file-edit" 
                color="primary" 
                elevation="8" 
                id="edit-menu"
                >
            </v-btn>

            <v-menu activator="#edit-menu">
                <v-list v-if="gigId">
                    <v-list-item :to="'/gigs/update/' + gig._id">Edit Gig</v-list-item>
                    <v-list-item @click="deleteDialog = true">Delete Gig</v-list-item>
                </v-list>

                <v-list v-if="agencyId">
                    <v-list-item @click="agencyEditDialog = true">Edit Agency</v-list-item>
                    <v-list-item @click="deleteDialog = true">Delete Agency</v-list-item>
                </v-list>

                <v-list v-if="venueId">
                    <v-list-item @click="venueEditDialog = true">Edit Venue</v-list-item>
                    <v-list-item @click="deleteDialog = true">Delete Venue</v-list-item>
                </v-list>
            </v-menu>
        </div>
    </VLayoutItem>

    <!-- ? Delete Dialog -->
    <v-dialog 
        v-model="deleteDialog"
        width="auto"
        >
        <v-card v-if="gigId">
            <v-card-text>
                Are you sure you want to delete this gig?
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="deleteGig">Delete</v-btn>
                <v-btn @click="deleteDialog = false">Cancel</v-btn>
            </v-card-actions>
        </v-card>

        <v-card v-if="agencyId && gigCount">
            <v-card-text>
                This agency has {{ gigCount }} gigs associated with it. Please remove them before deleting.
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="deleteDialog = false">Cancel</v-btn>
            </v-card-actions>
        </v-card>

        <v-card v-else-if="agencyId">
            <v-card-text>
                Are you sure you want to delete this agency?
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="deleteAgency">Delete</v-btn>
                <v-btn @click="deleteDialog = false">Cancel</v-btn>
            </v-card-actions>
        </v-card>



        <v-card v-if="venueId">
            <v-card-text>
                Are you sure you want to delete this venue?
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="deleteVenue">Delete</v-btn>
                <v-btn @click="deleteDialog = false">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- ? Agency Edit Dialog -->
    <v-dialog 
        v-model="agencyEditDialog"
        width="auto"
        >
        <AgencyForm 
            :agencyId="agencyId"
            @closeDialog="agencyEditDialog = false"
            />
    </v-dialog>

    <!-- ? Venue Edit Dialog -->
    <v-dialog 
        v-model="venueEditDialog"
        width="auto"
        >
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
    </v-dialog>
</template>