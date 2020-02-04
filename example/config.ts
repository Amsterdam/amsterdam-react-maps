import { PathOptions, StyleFunction, WMSOptions } from 'leaflet'

interface Example {
  id: string
  url: string
  title: string
}

interface GeoJsonConfig<P = any> extends Example {
  style?: PathOptions | StyleFunction<P>
  activeStyle?: PathOptions
}

interface NonTiledConfig extends Example {
  options: WMSOptions
}

const MAP_API_ROOT = 'https://map.data.amsterdam.nl/'

export const GEO_JSON_LAYER_EXAMPLES: GeoJsonConfig[] = [
  {
    title: 'Parkeervlakken',
    id: 'parkeerVlakken',
    url: `${MAP_API_ROOT}maps/parkeervakken?REQUEST=Getfeature&VERSION=1.1.0&SERVICE=wfs&TYPENAME=alle_parkeervakken&srsName=EPSG:4326&Filter=%3CFilter%3E%3CPropertyIsEqualTo%3E%3CPropertyName%3Ee_type%3C/PropertyName%3E%3CLiteral%3EE6a%3C/Literal%3E%3C/PropertyIsEqualTo%3E%3C/Filter%3E&count=10000&startindex=0&outputformat=geojson`,
    style: () => ({
      weight: 2,
      opacity: 1,
      dashArray: '3',
      color: '#ff0000',
    }),
    activeStyle: {
      weight: 5,
      dashArray: '',
    },
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
