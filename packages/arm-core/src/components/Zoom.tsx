import { Enlarge, Minimise } from '@amsterdam/asc-assets'
import { themeSpacing } from '@amsterdam/asc-ui'
import { useMapInstance } from '@amsterdam/react-maps'
import React, { memo } from 'react'
import styled from 'styled-components'
import ControlButton from './ControlButton'

const ZoomBar = styled.div`
  margin-bottom: ${themeSpacing(1)};
`

const Zoom: React.FC = () => {
  const mapInstance = useMapInstance()

  const handleZoom = (out = false) => {
    mapInstance.setZoom(mapInstance.getZoom() + (out ? -1 : 1))
  }

  return (
    <ZoomBar>
      <ControlButton
        type="button"
        variant="blank"
        title="Inzoomen"
        size={44}
        iconSize={20}
        onClick={() => {
          handleZoom()
        }}
        icon={<Enlarge />}
      />
      <ControlButton
        type="button"
        variant="blank"
        title="Uitzoomen"
        size={44}
        iconSize={20}
        onClick={() => {
          handleZoom(true)
        }}
        icon={<Minimise />}
      />
    </ZoomBar>
  )
}

export default memo(Zoom)
