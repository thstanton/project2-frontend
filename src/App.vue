<template>
  <v-app>
    <v-navigation-drawer class="bg-indigo-darken-2" theme="light" permanent>
      <v-list-item title="Gig Manager"></v-list-item>
      <v-divider></v-divider>
      <v-list-item prepend-icon="mdi-view-dashboard" link title="Dashboard"></v-list-item>
      <v-list-item prepend-icon="mdi-plus-circle-outline" link title="New Gig"></v-list-item>
      <v-list-item prepend-icon="mdi-calendar" link title="Upcoming Gigs"></v-list-item>
      <v-list-item prepend-icon="mdi-account-group" link title="Agencies"></v-list-item>
      <v-list-item prepend-icon="mdi-town-hall" link title="Venues"></v-list-item>
      <v-list-item prepend-icon="mdi-clock-alert-outline" link title="Unconfirmed Gigs"></v-list-item>
      <v-list-item prepend-icon="mdi-magnify" link title="Search all"></v-list-item>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main class="bg-grey-lighten-5">
      <router-view :key="$route.path" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {

  }
}
</script>


