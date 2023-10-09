<template>
    <v-breadcrumbs :items="items" divider="/"></v-breadcrumbs>
    <v-container>
        <v-row>
            <v-col class="v-col-12">
                <v-card width="100%">
                    <v-row>
                        <v-col class="v-col-10">
                            <v-card-title>4th January 2023</v-card-title>
                            <v-card-subtitle>6.00-9.00pm</v-card-subtitle>
                            <v-card-text>Residency</v-card-text>
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
                        <v-card-title>Details:</v-card-title>
                    </v-card-item>
                    <v-card-text>
                        <v-list lines="two">
                            <v-list-item title="Line-up:" subtitle="Duo"></v-list-item>
                            <v-divider></v-divider>
                            <v-list-item title="Sets:"></v-list-item>
                            <v-timeline density="compact">
                                <v-timeline-item size="x-small" dot-color="indigo">45 minutes</v-timeline-item>
                                <v-timeline-item size="x-small" dot-color="indigo">45 minutes</v-timeline-item>
                                <v-timeline-item size="x-small" dot-color="indigo">45 minutes</v-timeline-item>
                            </v-timeline>
                            <v-divider></v-divider>
                            <v-list-item title="Notes:" subtitle="Hotel Residency"></v-list-item>
                            <v-divider></v-divider>
                            <v-list-item title="Fee:" subtitle="&pound;150"></v-list-item>
                            <v-divider></v-divider>
                            <v-list-item title="Status:"></v-list-item>
                            <v-chip>Completed</v-chip>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col class="v-col-4">
                <v-row>
                    <v-col>
                        <v-card width="100%">
                            <v-card-item>
                                <v-card-title>Venue:</v-card-title>
                            </v-card-item>
                            <v-card-text>
                                <h4>Pullman Hotel</h4>
                                <p>100 - 110 Euston Rd., London NW1 2AJ</p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-card width="100%">
                            <v-card-item>
                                <v-card-title>Agency:</v-card-title>
                            </v-card-item>
                            <v-card-text>
                                <v-row>
                                    <v-col class="v-col-auto">
                                        <v-avatar color="red">
                                            <span class="text-h5">SG</span>
                                        </v-avatar>
                                    </v-col>
                                    <v-col>
                                        <h4>Sarah Goodwin</h4>
                                        <p>sarahg@gmail.com</p>
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
                        <v-card-title>Music:</v-card-title>
                    </v-card-item>
                    <v-card-text>
                        <v-list lines="one">
                            <v-list-item title="Genre(s):"></v-list-item>
                            <v-chip>Jazz</v-chip>
                            <v-list-item title="Requests:"></v-list-item>
                            <v-list-item prepend-icon="mdi-piano">Mack the Knife</v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <v-navigation-drawer class="bg-indigo-lighten-5" theme="light" location="right">
        <v-list-item link title="Edit Gig"></v-list-item>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'GigView',
    data: () => ({
        items: [
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
}
</script>