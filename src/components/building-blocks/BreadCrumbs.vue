<script>
export default {
    name: 'BreadCrumbs',
    data: () => ({
        items: [
            {
                title: 'Dashboard',
                disabled: false,
                href: '/',
            },
            {
                title: '',
                disabled: true,
                href: 'breadcrumbs_link_1',
            }
        ],
    }),
    mounted() {
        this.items[1].title = this.$route.name
    }
}
</script>
<template>
    <v-breadcrumbs :items="items" divider="/"></v-breadcrumbs>
</template>