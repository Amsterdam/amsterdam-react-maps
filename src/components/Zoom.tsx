import React, { memo } from 'react'
import styled from 'styled-components'
import { Button, themeSpacing, themeColor } from '@datapunt/asc-ui'
import { Minimise, Enlarge } from '@datapunt/asc-assets'
import { useMapInstance } from '@datapunt/react-maps'

const ZoomBar = styled.div`
  margin-bottom: ${themeSpacing(1)};
`

const ZoomButton = styled(Button)`
  outline: 2px solid rgb(0, 0, 0, 0.1);
  margin-top: 2px;

  & svg {
    path {
      fill: ${themeColor('tint', 'level6')};
    }
  }
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
      <ZoomButton
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
      <ZoomButton
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
