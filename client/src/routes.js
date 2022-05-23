import UserPage from './pages/UserPage'
import AdvertisementPage from './pages/AdvertisementPage'
import AdvertisementsSummaries from './pages/AdvertisementsSummaries'
import Registration from './pages/Registration'
import Login from './pages/Login'
import SummaryPage from './pages/SummaryPage'
import { ADVERTISMENTS_AND_SUMMARIES_ROUTE, ADVERTISMENT_PAGE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, USER_SUMMARY_ROUTE, USER_ADVERTISEMENT_ROUTE, USER_ROUTE, SUMMARY_PAGE_ROUTE, USER_ADVERTISEMENT_CREATE_ROUTE, USER_RESPONDER_SUMMARY_PAGE, USER_RESPONDER_ADVERTISEMENT_LIST} from './utils/const'
import UserSummaryPage from './pages/UserSummaryPage'
import UserAdvertisementPage from './pages/UserAdvertisementPage'
import UserAdvertisementCreatePage from './pages/UserAdvertisementCreatePage'
import ResponderSummaryPage from './pages/ResponderSummaryPage'
import ResponderAdvertisementList from './pages/ResponderAdvertisementList'


export const authRoutes = [
    {
        path: USER_ROUTE + '/:id',
        Component: UserPage
    },
    {
        path: USER_SUMMARY_ROUTE + '/:id',
        Component: UserSummaryPage
    },
    {
        path: USER_ADVERTISEMENT_ROUTE + '/:id',
        Component: UserAdvertisementPage
    },
    {
        path: USER_RESPONDER_SUMMARY_PAGE + '/:id',
        Component: ResponderSummaryPage
    },
    {
        path: USER_RESPONDER_ADVERTISEMENT_LIST + '/:id',
        Component: ResponderAdvertisementList
    },
    {
        path: USER_ADVERTISEMENT_CREATE_ROUTE + '/:id',
        Component: UserAdvertisementCreatePage
    },
]

export const publicRoutes = [
    {
        path: ADVERTISMENTS_AND_SUMMARIES_ROUTE,
        Component: AdvertisementsSummaries
    },
    {
        path: ADVERTISMENT_PAGE_ROUTE + '/:id',
        Component: AdvertisementPage
    },
    {
        path: SUMMARY_PAGE_ROUTE + '/:id',
        Component: SummaryPage
    },
]

export const notAuthRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    {
        path: LOGIN_ROUTE,
        Component: Login
    }
]