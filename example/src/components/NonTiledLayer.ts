import React, { useEffect } from 'react'
import L from 'leaflet'
import { useMapInstance } from '@datapunt/react-maps'
import 'leaflet.nontiledlayer'

const NonTiledLayer: React.FC<{
  url: string
  options: L.WMSOptions
  params?: { [key: string]: string }
}> = ({ url, options, params }) => {
  const mapInstance = useMapInstance()
  const query = new URLSearchParams(params)
  const layerUrl = `${url}?${query}`

  useEffect(() => {
    if (mapInstance !== null) {
      L.nonTiledLayer.wms(layerUrl, options).addTo(mapInstance)
    }
  }, [mapInstance])

  return null
}

export default NonTiledLayer
