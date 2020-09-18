import { useMapInstance } from '@datapunt/react-maps'
import L, { Layer } from 'leaflet'
import 'leaflet.nontiledlayer'
import React, { useEffect, useState } from 'react'

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
    if (!layer) {
      setLayer(L.nonTiledLayer.wms(layerUrl, options).addTo(mapInstance))
    }

    return () => {
      if (layer && mapInstance.hasLayer(layer)) {
        layer.removeFrom(mapInstance)
      }
    }
  }, [layer])

  return null
}

export default NonTiledLayer
