import { themeColor } from '@amsterdam/asc-ui'
import React, { RefObject, useContext, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import {
  OPEN_LEGEND_TITLE,
  PANEL_HANDLE_HEIGHT,
  PANEL_HANDLE_PADDING,
  SnapPoint,
  SNAP_OFFSET,
} from './constants'
import MapPanelContext from './MapPanelContext'

const Handle = styled.button.attrs({
  type: 'button',
})`
  position: relative;
  width: 100%;
  height: ${PANEL_HANDLE_HEIGHT + PANEL_HANDLE_PADDING}px;
  padding-bottom: ${PANEL_HANDLE_PADDING}px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  // FF button overrides
  background-color: transparent;
  border: none;
  &:before {
    content: '';
    display: block;
    width: 200px;
    height: 4px;
    border-radius: 3px;
    background-color: ${themeColor('tint', 'level4')};
  }
`

type MapPanelDrawerProps = {
  ignoreTransition: boolean
}

const MapPanelDrawerStyle = styled.div<MapPanelDrawerProps>`
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: absolute;
  z-index: 1000;
  touch-action: manipulation;
  pointer-events: all;
  ${({ ignoreTransition }) =>
    !ignoreTransition &&
    css`
      transition: top 0.3s ease-in-out;
    `}
`

const MapPanelDrawerWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
`

const MapPanelDrawerContentWrapper = styled.div`
  position: relative;
  height: 100%;
`

export const getBoundingClientRect = (
  ref: RefObject<HTMLDivElement>,
): DOMRect | null => ref?.current?.getBoundingClientRect() ?? null

const MapPanelDrawer: React.FC = ({ children, ...otherProps }) => {
  const [initialDragPosition, setInitialDragPosition] = useState(0)

  const {
    setDrawerPosition,
    drawerPosition,
    draggable,
    setDraggable,
    setPositionFromSnapPoint,
    matchPositionWithSnapPoint,
    topOffset,
  } = useContext(MapPanelContext)

  const MapDrawerRef = useRef<HTMLDivElement>(null)

  const handleOnClick = () => {
    if (matchPositionWithSnapPoint(SnapPoint.Closed)) {
      setPositionFromSnapPoint(SnapPoint.Halfway)
    }
  }

  const startDragging = (e: React.TouchEvent) => {
    const rect = MapDrawerRef.current
      ? getBoundingClientRect(MapDrawerRef)
      : null

    if (rect) {
      setInitialDragPosition(e.touches[0].clientY - rect.top)
    }

    setDraggable(true)
  }

  const stopDragging = () => {
    setDraggable(false)

    if (MapDrawerRef.current) {
      const rect = getBoundingClientRect(MapDrawerRef)

      if (!rect) {
        return
      }

      const middleTopLimit = (window.innerHeight / 2) * SNAP_OFFSET // times 0.x
      const middleBottomLimit = (window.innerHeight / 2) * (1 + SNAP_OFFSET) // times 1.x

      if (rect.top < middleBottomLimit && rect.top > middleTopLimit) {
        setPositionFromSnapPoint(SnapPoint.Halfway)
      } else if (rect.top < middleTopLimit) {
        setPositionFromSnapPoint(SnapPoint.Full)
      } else if (rect.top > middleBottomLimit) {
        setPositionFromSnapPoint(SnapPoint.Closed)
      }
    }
  }

  const handleMouseMove = (event: React.TouchEvent) => {
    if (draggable && MapDrawerRef.current) {
      const newPosition = event.touches[0].clientY - initialDragPosition
      const limit =
        window.innerHeight - MapDrawerRef.current.clientHeight - newPosition
      if (limit < 0) {
        setDrawerPosition(newPosition - topOffset)
      }
    }
  }

  return (
    <MapPanelDrawerWrapper onTouchMoveCapture={handleMouseMove} {...otherProps}>
      <MapPanelDrawerStyle
        ignoreTransition={draggable}
        ref={MapDrawerRef}
        style={{
          top: drawerPosition,
        }}
      >
        <Handle
          title={OPEN_LEGEND_TITLE}
          onClick={handleOnClick}
          onTouchStart={startDragging}
          onTouchEnd={stopDragging}
        />
        <MapPanelDrawerContentWrapper>{children}</MapPanelDrawerContentWrapper>
      </MapPanelDrawerStyle>
    </MapPanelDrawerWrapper>
  )
}

export default MapPanelDrawer
