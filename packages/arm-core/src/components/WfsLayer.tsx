import { GeoJSON, useMapInstance } from '@amsterdam/react-maps'
import { FeatureCollection } from 'geojson'
import { GeoJSON as GeoJSONLayer, GeoJSONOptions, Map } from 'leaflet'
import { useEffect, useState } from 'react'
import { MAX_ZOOM_LEVEL, MIN_ZOOM_LEVEL } from '../constants'
import { ZoomLevel } from '../types'
import fetchWithAbort from '../utils/fetchWithAbort'
import getBBox from '../utils/getBBox'

const NO_DATA: FeatureCollection = {
  type: 'FeatureCollection',
  features: [],
}

interface Props {
  url: string
  options?: GeoJSONOptions
  zoomLevel: ZoomLevel
}

const isVisible = (mapInstance: Map, zoomLevel: ZoomLevel) => {
  const { min, max } = zoomLevel
  const zoom = mapInstance.getZoom()
  return zoom <= (min || MIN_ZOOM_LEVEL) && zoom >= (max || MAX_ZOOM_LEVEL)
}

/**
 * WfsLayer component should be only used when the api provides wfs capabilities for spatial queries
 * The data is requested on each map action (pan, zoom)
 *
 */
const WfsLayer: React.FC<Props> = ({ url, options, zoomLevel }) => {
  const mapInstance = useMapInstance()
  const [layerInstance, setLayerInstance] = useState<GeoJSONLayer>()
  const [bbox, setBbox] = useState('')
  const [json, setJson] = useState<FeatureCollection>(NO_DATA)

  useEffect(() => {
    function onMoveEnd() {
      setBbox(getBBox(mapInstance))
    }

    mapInstance.on('moveend', onMoveEnd)

    return () => {
      mapInstance.off('moveend', onMoveEnd)
    }
  }, [])

  useEffect(() => {
    if (!isVisible(mapInstance, zoomLevel)) {
      setJson(NO_DATA)
      return
    }

    const extent = bbox || getBBox(mapInstance)
    const [request, controller] = fetchWithAbort(`${url}${extent}`)

    request
      .then((res) => res.json())
      .then((res) => setJson(res))
      .catch((error) => {
        // Ignore abort errors since they are expected to happen.
        if (error instanceof Error && error.name === 'AbortError') {
          return Promise.resolve(null)
        }

        return Promise.reject(error)
      })

    return () => controller.abort()
  }, [bbox])

  useEffect(() => {
    if (layerInstance) {
      layerInstance.clearLayers()
      layerInstance.addData(json)
    }

    return () => {
      if (layerInstance) {
        // This ensures that for each refresh of the data, the click
        // events that are bound in the layer data are removed.
        layerInstance.off('click')
      }
    }
  }, [layerInstance, json])

  return json ? (
    <GeoJSON setInstance={setLayerInstance} args={[json]} options={options} />
  ) : null
}

export default WfsLayer
