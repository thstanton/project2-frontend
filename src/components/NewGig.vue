<script>
// ? Imports
import BreadCrumbs from './building-blocks/BreadCrumbs.vue'
import GigForm from './building-blocks/GigForm.vue'

// ? API Links


export default {
    name: 'NewGig',
    components: {
        BreadCrumbs,
        GigForm
    },
    data: () => ({
        
    }),
}
</script>

<template>
    <BreadCrumbs />
    <v-container>
        <GigForm />
    </v-container>
</template>