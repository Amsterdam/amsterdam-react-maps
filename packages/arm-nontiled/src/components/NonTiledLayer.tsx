import { useMapInstance } from '@amsterdam/react-maps'
import L, { Layer } from 'leaflet'
import 'leaflet.nontiledlayer'
import { useEffect, useState } from 'react'

const NonTiledLayer: React.FC<{
  url: string
  options: L.WMSOptions
  params?: { [key: string]: string }
  children?: React.ReactNode
}> = ({ url, options, params }) => {
  const [layer, setLayer] = useState<Layer>()
  const mapInstance = useMapInstance()
  const query = new URLSearchParams(params)
  const layerUrl = params ? `${url}?${query.toString()}` : url

  useEffect(() => {
    if (!layer) {
      setLayer(L.nonTiledLayer.wms(layerUrl, options).addTo(mapInstance))
    }

    return () => {
      if (layer && mapInstance.hasLayer(layer)) {
        layer.removeFrom(mapInstance)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layer, mapInstance])

  return null
}

export default NonTiledLayer
