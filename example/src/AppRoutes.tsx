import HomePage from './Pages/HomePage'
import GeocoderPage from './Pages/GeocoderPage'

const AppRoutes = {
  HOME: { path: '/', component: HomePage, exact: true },
  GEOCODER: {
    path: '/geocoder',
    component: GeocoderPage,
  },
}

export default AppRoutes
