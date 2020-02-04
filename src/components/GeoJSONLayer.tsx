import React, { useEffect, useState } from 'react'
import { GeoJsonObject } from 'geojson'
import { GeoJSONOptions } from 'leaflet'
import { useMapInstance, GeoJSON } from '@datapunt/react-maps'

type Props = {
  url: string
  options?: GeoJSONOptions
}

const GeoJSONLayer: React.FC<Props> = ({ url, options }) => {
  const mapInstance = useMapInstance()
  const [json, setJson] = useState<GeoJsonObject>()

  useEffect(() => {
    if (mapInstance) {
      window
        .fetch(`${url}`)
        .then(res => res.json())
        .then(res => {
          setJson(res)
        })
    }
  }, [mapInstance])

  return json ? <GeoJSON args={[json]} options={options} /> : null
}

export default GeoJSONLayer
