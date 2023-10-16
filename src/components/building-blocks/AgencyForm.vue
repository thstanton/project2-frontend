<script>
const API_AGENCY_URL = `${process.env.VUE_APP_BACKEND_API}/agencies`

export default {
    name: 'AgencyForm',
    props: ['agencyId'],
    emits: ['closeDialog', 'agencyAdd', 'agencyUpdate'],
    data: () => ({
        agency: {},
        dataReady: false
    }),
    async mounted() {
        if (this.agencyId) {
            try {
                const response = await fetch(`${API_AGENCY_URL}/${this.agencyId}`)
                let data = await response.json()
                this.agency = data
                this.dataReady = true
            } catch (err) {
                console.error(err)
            }
        }
    },
    methods: {
        addAgency: async function () {
            try {
                // Post new agency to DB
                const response = await fetch(`${API_AGENCY_URL}/new`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.agency)
                })

                // Check if successful
                if (response.status === 201) {
                        this.$emit('agencyAdd', this.agency.name)
                    } else {
                        this.$emit('agencyAdd', false)
                    }
            } catch (err) {
                console.error(err)
            }
        },
        updateAgency: async function () {
            try {
                // Post new agency to DB
                const response = await fetch(`${API_AGENCY_URL}/update/${this.agencyId}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.agency)
                })

                // Check if successful
                if (response.status === 201) {
                        this.$emit('agencyUpdate', this.agency)
                    } else {
                        this.$emit('agencyUpdate', false)
                    }
            } catch (err) {
                console.error(err)
            }
        }
    }
}
</script>

<template>
    <v-card v-if="agencyId && dataReady || !agencyId">
        <v-card-title v-if="agencyId">Edit agency</v-card-title>
        <v-card-title v-else>Create agency</v-card-title>
        <v-list>
            <v-text-field label="Agency Name" v-model="agency.name"></v-text-field>
            <v-text-field label="Agency Email" v-model="agency.email"></v-text-field>
        </v-list>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="text" @click="$emit('closeDialog')">
                Cancel
            </v-btn>
            <v-btn v-if="agencyId" color="primary" variant="text" @click="updateAgency">
                Update
            </v-btn>
            <v-btn v-else color="primary" variant="text" @click="addAgency">
                Save
            </v-btn>
        </v-card-actions>
    </v-card>
</template>