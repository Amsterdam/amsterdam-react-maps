import { GeoJSON } from '@amsterdam/react-maps'
import { GeoJsonObject } from 'geojson'
import { GeoJSONOptions } from 'leaflet'
import React, { useEffect, useState } from 'react'
import fetchWithAbort from '../utils/fetchWithAbort'

type Props = {
  url: string
  options?: GeoJSONOptions
}

/**
 * This GeoJSONLayer can be used with any api, the data is requested only once and is
 * not dependent on zoom levels. Not to be used for large datasets because it can
 * impact the overall map performance
 */
const GeoJSONLayer: React.FC<Props> = ({ url, options }) => {
  const [json, setJson] = useState<GeoJsonObject>()

  useEffect(() => {
    const [request, controller] = fetchWithAbort(url)

    request
      .then((res) => res.json())
      .then((res) => setJson(res))
      .catch((error) => {
        // Ignore abort errors since they are expected to happen.
        if (error instanceof Error && error.name === 'AbortError') {
          return
        }

        return Promise.reject(error)
      })

    return () => {
      controller.abort()
    }
  }, [])

  return json ? <GeoJSON args={[json]} options={options} /> : null
}

export default GeoJSONLayer
