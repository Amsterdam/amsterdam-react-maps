import HomePage from './Pages/HomePage'
import GeocoderPage from './Pages/GeocoderPage'
import GeojsonWfsPage from './Pages/GeojsonWfsPage'

const AppRoutes = {
  HOME: { path: '/', component: HomePage, exact: true },
  GEOCODER: {
    path: '/geocoder',
    component: GeocoderPage,
  },
  GEOJSON_WFS: {
    path: '/geojson-wfs',
    component: GeojsonWfsPage,
  },
}

export default AppRoutes
