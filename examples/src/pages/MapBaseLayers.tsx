import React from 'react'
import styled from 'styled-components'
import { ViewerContainer } from '@datapunt/asc-ui'
import { components } from '@datapunt/arm-core'

const { Map, BaseLayerToggle, Zoom } = components

const StyledViewerContainer = styled(ViewerContainer)`
  height: 100vh;
  z-index: 400;
`

const MapBaseLayers: React.FC = () => (
  <Map fullScreen>
    <StyledViewerContainer
      bottomLeft={<BaseLayerToggle />}
      bottomRight={<Zoom />}
    />
  </Map>
)

export default MapBaseLayers
