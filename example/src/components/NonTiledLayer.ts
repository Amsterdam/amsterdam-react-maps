import React, { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet.nontiledlayer'
import { useMapInstance } from '@datapunt/react-maps'

const NonTiledLayer: React.FC<{
  url: string
  options: L.WMSOptions
  params?: URLSearchParams
}> = ({ url, options, params }) => {
  const { mapInstance } = useMapInstance()
  const query = params ? new URLSearchParams(params).toString() : ''
  const layerUrl = query ? `${url}?${query}` : url

  useEffect(() => {
    if (mapInstance) {
      L.nonTiledLayer.wms(layerUrl, options).addTo(mapInstance)
    }
  }, [mapInstance])

  return null
}

export default NonTiledLayer
