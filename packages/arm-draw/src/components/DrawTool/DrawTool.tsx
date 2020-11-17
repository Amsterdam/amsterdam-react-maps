/* eslint-disable no-underscore-dangle */
import { icons, useStateRef } from '@amsterdam/arm-core'
import { ascDefaultTheme, themeColor } from '@amsterdam/asc-ui'
import { useMapInstance } from '@amsterdam/react-maps'
import L, { LayerEvent, LeafletKeyboardEvent } from 'leaflet'
import 'leaflet-draw'
import React, { useEffect, useMemo, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import DrawToolControls from './DrawToolControls'
import { ExtendedLayer, PolygonType, PolylineType } from './types'

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
  onDrawStart?: (layer: ExtendedLayer) => void
  onDrawEnd?: (layer: ExtendedLayer) => void
  onInitLayers?: (layers: ExtendedLayer[]) => void
  onClose?: () => void
  onDelete?: (layersInEditMode: Array<ExtendedLayer>) => void
  isOpen?: boolean
  drawnItems?: Array<ExtendedLayer>
  drawnItemsGroup?: L.FeatureGroup
}

const DrawTool: React.FC<Props> = ({
  onDelete,
  onDrawStart,
  onDrawEnd,
  drawnItems,
  onInitLayers,
  drawnItemsGroup: drawnItemsGroupProp,
  onClose,
}) => {
  const [inEditMode, setInEditMode] = useState(false)
  const [inCreateMode, setInCreateMode, inCreateModeRef] = useStateRef(false)

  const mapInstance = useMapInstance() as L.DrawMap

  const drawnItemsGroup =
    drawnItemsGroupProp || useMemo(() => new L.FeatureGroup(), [])

  const createPolygon = (): null | void => {
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

    if (onDrawStart) {
      // @ts-ignore
      onDrawStart(drawing)
    }
  }

  const createPolyline = (): null | void => {
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

    if (onDrawStart) {
      // @ts-ignore
      onDrawStart(drawing)
    }
  }

  const getLayersInEditMode = () => {
    const layers: ExtendedLayer[] = []

    drawnItemsGroup.eachLayer((layer) => {
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
      drawnItemsGroup.removeLayer(layer)
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
    layer.id = layer.id || uuidv4()
    exitEditMode()
    drawnItemsGroup.addLayer(layer)
    layer.on('click', handleDrawingClick)

    if (onDrawEnd) {
      onDrawEnd(layer)
    }
  }

  const onDrawCreated = (e: L.DrawEvents.Created) => {
    const layer = e.layer as PolygonType | PolylineType
    setDrawnItem(layer)
  }

  useEffect(() => {
    // @ts-ignore
    mapInstance.on(L.Draw.Event.CREATED, onDrawCreated)
    mapInstance.on('click', handleClick)
    mapInstance.on('keydown', handleKeyDown)
    mapInstance.addLayer(drawnItemsGroup)

    return () => {
      // @ts-ignore
      mapInstance.off(L.Draw.Event.CREATED, onDrawCreated)
      mapInstance.off('click', handleClick)
      mapInstance.off('keydown', handleKeyDown)
      if (mapInstance.hasLayer(drawnItemsGroup)) {
        mapInstance.removeLayer(drawnItemsGroup)
      }
    }
  }, [])

  useEffect(() => {
    if (drawnItems && drawnItems.length) {
      drawnItems.forEach((drawnItem) => {
        setDrawnItem(drawnItem)
      })
      if (onInitLayers) {
        onInitLayers(drawnItems)
      }
    }
  }, [drawnItems])

  return (
    <>
      <GlobalStyle />
      <DrawToolControls
        orientation="vertical-top"
        inEditMode={inEditMode}
        inDrawMode={inCreateMode}
        onRemove={deleteDrawing}
        onStartPolygon={createPolygon}
        onStartPolyline={createPolyline}
        onClose={onClose}
      />
    </>
  )
}

export default DrawTool
