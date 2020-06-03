import React from 'react'
import styled from 'styled-components'
import { ViewerContainer } from '@datapunt/asc-ui'
import { components } from '@datapunt/arm-core'
import PointClickResults from '../components/PointClickResults'

const { Zoom, BaseLayer, Map } = components

const StyledViewerContainer = styled(ViewerContainer)`
  z-index: 400;
`

const PointClick: React.FC = () => {
  return (
    <Map>
      <StyledViewerContainer
        topRight={<PointClickResults />}
        bottomRight={<Zoom />}
      />
      <BaseLayer />
    </Map>
  )
}

export default PointClick
