import { createWebHistory, createRouter } from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import GigView from '../components/GigView'
import NewGig from '../components/NewGig'

const routes = [
    {
        name: 'Home',
        path: '/',
        component: HelloWorld
    },
    {
        name: 'Create Gig',
        path: '/gig/create',
        component: NewGig
    },
    {
        name: 'Single Gig',
        path: '/gig',
        component: GigView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router