<template>
    <v-breadcrumbs :items="breadcrumbs" divider="/"></v-breadcrumbs>
    <v-container>
        <v-row>
            <v-col class="v-col-12">
                <v-card width="100%">
                    <v-row>

                        <!-- ? Date, Time, Type -->
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
            <v-col class="v-col-8">
                <v-card width="100%">
                    <v-card-item>

                        <!-- ? Details -->
                        <v-card-title>Details:</v-card-title>
                    </v-card-item>
                    <v-card-text>
                        <v-list lines="two">
                            <v-list-item title="Line-up:" :subtitle="gig.lineUp"></v-list-item>
                            <v-divider></v-divider>
                            <v-list-item title="Sets:"></v-list-item>
                            <v-timeline density="compact">
                                <v-timeline-item v-for="(set, i) in gigSets" :key="i" size="x-small" dot-color="indigo">{{ set.length }}</v-timeline-item>
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
                <v-row>
                    <v-col>
                        <v-card width="100%">
                            <v-card-item>

                                <!-- ? Venue -->
                                <v-card-title>Venue:</v-card-title>
                            </v-card-item>
                            <v-card-text>
                                <h4>{{ gig.venueName }}</h4>
                                <p>**Hook up to venue collection**</p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-card width="100%">
                            <v-card-item>

                                <!-- ? Agency -->
                                <v-card-title>Agency:</v-card-title>
                            </v-card-item>
                            <v-card-text>
                                <v-row>
                                    <v-col class="v-col-auto">
                                        <v-avatar color="red">
                                            <span class="text-h5">**AC**</span>
                                        </v-avatar>
                                    </v-col>
                                    <v-col>
                                        <h4>{{ gig.agencyName }}</h4>
                                        <p>**Hook up to agency collection**</p>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="v-col-8">
                <v-card width="100%">
                    <v-card-item>

                        <!-- ? Music  -->
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

    <!-- ? Right Sidebar -->
    <v-navigation-drawer class="bg-indigo-lighten-5" theme="light" location="right">
        <v-list-item link title="Edit Gig"></v-list-item>
    </v-navigation-drawer>
</template>

<script>
const API_URL = 'http://localhost:4000/gigs'

export default {
    name: 'GigView',
    data: () => ({
        gig: {},
        agency: {},
        venue: {},
        breadcrumbs: [
            {
                title: 'Dashboard',
                disabled: false,
                href: 'breadcrumbs_dashboard',
            },
            {
                title: 'Upcoming Gigs',
                disabled: false,
                href: 'breadcrumbs_link_1',
            },
            {
                title: '4.1.23',
                disabled: true,
                href: 'breadcrumbs_link_2',
            },
        ],
    }),
    async beforeMount() {
        let response = await fetch(`${API_URL}/${this.$route.params.id}`)
        let data = await response.json()
        console.log(data)
        this.gig = data
    },
    computed: {
        // formattedDate: function () {
        //     const options = {
        //         weekday: "long",
        //         year: "numeric",
        //         month: "long",
        //         day: "numeric",
        //     }
        //     return this.gig.date.toLocaleString('en-GB', options)
        // },
        // 
    }
}
</script>