import { RouteProps } from 'react-router-dom'
import IndexPage from './IndexPage'
import MapLayers from './pages/MapLayers'
import PointClick from './pages/PointClick'
import MapBaseLayers from './pages/MapBaseLayers'
import MapWithDrawTool from './pages/MapWithDrawTool'
import MarkerClustering from './pages/MarkerClustering'

const AppRoutes: { [key: string]: RouteProps } = {
  INDEX: { path: '/', component: IndexPage, exact: true },
  MAP_LAYERS: { path: '/map-layers', component: MapLayers, exact: true },
  POINT_CLICK: { path: '/point-click', component: PointClick, exact: true },
  BASE_LAYERS: {
    path: '/map-base-layers',
    component: MapBaseLayers,
    exact: true,
  },
  DRAW: {
    path: '/draw',
    component: MapWithDrawTool,
    exact: true,
  },
  MARKER_CLUSTERING: {
    path: '/marker-clustering',
    component: MarkerClustering,
    exact: true,
  },
}

export default AppRoutes
