import { createWebHistory, createRouter } from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import GigView from '../components/GigView'
import NewGig from '../components/NewGig'
import UpcomingGigs from '../components/UpcomingGigs'
import AllAgencies from '../components/AllAgencies'
import AgencyView from '../components/AgencyView'
import AllVenues from '../components/AllVenues'
import VenueView from '../components/VenueView'
import UnconfirmedGigs from '../components/UnconfirmedGigs'

const routes = [
    {
        name: 'Home',
        path: '/',
        component: HelloWorld
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

export default router