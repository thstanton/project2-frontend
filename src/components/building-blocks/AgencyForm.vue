<script>
const API_SAVEAGENCY_URL = 'http://localhost:4000/agencies/new'
const API_UPDATEAGENCY_URL = 'http://localhost:4000/agencies/update'
const API_SINGLEAGENCY_URL = 'http://localhost:4000/agencies'

export default {
    name: 'AgencyForm',
    props: ['agencyId'],
    emits: ['closeDialog', 'agencyAdd', 'agencyUpdate'],
    data: () => ({
        agency: {}
    }),
    async mounted() {
        if (this.agencyId) {
            try {
                const response = await fetch(`${API_SINGLEAGENCY_URL}/${this.agencyId}`)
                let data = await response.json()
                this.agency = data
            } catch (err) {
                console.error(err)
            }
        }
    },
    methods: {
        addAgency: async function () {
            try {
                // Post new agency to DB
                const response = await fetch(API_SAVEAGENCY_URL, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.agency)
                })

                // Check if successful
                if (response.status === 201) {
                        this.$emit('agencyAdd', 'The agency was added')
                    } else {
                        this.$emit('agencyAdd', 'Error: Agency not added')
                    }
            } catch (err) {
                console.error(err)
            }
        },
        updateAgency: async function () {
            try {
                // Post new agency to DB
                const response = await fetch(`${API_UPDATEAGENCY_URL}/${this.agencyId}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.agency)
                })

                // Check if successful
                if (response.status === 201) {
                        this.$emit('agencyUpdate', 'The agency was updated')
                    } else {
                        this.$emit('agencyUpdate', 'Error: Agency not updated')
                    }
            } catch (err) {
                console.error(err)
            }
        }
    }
}
</script>

<template>
    <v-card>
        <v-card-title v-if="agencyId">Edit agency</v-card-title>
        <v-card-title v-else>Create agency</v-card-title>
        <v-list>
            <v-text-field label="Agency Name" v-model="agency.name"></v-text-field>
            <v-text-field label="Agency Email" v-model="agency.email"></v-text-field>
        </v-list>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="text" @click="$emit('closeDialog')">Cancel</v-btn>
            <v-btn v-if="agencyId" color="primary" variant="text" @click="updateAgency">Update</v-btn>
            <v-btn v-else color="primary" variant="text" @click="addAgency">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>