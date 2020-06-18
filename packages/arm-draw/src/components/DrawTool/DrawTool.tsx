/* eslint-disable no-underscore-dangle */
import React, { useEffect, useMemo, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import { ascDefaultTheme, themeColor } from '@datapunt/asc-ui'
import { v4 as uuidv4 } from 'uuid'
import L, { LayerEvent, LeafletKeyboardEvent } from 'leaflet'
import 'leaflet-draw'
import { useStateRef, icons } from '@datapunt/arm-core'
import { useMapInstance } from '@datapunt/react-maps'
import DrawToolBare from './DrawToolBare'
import { PolygonType, PolylineType, ExtendedLayer } from './types'

const { drawIcon } = icons

const GlobalStyle = createGlobalStyle`
  .leaflet-interactive.leaflet-mouse-marker {
    cursor: copy;
    
    &.leaflet-editing-icon {
      cursor: pointer;
    }
  }
`

const { tooltip: tooltipPolygon } = L.drawLocal.draw.handlers.polygon
const { tooltip: tooltipPolyline } = L.drawLocal.draw.handlers.polyline

tooltipPolygon.start = 'Klik op de kaart om te beginnen'
tooltipPolygon.cont = 'Klik op de kaart om een punt toe te voegen'
tooltipPolygon.end =
  'Klik op de kaart om verder te gaan of eindig met dubbelklik of klik op de eerste punt om te eindigen'

tooltipPolyline.start = 'Klik op de kaart om te meten'
tooltipPolyline.cont = 'Klik op de kaart om een lijn te maken'
tooltipPolyline.end =
  'Klik op de kaart om verder te gaan of klik op de laatste punt om te eindigen'

L.Edit.PolyVerticesEdit = L.Edit.PolyVerticesEdit.extend({
  options: {
    icon: drawIcon,
  },
})

type Props = {
  onDrawEnd?: (layer: ExtendedLayer) => void
  onToggle?: (showDrawTool: boolean) => void
  onDelete?: (layersInEditMode: Array<ExtendedLayer>) => void
  isOpen?: boolean
  drawnItem?: ExtendedLayer
  mapInstance?: L.DrawMap
}

const DrawTool: React.FC<Props> = ({
  onToggle,
  onDelete,
  onDrawEnd,
  isOpen,
  drawnItem,
  mapInstance: mapInstanceProp,
}) => {
  const [inEditMode, setInEditMode] = useState(false)
  const [inCreateMode, setInCreateMode, inCreateModeRef] = useStateRef(false)
  const [showDrawTool, setShowDrawTool] = useStateRef(isOpen || false)

  useEffect(() => {
    if (typeof isOpen !== 'undefined') {
      setShowDrawTool(isOpen)
    }
  }, [isOpen])

  const mapInstance = mapInstanceProp || (useMapInstance() as L.DrawMap)

  const drawnItems = useMemo(() => new L.FeatureGroup(), [])

  const createPolygon = (): null | void => {
    if (!mapInstance) {
      return null
    }
    const drawing = new L.Draw.Polygon(mapInstance, {
      shapeOptions: {
        color: themeColor('support', 'invalid')({ theme: ascDefaultTheme }),
        bubblingMouseEvents: false,
      },
      showLength: true,
      allowIntersection: false,
      showArea: true,
      metric: true,
      precision: {
        m: 1,
      },
      icon: drawIcon,
    })
    drawing.enable()
    setInCreateMode(true)
  }

  const createPolyline = (): null | void => {
    if (!mapInstance) {
      return null
    }
    const drawing = new L.Draw.Polyline(mapInstance, {
      showLength: true,
      shapeOptions: {
        color: themeColor('support', 'valid')({ theme: ascDefaultTheme }),
        bubblingMouseEvents: false,
      },
      icon: drawIcon,
    })
    drawing.enable()
    setInCreateMode(true)
  }

  const getLayersInEditMode = () => {
    const layers: ExtendedLayer[] = []

    drawnItems.eachLayer((layer) => {
      const typedLayer = layer as ExtendedLayer
      if (typedLayer.editing._enabled) {
        layers.push(typedLayer)
      }
    })

    return layers
  }

  const deleteDrawing = () => {
    const layersToDelete = getLayersInEditMode()
    layersToDelete.forEach((layer) => {
      drawnItems.removeLayer(layer)
    })
    if (onDelete) {
      onDelete(layersToDelete)
    }

    setInEditMode(false)
  }

  const exitEditMode = () => {
    setInEditMode(false)
    setInCreateMode(false)
    getLayersInEditMode().forEach((drawnLayer) => {
      if (drawnLayer.editing._enabled) {
        drawnLayer.editing.disable()
      }
    })
  }

  const handleDrawingClick = (event: LayerEvent) => {
    const { target } = event
    const { editing } = target
    if (editing._enabled) {
      exitEditMode()
    } else {
      setInEditMode(true)
      editing.enable()
    }
  }

  // End editing mode by clicking outside the map
  const handleClick = () => {
    if (!inCreateModeRef.current) {
      exitEditMode()
    }
  }

  const handleKeyDown = (e: LeafletKeyboardEvent) => {
    switch (e.originalEvent.key) {
      case 'Delete':
      case 'Backspace':
        deleteDrawing()
        break

      case 'Enter':
      case 'Escape':
        exitEditMode()
        break

      default:
    }
  }

  /**
   * Used to add layer to the draw map instance. This will do the following:
   * - Set a layer id
   * - Exit edit mode
   * - Add an event listener on the layer
   */
  const setDrawnItem = (layer: PolygonType | PolylineType) => {
    // eslint-disable-next-line no-param-reassign
    layer.id = uuidv4()
    exitEditMode()
    drawnItems.addLayer(layer)
    layer.on('click', handleDrawingClick)

    if (onDrawEnd) {
      onDrawEnd(layer)
    }
  }

  const onDrawCreated = (e: L.DrawEvents.Created) => {
    const layer = e.layer as PolygonType | PolylineType

    setDrawnItem(layer)
  }

  // Toggle drawing mode
  useEffect(() => {
    if (!mapInstance) {
      return
    }
    if (onToggle) {
      onToggle(showDrawTool)
    }

    if (showDrawTool) {
      mapInstance.addLayer(drawnItems)
    } else if (mapInstance.hasLayer(drawnItems)) {
      mapInstance.removeLayer(drawnItems)
    }
  }, [showDrawTool, mapInstance, onToggle])

  useEffect(() => {
    if (!mapInstance) {
      return
    }
    // @ts-ignore
    mapInstance.on(L.Draw.Event.CREATED, onDrawCreated)
    mapInstance.on('click', handleClick)
    mapInstance.on('keydown', handleKeyDown)

    return () => {
      if (mapInstance) {
        // @ts-ignore
        mapInstance.off(L.Draw.Event.CREATED, onDrawCreated)
        mapInstance.off('click', handleClick)
        mapInstance.off('keydown', handleKeyDown)
      }
    }
  }, [mapInstance])

  useEffect(() => {
    if (!mapInstance) {
      return
    }
    if (drawnItem) setDrawnItem(drawnItem)
  }, [mapInstance, drawnItem])

  return (
    <>
      <GlobalStyle />
      <DrawToolBare
        orientation="vertical-top"
        inEditMode={inEditMode}
        inDrawMode={inCreateMode}
        onToggle={setShowDrawTool}
        show={showDrawTool}
        onRemove={deleteDrawing}
        onStartPolygon={createPolygon}
        onStartPolyline={createPolyline}
      />
    </>
  )
}

export default DrawTool
