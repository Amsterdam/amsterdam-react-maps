import { MapOptions } from 'leaflet'
import getCrsRd from './utils/getCrsRd'

export const DEFAULT_AMSTERDAM_MAPS_OPTIONS: MapOptions = {
  center: [52.3731081, 4.8932945],
  zoom: 10,
  maxZoom: 16,
  minZoom: 3,
  zoomControl: false,
  crs: getCrsRd(),
  maxBounds: [
    [52.25168, 4.64034],
    [52.50536, 5.10737],
  ],
}

export type MapLayer = {
  id: string
  label: string
  urlTemplate: string
}

const MAP_SERVER_ROOT = 'https://{s}.data.amsterdam.nl'

export const DEFAULT_AMSTERDAM_LAYERS: MapLayer[] = [
  {
    id: 'normal',
    label: 'Normaal',
    urlTemplate: `${MAP_SERVER_ROOT}/topo_rd/{z}/{x}/{y}.png`,
  },
  {
    id: 'light',
    label: 'Licht',
    urlTemplate: `${MAP_SERVER_ROOT}/topo_rd_light/{z}/{x}/{y}.png`,
  },
  {
    id: 'blackwhite',
    label: 'Zwart / Wit',
    urlTemplate: `${MAP_SERVER_ROOT}/topo_rd_zw/{z}/{x}/{y}.png`,
  },
]

export const AERIAL_AMSTERDAM_LAYERS: MapLayer[] = [
  {
    id: 'lf2019',
    label: 'Luchtfoto 2019',
    urlTemplate: `${MAP_SERVER_ROOT}/lufo2019_RD/{z}/{x}/{y}.jpeg`,
  },
  {
    id: 'lf2018',
    label: 'Luchtfoto 2018',
    urlTemplate: `${MAP_SERVER_ROOT}/lufo2018_RD/{z}/{x}/{y}.jpeg`,
  },
  {
    id: 'ir2018',
    label: 'Infrarood 2018',
    urlTemplate: `${MAP_SERVER_ROOT}/infrarood2018_RD/{z}/{x}/{y}.jpeg`,
  },
  {
    id: 'lf2017',
    label: 'Luchtfoto 2017',
    urlTemplate: `${MAP_SERVER_ROOT}/lufo2017_RD/{z}/{x}/{y}.jpeg`,
  },
  {
    id: 'lf2016',
    label: 'Luchtfoto 2016',
    urlTemplate: `${MAP_SERVER_ROOT}/lufo2016_RD/{z}/{x}/{y}.jpeg`,
  },
  {
    id: 'lf2015',
    label: 'Luchtfoto 2015',
    urlTemplate: `${MAP_SERVER_ROOT}/lufo2015_RD/{z}/{x}/{y}.jpeg`,
  },
  {
    id: 'lf2014',
    label: 'Luchtfoto 2014',
    urlTemplate: `${MAP_SERVER_ROOT}/lufo2014_RD/{z}/{x}/{y}.jpeg`,
  },
  {
    id: 'lf2013',
    label: 'Luchtfoto 2013',
    urlTemplate: `${MAP_SERVER_ROOT}/lufo2013_RD/{z}/{x}/{y}.jpeg`,
  },
  {
    id: 'lf2012',
    label: 'Luchtfoto 2012',
    urlTemplate: `${MAP_SERVER_ROOT}/lufo2012_RD/{z}/{x}/{y}.jpeg`,
  },
  {
    id: 'lf2011',
    label: 'Luchtfoto 2011',
    urlTemplate: `${MAP_SERVER_ROOT}/lufo2011_RD/{z}/{x}/{y}.jpeg`,
  },
  {
    id: 'lf2010',
    label: 'Luchtfoto 2010',
    urlTemplate: `${MAP_SERVER_ROOT}/lufo2010_RD/{z}/{x}/{y}.jpeg`,
  },
  {
    id: 'lf2009',
    label: 'Luchtfoto 2009',
    urlTemplate: `${MAP_SERVER_ROOT}/lufo2009_RD/{z}/{x}/{y}.jpeg`,
  },
  {
    id: 'lf2008',
    label: 'Luchtfoto 2008',
    urlTemplate: `${MAP_SERVER_ROOT}/lufo2008_RD/{z}/{x}/{y}.jpeg`,
  },
  {
    id: 'lf2007',
    label: 'Luchtfoto 2007',
    urlTemplate: `${MAP_SERVER_ROOT}/lufo2007_RD/{z}/{x}/{y}.jpeg`,
  },
  {
    id: 'lf2006',
    label: 'Luchtfoto 2006',
    urlTemplate: `${MAP_SERVER_ROOT}/lufo2006_RD/{z}/{x}/{y}.jpeg`,
  },
  {
    id: 'lf2005',
    label: 'Luchtfoto 2005',
    urlTemplate: `${MAP_SERVER_ROOT}/lufo2005_RD/{z}/{x}/{y}.jpeg`,
  },
  {
    id: 'lf2004',
    label: 'Luchtfoto 2004',
    urlTemplate: `${MAP_SERVER_ROOT}/lufo2004_RD/{z}/{x}/{y}.jpeg`,
  },
  {
    id: 'lf2003',
    label: 'Luchtfoto 2003',
    urlTemplate: `${MAP_SERVER_ROOT}/lufo2003_RD/{z}/{x}/{y}.jpeg`,
  },
]

export const ENDPOINTS = {
  geocoder:
    'https://api.data.amsterdam.nl/bag/nummeraanduiding/?format=json&locatie=',
}

/**
 * Minimum and maximum possible zoom levels for maps
 *
 */
export const MIN_ZOOM_LEVEL = 22
export const MAX_ZOOM_LEVEL = 0
