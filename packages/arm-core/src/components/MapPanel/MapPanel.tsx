import React, { useContext } from 'react'
import styled from 'styled-components'
import { Button } from '@datapunt/asc-ui'
import { ChevronRight, ChevronLeft } from '@datapunt/asc-assets'
import MapPanelContext from './MapPanelContext'
import { OPEN_LEGEND_TITLE, SnapPoint } from './constants'

const Handle = styled(Button)`
  width: 30px;
  height: 100%;
  pointer-events: all;
  z-index: 1;
  flex-shrink: 0;

  &&:focus {
    outline: none;
  }
`

const MapPanelStyle = styled.div`
  display: flex;
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  z-index: 401;
  overflow: hidden;
`

const MapPanelContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
`

const MapPanel: React.FC = ({ children, ...otherProps }) => {
  const {
    drawerPosition,
    setPositionFromSnapPoint,
    matchPositionWithSnapPoint,
  } = useContext(MapPanelContext)

  const isMapPanelOpen = matchPositionWithSnapPoint(SnapPoint.Halfway)
  const handleDrawerPosition = () => {
    setPositionFromSnapPoint(
      isMapPanelOpen ? SnapPoint.Closed : SnapPoint.Halfway,
    )
  }
  return (
    <MapPanelStyle style={{ width: drawerPosition }} {...otherProps}>
      <MapPanelContent>{children}</MapPanelContent>
      <Handle
        type="button"
        variant="blank"
        title={OPEN_LEGEND_TITLE}
        size={32}
        iconSize={20}
        icon={isMapPanelOpen ? <ChevronLeft /> : <ChevronRight />}
        onClick={handleDrawerPosition}
      />
    </MapPanelStyle>
  )
}

export default MapPanel
