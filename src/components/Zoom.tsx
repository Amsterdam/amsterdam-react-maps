import React, { memo } from 'react'
import styled from 'styled-components'
import { themeSpacing } from '@datapunt/asc-ui'
import { Minimise, Enlarge } from '@datapunt/asc-assets'
import { useMapInstance } from '@datapunt/react-maps'
import ControlButton from './ControlButton'

const ZoomBar = styled.div`
  margin-bottom: ${themeSpacing(1)};
`

const Zoom: React.FC = () => {
  const mapInstance = useMapInstance()

  const handleZoom = (out = false) => {
    if (mapInstance !== null) {
      mapInstance.setZoom(mapInstance.getZoom() + (out ? -1 : 1))
    }
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
