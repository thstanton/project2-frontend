<template>
<v-breadcrumbs
    :items="items"
    divider="-"
></v-breadcrumbs>
<v-container>
    <v-row>
        <v-col class="v-col-10">
            <v-card
                width="100%"
                title="4th January 2023"
                subtitle="6.00-9.00pm"
            ></v-card>
        </v-col>
        <v-col class="v-col-2">
            <v-card width="100%" height="100%">
                <v-card-text>
                    <v-icon icon="mdi-city" />
                    <p>Residency</p>
                </v-card-text>
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
                    <p>Line-up: Duo</p>
                    <p>Sets:</p>
                    <v-list>
                        <v-list-item>45 minutes</v-list-item>
                        <v-list-item>45 minutes</v-list-item>
                        <v-list-item>45 minutes</v-list-item>
                    </v-list> 
                    <p>Notes:</p>
                    <p>Hotel Residency</p>
                    <p>Fee: &pound;150</p> 
                </v-card-text>
            </v-card>
        </v-col>
        <v-col class="v-col-4">
            <v-card width="100%">
                <v-card-item>
                    <v-card-title>Venue:</v-card-title>
                </v-card-item>
                <v-card-text>
                    <p>Pullman Hotel</p>
                    <p>100 - 110 Euston Rd., London NW1 2AJ</p>
                </v-card-text>
            </v-card>
            
            <v-card width="100%">
                <v-card-item>
                    <v-card-title>Agency:</v-card-title>
                </v-card-item>
                <v-card-text>
                    <p>Sarah Goodwin</p>
                    <p>sarahg@gmail.com</p>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-row>
        <v-col class="v-col-8">
            <v-card width="100%">
                <v-card-item>
                    <v-card-title>Music:</v-card-title>
                </v-card-item>
                <v-card-text>
                    <p>Genre: Jazz</p>
                    <p>Requests:</p>
                    <v-list>
                        <v-list-item>Mack the Knife</v-list-item>
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
          title: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          title: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
    }),
}
</script>