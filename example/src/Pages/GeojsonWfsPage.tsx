import React, { useState, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import { Map, TileLayer } from '@datapunt/react-maps'
import { ViewerContainer } from '@datapunt/asc-ui'
import Controls from '../Zoom'
import { utils } from '../../../src'
import WfsLayer from '../WfLayer'
import defaultMapStyle from './styles'

export const WFS_ENDPOINT = 'https://map.data.amsterdam.nl/maps/parkeervakken'

const GeojsonWfsPage = () => {
  const [bbox, setBBox] = useState()

  const mapRef = useRef(null)

  return (
    <Map
      ref={mapRef}
      events={{
        moveend: e => {
          // This triggers the refresh of the layer
          setBBox(e.target.getCenter())
        },
      }}
      options={{
        center: [52.3731081, 4.8932945],
        zoom: 12,
        crs: utils.getCRS(),
        maxBounds: [
          [52.25168, 4.64034],
          [52.50536, 5.10737],
        ],
      }}
      style={defaultMapStyle}
    >
      <ViewerContainer
        // @ts-ignore
        style={{ zIndex: 400 }}
        bottomRight={<Controls />}
      />
      <TileLayer
        args={['https://{s}.data.amsterdam.nl/topo_rd/{z}/{x}/{y}.png']}
        options={{
          // TODO: use here the acc version of the tiles when the server is fixed
          // subdomains: ['acc.t1', 'acc.t2', 'acc.t3', 'acc.t4'],
          subdomains: ['t1', 't2', 't3', 't4'],
          tms: true,
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }}
      />
      <WfsLayer
        {...{
          bbox,
        }}
        serviceUrl={WFS_ENDPOINT}
        params={{ typeName: 'fiscaal_parkeervakken' }}
        zoomLevel={{ min: 14, max: 22 }}
      />
    </Map>
  )
}

export default GeojsonWfsPage
