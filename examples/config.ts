import L, {
  PathOptions,
  StyleFunction,
  WMSOptions,
  GeoJSONOptions,
  LeafletMouseEvent,
  FeatureGroup,
  DomEvent,
  CircleMarkerOptions,
} from 'leaflet'
import { ZoomLevel } from '@datapunt/arm-core/lib/types'

interface Example {
  id: string
  url: string
  title: string
}

interface GeoJsonConfig<P = any> extends Example {
  style?: PathOptions | StyleFunction<P>
  activeStyle?: PathOptions
}

interface WfsConfig<P = any> extends Example {
  options?: GeoJSONOptions<P>
  zoomLevel: ZoomLevel
}

interface NonTiledConfig extends Example {
  options: WMSOptions
}

const MAP_API_ROOT = 'https://map.data.amsterdam.nl/'

const markerStyle: CircleMarkerOptions = {
  weight: 2,
  opacity: 1,
  dashArray: '3',
  color: '#ff0000',
  fillColor: '#ff7800',
  radius: 8,
}

const markerStyleActive: CircleMarkerOptions = {
  weight: 5,
  dashArray: '',
}

export const GEO_JSON_LAYER_EXAMPLES: GeoJsonConfig[] = [
  {
    title: 'Parkeervlakken',
    id: 'parkeerVlakken',
    url: `${MAP_API_ROOT}maps/parkeervakken?REQUEST=Getfeature&VERSION=1.1.0&SERVICE=wfs&TYPENAME=alle_parkeervakken&srsName=EPSG:4326&Filter=%3CFilter%3E%3CPropertyIsEqualTo%3E%3CPropertyName%3Ee_type%3C/PropertyName%3E%3CLiteral%3EE6a%3C/Literal%3E%3C/PropertyIsEqualTo%3E%3C/Filter%3E&count=10000&startindex=0&outputformat=geojson`,
    style: markerStyle,
    activeStyle: markerStyleActive,
  },
]

export const NON_TILED_LAYERS_EXAMPLES: NonTiledConfig[] = [
  {
    title: 'Kadastrale perceelsgrenzen: Kadastrale gemeente',
    id: 'brk:kgem',
    url: `${MAP_API_ROOT}maps/brk?bla=foo`,
    options: {
      id: 'kgem',
      format: 'image/png',
      transparent: true,
      layers: 'kadastrale_gemeente',
    },
  },
  {
    title: 'Kadastrale perceelsgrenzen: Burgerlijke gemeente',
    id: 'brk:bgem',
    url: `${MAP_API_ROOT}maps/brk`,
    options: {
      id: 'bgem',
      format: 'image/png',
      transparent: true,
      layers: 'burgerlijke_gemeente',
    },
  },
  {
    title: 'Meetbouten',
    id: 'mbs',
    url: `${MAP_API_ROOT}maps/meetbouten`,
    options: {
      id: 'mbs',
      format: 'image/png',
      transparent: true,
      layers: 'meetbouten_status',
    },
  },
]

export const WFS_LAYER_EXAMPLES: WfsConfig[] = [
  {
    title: 'Verblijfsobjecten (max level 13)',
    id: 'verblijfsobject',
    url: `${MAP_API_ROOT}maps/bag?REQUEST=Getfeature&VERSION=1.1.0&SERVICE=wfs&TYPENAME=ms:verblijfsobject&srsName=EPSG:4326&outputformat=geojson`,
    options: {
      onEachFeature: (feature, layer) => {
        layer.bindPopup(
          `<p>Id: ${feature.properties.id}</p><p>Display: ${feature.properties.display}</p>`,
        )
        layer.on('click', (e: LeafletMouseEvent) => {
          DomEvent.stopPropagation(e)
          layer.openPopup()
          ;(e.target as FeatureGroup).setStyle(markerStyleActive)
        })
      },
      pointToLayer: (feature, latlng) => {
        return L.circleMarker(latlng, markerStyle)
      },
    },
    zoomLevel: { max: 13 },
  },
  {
    title: 'Panden (max level 15)',
    id: 'pand',
    url: `${MAP_API_ROOT}maps/bag?REQUEST=Getfeature&VERSION=1.1.0&SERVICE=wfs&TYPENAME=ms:pand&srsName=EPSG:4326&outputformat=geojson`,
    options: {
      style: markerStyle,
      onEachFeature: (feature, layer) => {
        layer.bindPopup(
          `<p>Id: ${feature.properties.id}</p><p>Display: ${feature.properties.type}</p>`,
        )
        layer.on('click', (e: LeafletMouseEvent) => {
          DomEvent.stopPropagation(e)
          layer.openPopup()
          ;(e.target as FeatureGroup).setStyle(markerStyleActive)
        })
      },
    },
    zoomLevel: { max: 15 },
  },
]
