import { createWebHistory, createRouter } from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import GigView from '../components/GigView'

const routes = [
    {
        name: 'Home',
        path: '/',
        component: HelloWorld
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