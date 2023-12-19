import { createWebHistory, createRouter } from 'vue-router'
import { useCookies } from "vue3-cookies"
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
        component: LandingPage,
        meta: { title: 'Gig Manager | Welcome' }
    },
    {
        name: 'Dashboard',
        path: '/dashboard',
        component: DashBoard,
        meta: { title: 'Gig Manager | Dashboard' }
    },
    {
        name: 'All Gigs',
        path: '/gigs',
        component: AllGigs,
        meta: { title: 'Gig Manager | All Gigs' }
    },
    {
        name: 'Create Gig',
        path: '/gigs/create',
        component: NewGig,
        meta: { title: 'Gig Manager | Create Gig' }
    },
    {
        name: 'Upcoming Gigs',
        path: '/gigs/upcoming',
        component: UpcomingGigs,
        meta: { title: 'Gig Manager | Upcoming Gigs' }
    },
    {
        name: 'Agencies',
        path: '/agencies',
        component: AllAgencies,
        meta: { title: 'Gig Manager | Agencies' }
    },
    {
        name: 'Venues',
        path: '/venues',
        component: AllVenues,
        meta: { title: 'Gig Manager | Venues' }
    },
    {
        name: 'Unconfirmed Gigs',
        path: '/gigs/unconfirmed',
        component: UnconfirmedGigs,
        meta: { title: 'Gig Manager | Unconfirmed Gigs' }
    },
    {
        name: 'Update Gig',
        path: '/gigs/update/:id',
        component: UpdateGig,
        meta: { title: 'Gig Manager | Update Gig' }
    },
    {
        name: 'Single Gig',
        path: '/gigs/:id',
        component: GigView,
        meta: { title: 'Gig Manager | View Gig' }
    },
    {
        name: 'Single Agency',
        path: '/agencies/:id',
        component: AgencyView,
        meta: { title: 'Gig Manager | View Agency' }
    },
    {
        name: 'Single Venue',
        path: '/venues/:id',
        component: VenueView,
        meta: { title: 'Gig Manager | View Venue' }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const title = to.meta.title
    const { cookies } = useCookies()
    const isLoggedIn = cookies.isKey('user_session')
    if (!isLoggedIn && to.name !== 'Landing Page') {
        return next({ name: 'Landing Page' })
    }
    if (title) document.title = title
    next()
})

export default router