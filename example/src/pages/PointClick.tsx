import React from 'react'
import { Map } from '@datapunt/react-maps'
import styled from 'styled-components'
import { ViewerContainer } from '@datapunt/asc-ui'
import Controls from '../../../src/components/Zoom'
import { constants } from '../../../src'
import PointClickResults from '../components/PointClickResults'
import BaseLayer from '../../../src/components/BaseLayer'

const StyledMap = styled(Map)`
  width: 100%;
  height: 100vh;
`

const StyledViewerContainer = styled(ViewerContainer)`
  z-index: 400;
`

const PointClick: React.FC = () => {
  return (
    <StyledMap
      options={{
        ...constants.DEFAULT_AMSTERDAM_MAPS_OPTIONS,
      }}
    >
      <StyledViewerContainer
        topRight={<PointClickResults />}
        bottomRight={<Controls />}
      />
      <BaseLayer />
    </StyledMap>
  )
}

export default PointClick
