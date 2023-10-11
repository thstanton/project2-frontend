<script>
export default {
    name: 'NavDrawer'
}
</script>

<template>
    <v-navigation-drawer class="bg-indigo-darken-2" theme="light" permanent>
    <v-list-item title="Gig Manager"></v-list-item>
    <v-divider></v-divider>
    <v-list-item to="/" prepend-icon="mdi-view-dashboard" link title="Dashboard"></v-list-item>
    <v-list-item to="/gigs/create" prepend-icon="mdi-plus-circle-outline" link title="New Gig"></v-list-item>
    <v-list-item to="/gigs/upcoming" prepend-icon="mdi-calendar" link title="Upcoming Gigs"></v-list-item>
    <v-list-item to="/agencies" prepend-icon="mdi-account-group" link title="Agencies"></v-list-item>
    <v-list-item to="/venues" prepend-icon="mdi-town-hall" link title="Venues"></v-list-item>
    <v-list-item to="/gigs/unconfirmed" prepend-icon="mdi-clock-alert-outline" link title="Unconfirmed Gigs"></v-list-item>
    <v-list-item prepend-icon="mdi-magnify" link title="Search all"></v-list-item>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn block> Logout </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
