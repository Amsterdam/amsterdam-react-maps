import React, { useEffect, useState } from 'react'
import { GeoJsonObject } from 'geojson'
import { GeoJSONOptions } from 'leaflet'
import { useMapInstance, GeoJSON } from '@datapunt/react-maps'
import fetchWithAbort from '../utils/fetchWithAbort'

type Props = {
  url: string
  options?: GeoJSONOptions
}

const GeoJSONLayer: React.FC<Props> = ({ url, options }) => {
  const mapInstance = useMapInstance()
  const [json, setJson] = useState<GeoJsonObject>()

  useEffect(() => {
    if (!mapInstance) {
      return () => {}
    }
    const [request, controller] = fetchWithAbort(url)

    request
      .then(res => res.json())
      .then(res => setJson(res))
      .catch(error => {
        // Ignore abort errors since they are expected to happen.
        if (error instanceof Error && error.name === 'AbortError') {
          return
        }

        return Promise.reject(error)
      })

    return () => {
      controller.abort()
    }
  }, [mapInstance])

  return json ? <GeoJSON args={[json]} options={options} /> : null
}

export default GeoJSONLayer
