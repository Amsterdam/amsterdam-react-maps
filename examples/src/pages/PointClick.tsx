import React from 'react'
import styled from 'styled-components'
import { ViewerContainer } from '@datapunt/asc-ui'
import { Zoom, BaseLayer, Map } from '@datapunt/arm-core'
import PointClickResults from '../components/PointClickResults'

const StyledViewerContainer = styled(ViewerContainer)`
  z-index: 400;
`

const PointClick: React.FC = () => {
  return (
    <Map fullScreen>
      <StyledViewerContainer
        topRight={<PointClickResults />}
        bottomRight={<Zoom />}
      />
      <BaseLayer />
    </Map>
  )
}

export default PointClick
