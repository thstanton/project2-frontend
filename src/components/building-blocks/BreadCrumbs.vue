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
                title: 'New Gig',
                disabled: true,
                href: 'breadcrumbs_link_1',
            }
        ],
    })
}
</script>
<template>
    <v-breadcrumbs :items="items" divider="/"></v-breadcrumbs>
</template>