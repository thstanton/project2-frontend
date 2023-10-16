<script>
import AgencyForm from './AgencyForm.vue'
import VenueForm from './VenueForm.vue'

const API_AGENCYDELETE_URL = `${process.env.VUE_APP_BACKEND_API}/agencies/delete`
const API_VENUEDELETE_URL = `${process.env.VUE_APP_BACKEND_API}/venues/delete`
const API_GIGDELETE_URL = `${process.env.VUE_APP_BACKEND_API}/gigs/delete`

export default {
    name: 'EditMenu',
    props: ['gigId', 'agencyId', 'venueId', 'gigCount'],
    emits: ['agencyUpdate', 'venueUpdate'],
    components: {
    AgencyForm,
    VenueForm
},
    data: () => ({
        deleteDialog: false,
        agencyEditDialog: false,
        venueEditDialog: false
    }),
    methods: {
        async deleteGig() {
            this.deleteDialog = false
            try {
                const response = await fetch(`${API_GIGDELETE_URL}/${this.gigId}`, {
                    method: 'DELETE'
                })
                // Check if successful
                if (response.status === 200) {
                    setTimeout(() => this.$router.replace({ path: '/gigs'}), 4000)
                } else {
                    console.log(response)
                }
            } catch (err) {
                console.error(err)
            }
        },
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
        async deleteVenue() {
            this.deleteDialog = false
            try {
                const response = await fetch(`${API_VENUEDELETE_URL}/${this.venueId}`, {
                    method: 'DELETE'
                })
                // Check if successful
                if (response.status === 200) {
                    setTimeout(() => this.$router.replace({ path: '/venues'}), 4000)
                } else {
                    console.log(response)
                }
            } catch (err) {
                console.error(err)
            }
        },
        handleAgencyUpdate(agencyData) {
            if (agencyData) { 
                this.$emit('agencyUpdate', agencyData)
            } else {
                this.$emit('agencyUpdate', false)
            }
            this.agencyEditDialog = false
        },
        handleVenueUpdate(venueData) {
            if (venueData) { 
                this.$emit('venueUpdate', venueData)
            } else {
                this.$emit('venueUpdate', false)
            }
            this.venueEditDialog = false
        }
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
                    <v-list-item :to="'/gigs/update/' + gigId">Edit Gig</v-list-item>
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

    <!-- ! Delete Dialog -->
    <v-dialog 
        v-model="deleteDialog"
        width="auto"
        >

        <!-- ? Delete Gig -->
        <v-card v-if="gigId">
            <v-card-text>
                Are you sure you want to delete this gig?
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="deleteGig">Delete</v-btn>
                <v-btn @click="deleteDialog = false">Cancel</v-btn>
            </v-card-actions>
        </v-card>

        <!-- ? Guard against deletion of agencies or venues with gigs associated with them -->
        <v-card v-if="agencyId && gigCount || venueId && gigCount">
            <v-card-text>
                This item has {{ gigCount }} gigs associated with it. Please delete or reassign them before deleting.
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="deleteDialog = false">Cancel</v-btn>
            </v-card-actions>
        </v-card>

        <!-- ? Delete Agency -->
        <v-card v-else-if="agencyId">
            <v-card-text>
                Are you sure you want to delete this agency?
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="deleteAgency">Delete</v-btn>
                <v-btn @click="deleteDialog = false">Cancel</v-btn>
            </v-card-actions>
        </v-card>

        <!-- ? Delete Venue -->
        <v-card v-else-if="venueId">
            <v-card-text>
                Are you sure you want to delete this venue?
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="deleteVenue">Delete</v-btn>
                <v-btn @click="deleteDialog = false">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- ! Edit Dialog -->
    <!-- ? Agency Edit Dialog -->
    <v-dialog 
        v-model="agencyEditDialog"
        width="auto"
        >
        <AgencyForm 
            :agencyId="agencyId"
            @closeDialog="agencyEditDialog = false"
            @agencyUpdate="handleAgencyUpdate"
            />
    </v-dialog>

    <!-- ? Venue Edit Dialog -->
    <v-dialog 
        v-model="venueEditDialog"
        width="auto"
        >
        <VenueForm
            :venueId="venueId"
            @closeDialog="venueEditDialog = false"
            @venueUpdate="handleVenueUpdate"
        />
    </v-dialog>
</template>