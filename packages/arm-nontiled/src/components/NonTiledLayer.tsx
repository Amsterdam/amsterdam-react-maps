import React, { useEffect, useState } from 'react'
import L, { Layer } from 'leaflet'
import { useMapInstance } from '@datapunt/react-maps'
import 'leaflet.nontiledlayer'

const NonTiledLayer: React.FC<{
  url: string
  options: L.WMSOptions
  params?: { [key: string]: string }
}> = ({ url, options, params }) => {
  const [layer, setLayer] = useState<Layer>()
  const mapInstance = useMapInstance()
  const query = new URLSearchParams(params)
  const layerUrl = params ? `${url}?${query}` : url

  useEffect(() => {
    if (mapInstance !== null && !layer) {
      setLayer(L.nonTiledLayer.wms(layerUrl, options).addTo(mapInstance))
    }

    return () => {
      if (layer && mapInstance && mapInstance.hasLayer(layer)) {
        layer.removeFrom(mapInstance)
      }
    }
  }, [mapInstance, layer])

  return null
}

export default NonTiledLayer
