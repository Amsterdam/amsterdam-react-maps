import React, { useState, useRef, useMemo } from 'react'
import 'leaflet/dist/leaflet.css'
import { Map, TileLayer } from '@datapunt/react-maps'
import { ViewerContainer } from '@datapunt/asc-ui'
import Controls from '../Zoom'
import { utils } from '../../../src'
import WfsLayer from '../WfLayer'

const GeojsonWfsPage = () => {
  const [bbox, setBBox] = useState()

  const mapRef = useRef(null)

  return (
    <Map
      ref={mapRef}
      events={{
        click: async e => {
          console.log('click', e.target)
        },
        layeradd: e => {
          console.log('layer add', e)
        },
        moveend: e => {
          console.log('moveend', e.target.getCenter())
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
      style={{
        width: '100%',
        height: '100vh',
      }}
    >
      <ViewerContainer
        // @ts-ignore
        style={{ zIndex: 400 }}
        bottomRight={<Controls />}
      />
      <TileLayer
        args={['https://{s}.data.amsterdam.nl/topo_rd/{z}/{x}/{y}.png']}
        options={{
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
      />
    </Map>
  )
}

export default GeojsonWfsPage
