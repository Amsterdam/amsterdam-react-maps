import { memo, useEffect, useRef, useCallback, useState } from 'react'
import { useMapInstance } from '@datapunt/react-maps'
import L from 'leaflet'
import {
  hoverStyleLayer,
  defaultStyleLayer,
  hoverStyleSelection,
  defaultStyleSelection,
} from './styles'
import { wfsParameters } from './constants'
import useZoomRange from '../../../src/hooks/useZoomRange'
import { MinMax } from '../../../src/types'

export interface Props {
  bbox: any
  serviceUrl: string
  params: object
  options?: any
  zoomLevel: Partial<MinMax>
}

const WfsLayer: React.FC<Props> = ({ bbox, serviceUrl, zoomLevel, params }) => {
  const { mapInstance } = useMapInstance()
  const wfsLayer = useRef<any>(null)
  const wfsSelectionLayer = useRef<any>(null)
  const [features, setFeatures] = useState([])
  const [selection, setSelection] = useState<Array<{ object: any }>>([])
  const { isVisible } = useZoomRange(zoomLevel)

  const addFeature = useCallback(
    feature => {
      wfsSelectionLayer.current!.addData(feature)
      setSelection([...selection, feature])
    },
    [wfsLayer.current],
  )

  const removeFeature = useCallback(
    (feature, layer) => {
      setSelection([
        ...selection.filter(item => item.object.id !== feature.properties.id),
      ])
      wfsSelectionLayer.current.removeLayer(layer)
    },
    [wfsSelectionLayer.current],
  )

  const handleLayerFeature: (feature: any, layer: any) => void = (
    feature,
    layer,
  ) => {
    layer.on('mouseover', () => layer.setStyle(hoverStyleLayer))
    layer.on('mouseout', () => layer.setStyle(defaultStyleLayer))
    layer.on('click', (e: any) => {
      e.originalEvent.preventDefault()
      addFeature(feature)
    })
  }

  const handleSelectionLayerFeature = (feature: any, layer: any) => {
    layer.on('mouseover', () => layer.setStyle(hoverStyleSelection))
    layer.on('mouseout', () => layer.setStyle(defaultStyleSelection))
    layer.on('click', (e: any) => {
      e.originalEvent.preventDefault()
      removeFeature(feature, layer)
    })
  }

  const getFeatureData = async () => {
    if (!mapInstance) return
    if (isVisible(mapInstance.getZoom())) {
      const bboxParams = {
        bbox: mapInstance.getBounds().toBBoxString(),
      }
      const parameters = L.Util.extend(
        { ...wfsParameters, ...params },
        bboxParams,
      )
      const url = `${serviceUrl}${L.Util.getParamString(parameters)}`
      const response = await fetch(url)
      const data: any = await response.json()
      setFeatures(data.features)
    }
  }

  useEffect(() => {
    ;(async () => {
      if (!mapInstance) return
      wfsLayer.current = L.geoJSON(undefined, {
        style: defaultStyleLayer,
        onEachFeature: handleLayerFeature,
      }).addTo(mapInstance)
      wfsSelectionLayer.current = L.geoJSON(undefined, {
        style: defaultStyleSelection,
        onEachFeature: handleSelectionLayerFeature,
      }).addTo(mapInstance)
      await getFeatureData()
    })()
  }, [mapInstance])

  const clearLayers = useCallback(() => {
    const layer: any = wfsLayer && wfsLayer.current

    if (!layer) return
    const layers: any[] = layer.getLayers()
    layers.forEach(l => l.remove())
    layer.clearLayers()
  }, [wfsLayer])

  useEffect(() => {
    if (!mapInstance) return
    if (isVisible(mapInstance.getZoom())) {
      clearLayers()
      if (features) wfsLayer.current!.addData(features)
      wfsSelectionLayer.current!.bringToFront()
    }
  }, [features, mapInstance])

  useEffect(() => {
    ;(async () => {
      await getFeatureData()
    })()
  }, [bbox])

  return null
}

export default memo(WfsLayer)
