import React, { useCallback, useEffect, useMemo, useState } from 'react'
import MapPanelContext, { Variant } from './MapPanelContext'
import {
  MAP_PANEL_DRAWER_SNAP_POSITIONS,
  MAP_PANEL_SNAP_POSITIONS,
  SnapPoint,
} from './constants'

type Props = {
  initialPosition: SnapPoint
  variant: Variant
}

const MapPanelProvider: React.FC<Props> = ({
  initialPosition,
  variant,
  children,
}) => {
  const mapper =
    variant === 'panel'
      ? MAP_PANEL_SNAP_POSITIONS
      : MAP_PANEL_DRAWER_SNAP_POSITIONS
  const [drawerPositionRaw, setDrawerPosition] = useState<string | number>(
    mapper[initialPosition],
  )

  useEffect(() => {
    setDrawerPosition(mapper[initialPosition])
  }, [mapper])

  const [draggable, setDraggable] = useState(false)
  const drawerPosition = useMemo(
    () =>
      typeof drawerPositionRaw === 'number'
        ? `${drawerPositionRaw}px`
        : drawerPositionRaw,
    [drawerPositionRaw],
  )

  const setPositionFromSnapPoint = (snapPoint: SnapPoint) => {
    setDrawerPosition(mapper[snapPoint])
  }

  const matchPositionWithSnapPoint = useCallback(
    (snapPoint: SnapPoint) => drawerPosition === mapper[snapPoint],
    [mapper, drawerPosition],
  )

  return (
    <MapPanelContext.Provider
      value={{
        setDrawerPosition,
        drawerPosition,
        draggable,
        setDraggable,
        matchPositionWithSnapPoint,
        setPositionFromSnapPoint,
        variant,
      }}
    >
      {children}
    </MapPanelContext.Provider>
  )
}

export default MapPanelProvider
