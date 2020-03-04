import { RouteProps } from 'react-router-dom'
import IndexPage from './IndexPage'
import MapLayers from './pages/MapLayers'
import PointClick from './pages/PointClick'
import MapBaseLayers from './pages/MapBaseLayers'
import Geocoder from './pages/Geocoder'
import GeojsonWfs from './pages/GeojsonWfs'

const AppRoutes: { [key: string]: RouteProps } = {
  INDEX: { path: '/', component: IndexPage, exact: true },
  MAP_LAYERS: { path: '/map-layers', component: MapLayers, exact: true },
  POINT_CLICK: { path: '/point-click', component: PointClick, exact: true },
  BASE_LAYERS: {
    path: '/map-base-layers',
    component: MapBaseLayers,
    exact: true,
  },
  GEOCODER: {
    path: '/geocoder',
    component: Geocoder,
  },
  GEOJSON_WFS: {
    path: '/geojson-wfs',
    component: GeojsonWfs,
  },
}

export default AppRoutes
