import { MapOptions } from 'leaflet'
import { getCrsRd } from './utils'

// eslint-disable-next-line import/prefer-default-export
export const DEFAULT_AMSTERDAM_MAPS_OPTIONS: MapOptions = {
  center: [52.3731081, 4.8932945],
  zoom: 10,
  maxZoom: 16,
  minZoom: 3,
  crs: getCrsRd(),
  maxBounds: [
    [52.25168, 4.64034],
    [52.50536, 5.10737],
  ],
}

export const DEFAULT_AMSTERDAM_LAYERS = {
  normal: 'https://acc.t{s}.data.amsterdam.nl/topo_rd/{z}/{x}/{y}.png',
  light: 'https://acc.t{s}.data.amsterdam.nl/topo_rd_light/{z}/{x}/{y}.png',
  blackWhite: 'https://acc.t{s}.data.amsterdam.nl/topo_rd_zw/{z}/{x}/{y}.png',
}
