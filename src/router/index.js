import { createWebHistory, createRouter } from 'vue-router'
import { useCookies } from "vue3-cookies"
// import Vue from 'vue'
// import { app } from '../main'
import LandingPage from '../components/LandingPage'
import GigView from '../components/GigView'
import NewGig from '../components/NewGig'
import UpcomingGigs from '../components/UpcomingGigs'
import AllAgencies from '../components/AllAgencies'
import AgencyView from '../components/AgencyView'
import AllVenues from '../components/AllVenues'
import VenueView from '../components/VenueView'
import UnconfirmedGigs from '../components/UnconfirmedGigs'
import UpdateGig from '../components/UpdateGig'
import AllGigs from '../components/AllGigs'
import DashBoard from '../components/DashBoard'

const routes = [
    {
        name: 'Landing Page',
        path: '/',
        component: LandingPage
    },
    {
        name: 'Dashboard',
        path: '/dashboard',
        component: DashBoard,
        // beforeEnter: (to, from, next) => {
        //     if(Vue.cookie.get('user-session')) {
        //       next('/dashboard');
        //     } else {
        //       next();
        //     }
        // }
    },
    {
        name: 'All Gigs',
        path: '/gigs',
        component: AllGigs
    },
    {
        name: 'Create Gig',
        path: '/gigs/create',
        component: NewGig
    },
    {
        name: 'Upcoming Gigs',
        path: '/gigs/upcoming',
        component: UpcomingGigs
    },
    {
        name: 'Agencies',
        path: '/agencies',
        component: AllAgencies
    },
    {
        name: 'Venues',
        path: '/venues',
        component: AllVenues
    },
    {
        name: 'Unconfirmed Gigs',
        path: '/gigs/unconfirmed',
        component: UnconfirmedGigs
    },
    {
        name: 'Update Gig',
        path: '/gigs/update/:id',
        component: UpdateGig
    },
    {
        name: 'Single Gig',
        path: '/gigs/:id',
        component: GigView
    },
    {
        name: 'Single Agency',
        path: '/agencies/:id',
        component: AgencyView
    },
    {
        name: 'Single Venue',
        path: '/venues/:id',
        component: VenueView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to) => {
    const { cookies } = useCookies()
    const isLoggedIn = cookies.isKey('user_session')
    if (!isLoggedIn && to.name !== 'Landing Page') {
        return { name: 'Landing Page' }
    }
})

// function beforeEnter(to) {
//     const { cookies } = useCookies()
//     const isLoggedIn = cookies.isKey('user-session')
//     console.log(isLoggedIn)
//     if (isLoggedIn && to.name !== 'Landing Page') {
//         return { name: 'Landing Page' }
//     }
// }

export default router