import * as constants from './constants'
import * as icons from './icons'
import {
  GeoJSON,
  useMapInstance,
  useMapEvents,
  useEvents,
} from '@amsterdam/react-maps'

const AMSTERDAM_MAPS_OPTIONS = constants.DEFAULT_AMSTERDAM_MAPS_OPTIONS
const AMSTERDAM_LAYERS = constants.DEFAULT_AMSTERDAM_LAYERS
const MIN_ZOOM_LEVEL = constants.MIN_ZOOM_LEVEL
const MAX_ZOOM_LEVEL = constants.MAX_ZOOM_LEVEL
const AERIAL_AMSTERDAM_LAYERS = constants.AERIAL_AMSTERDAM_LAYERS

export { default as BaseLayer } from './components/BaseLayer'
export { default as BaseLayerToggle } from './components/BaseLayerToggle'
export { default as ControlButton } from './components/ControlButton'
export { default as GeoJSONLayer } from './components/GeoJSONLayer'
export { default as Map } from './components/Map'
export * from './components/MapPanel'
export { default as Marker } from './components/Marker'
export {
  default as RDGeoJSON,
  defaultStyle as rdGeoJSONDefaultStyle,
} from './components/RDGeoJSON'
export { default as Scale } from './components/Scale'
export { default as ViewerContainer } from './components/ViewerContainer'
export { default as WfsLayer } from './components/WfsLayer'
export { default as Zoom } from './components/Zoom'
export { default as fetchWithAbort } from './utils/fetchWithAbort'
export { default as getBBox } from './utils/getBBox'
export { default as getCrsRd } from './utils/getCrsRd'
export { default as useGetAddressFromLatLng } from './utils/useGetAddressFromLatLng'
export { default as usePanToLatLng } from './utils/usePanToLatLng'
export { default as useStateRef } from './utils/useStateRef'
export { constants, icons }
export { GeoJSON, useMapInstance, useMapEvents, useEvents }

export {
  AMSTERDAM_MAPS_OPTIONS,
  AMSTERDAM_LAYERS,
  AERIAL_AMSTERDAM_LAYERS,
  MIN_ZOOM_LEVEL,
  MAX_ZOOM_LEVEL,
}
