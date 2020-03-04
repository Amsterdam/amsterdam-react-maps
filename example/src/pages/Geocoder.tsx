import React from 'react'
import 'leaflet/dist/leaflet.css'
import { Map, TileLayer } from '@datapunt/react-maps'
import { ViewerContainer } from '@datapunt/asc-ui'
import Controls from '../Zoom'
import { utils } from '../../../src'
import NonTiledLayer from '../NonTiledLayer'
import Geocoder, { getSuggestions, getAddressById } from '../Geocoder'

const geocoderProps = {
  getSuggestions,
  getAddressById,
}

const GeocoderPage = () => {
  return (
    <Map
      options={{
        center: [52.3731081, 4.8932945],
        zoom: 10,
        crs: utils.getCrsRd(),
        maxBounds: [
          [52.25168, 4.64034],
          [52.50536, 5.10737],
        ],
      }}
      style={{
        width: '100%',
        height: '100vh',
      }}
    >
      <ViewerContainer
        // @ts-ignore
        style={{ zIndex: 400 }}
        topLeft={<Geocoder {...geocoderProps} />}
        bottomRight={<Controls />}
      />
      <TileLayer
        args={['https://{s}.data.amsterdam.nl/topo_rd/{z}/{x}/{y}.png']}
        options={{
          subdomains: ['acc.t1', 'acc.t2', 'acc.t3', 'acc.t4'],
          tms: true,
          attribution: 'Kaartgegevens CC-BY-4.0 Gemeente Amsterdam',
        }}
      />
      <NonTiledLayer
        {...{
          id: 'kgem',
          url: 'https://acc.map.data.amsterdam.nl/maps/brk',
          identify: false,
          format: 'image/png',
          transparent: true,
          layers: ['kadastrale_gemeente', 'kadastrale_gemeente_label'],
        }}
      />
    </Map>
  )
}

export default GeocoderPage
