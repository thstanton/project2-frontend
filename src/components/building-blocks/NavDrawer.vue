<script>
import { decodeCredential, googleLogout } from 'vue3-google-login'

const API_URL = 'http://localhost:4000/users'

export default {
    name: 'NavDrawer',
    data: () => ({
      isLoggedIn: false,
      userFName: '',
      userSName: '',
      userAvatar: '',
    }),
    mounted() {
      if (this.$cookies.isKey('user_session')) { // isKey() method checks whether cookie already exists
            this.isLoggedIn = true
            const userData = decodeCredential(this.$cookies.get('user_session'))
            this.userFName = userData.given_name
            this.userSName = userData.family_name
            this.userAvatar = userData.picture
        }      
    },
    methods: {
      callback: function (response) {
            this.isLoggedIn = true
            const userData = decodeCredential(response.credential)
            this.userFName = userData.given_name
            this.userSName = userData.family_name
            this.userAvatar = userData.picture
            this.$cookies.set('user_session', response.credential)
            fetch(API_URL, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: userData.email,
                    lastLogin: new Date()
                })
            })
        },
        handleLogOut: function () {
            googleLogout()
            this.$cookies.remove('user_session')
            this.isLoggedIn = false
        }
    }
}
</script>

<template>
    <v-navigation-drawer class="bg-indigo-darken-2" theme="light" permanent>
    <v-list-item title="Gig Manager"></v-list-item>
    <v-divider></v-divider>
    <v-list-item v-if="isLoggedIn" :prepend-avatar="userAvatar">{{ userFName }} {{ userSName }}</v-list-item>
    <v-divider></v-divider>
    <v-list-item to="/dashboard" prepend-icon="mdi-view-dashboard" link title="Dashboard"></v-list-item>
    <v-list-item to="/gigs/create" prepend-icon="mdi-plus-circle-outline" link title="New Gig"></v-list-item>
    <v-list-item to="/gigs/upcoming" prepend-icon="mdi-calendar" link title="Upcoming Gigs"></v-list-item>
    <v-list-item to="/agencies" prepend-icon="mdi-account-group" link title="Agencies"></v-list-item>
    <v-list-item to="/venues" prepend-icon="mdi-town-hall" link title="Venues"></v-list-item>
    <v-list-item to="/gigs/unconfirmed" prepend-icon="mdi-clock-alert-outline" link title="Unconfirmed Gigs"></v-list-item>
    <v-list-item to="/gigs" prepend-icon="mdi-magnify" link title="Search all"></v-list-item>
    <template v-slot:append>
      <div v-if="isLoggedIn" class="pa-2">
        <v-btn block @click="handleLogOut"> Logout </v-btn>
      </div>
      <div v-else class="pa-2">
        <!-- <v-btn block prepend-icon="mdi-google"> -->
          <GoogleLogin :callback="callback" />
        <!-- </v-btn> -->
      </div>
    </template>
  </v-navigation-drawer>
</template>
