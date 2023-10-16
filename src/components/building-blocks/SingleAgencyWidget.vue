<script>

export default {
    name: 'SingleAgencyWidget',
    props: ['agency'],
}
</script>

<template>
    <v-card width="100%">
        <v-card-item>
            <v-card-title>Agency:</v-card-title>
        </v-card-item>
        <v-card-text>
            <v-row>
                <v-col class="v-col-auto">
                    <v-avatar>
                        <span class="text-h5">{{ agency.initials }}</span>
                    </v-avatar>
                </v-col>
                <v-col>
                    <h4>{{ agency.name }}</h4>
                    <p>{{ agency.email }}</p>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-btn :to="'/agencies/' + agency._id">Details</v-btn>
        </v-card-actions>
    </v-card>
</template>