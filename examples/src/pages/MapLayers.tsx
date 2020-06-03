import React from 'react'
import { TileLayer } from '@datapunt/react-maps'
import styled from 'styled-components'
import { ViewerContainer } from '@datapunt/asc-ui'
import { constants, components } from '@datapunt/arm-core'
import MapLayersPanel from '../components/MapLayersPanel'

const { Map, Zoom } = components

const StyledViewerContainer = styled(ViewerContainer)`
  z-index: 400;
`

const MapLayers: React.FC = () => (
  <Map fullScreen>
    <StyledViewerContainer
      bottomRight={<Zoom />}
      bottomLeft={<MapLayersPanel />}
    />
    <TileLayer
      args={[constants.DEFAULT_AMSTERDAM_LAYERS[0].urlTemplate]}
      options={{
        subdomains: ['1', '2', '3', '4'],
        tms: true,
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }}
    />
  </Map>
)

export default MapLayers
