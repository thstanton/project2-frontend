<template>
  <v-app>
    <NavDrawer />
    <v-main class="bg-grey-lighten-5">
      <router-view :key="$route.path" />
    </v-main>
  </v-app>
</template>

<script>
import NavDrawer from './components/building-blocks/NavDrawer.vue'

export default {
  name: 'App',
  components: {
    NavDrawer
  },
  props: {

  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,700;1,9..40,400;1,9..40,600&display=swap')
</style>

