<template>
  <v-app>
    <NavDrawer />
    <v-main class="bg-grey-lighten-5">
      <router-view :key="$route.path" />
    </v-main>
  </v-app>
</template>

<script>
import NavDrawer from './components/building-blocks/NavDrawer'

export default {
  name: 'App',
  components: {
    NavDrawer
  },
  props: {

  }
}
</script>


