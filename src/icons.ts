import L from 'leaflet'
// @ts-ignore
import defaultMarker from './assets/icons/default-marker.svg'

export const defaultIcon = L.icon({
  iconUrl: defaultMarker,
  iconSize: [40, 40],
  iconAnchor: [20, 39],
})

export const drawIcon = new L.DivIcon({
  iconSize: new L.Point(15, 15),
  className: 'leaflet-div-icon leaflet-editing-icon ',
})
