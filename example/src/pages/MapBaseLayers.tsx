import React from 'react'
import styled from 'styled-components'
import { ViewerContainer } from '@datapunt/asc-ui'
import Controls from '../../../src/components/Zoom'
import Map from '../../../src/components/Map'
import BaseLayerToggle from '../../../src/components/BaseLayerToggle'

const StyledViewerContainer = styled(ViewerContainer)`
  height: 100vh;
  z-index: 400;
`

const MapBaseLayers: React.FC = () => (
  <Map fullScreen>
    <StyledViewerContainer
      bottomLeft={<BaseLayerToggle />}
      bottomRight={<Controls />}
    />
  </Map>
)

export default MapBaseLayers
