<script>
export default {
    name: 'LandingPage',
    data: () => ({

    }),
}
</script>

<template>
    <v-container>
        <v-row>
            <v-col class="v-col-4"></v-col>
            <v-col class="v-col-4">
                <v-img
                    :src="require('../assets/splash-screen.png')"
                    max-width="600px"
                ></v-img>
            </v-col>
            <v-col class="v-col-4"></v-col>
        </v-row>
        <v-row>
            <v-col class="v-col-2"></v-col>
            <v-col class="v-col-8">
                <h1 class="text-center"><span>Welcome to</span> Gig Manager</h1>
            </v-col>
            <v-col class="v-col-2"></v-col>
        </v-row>
        <v-row>
            <v-col class="v-col-2"></v-col>
            <v-col class="v-col-8">
                <h2 class="text-subtitle-1 text-center">Please Log In to Continue</h2>
            </v-col>
            <v-col class="v-col-2"></v-col>
        </v-row>
    </v-container>
</template>

<style scoped>

h1 {
  font-family: 'DM Sans', sans-serif;
  font-size: 6vmin;
  font-weight: 600;
}

h1 span {
    font-weight: 400;
}

</style>