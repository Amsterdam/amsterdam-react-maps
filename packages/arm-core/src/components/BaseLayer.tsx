import { TileLayer } from '@amsterdam/react-maps'
import { TileLayer as TileLayerType, TileLayerOptions } from 'leaflet'
import { useEffect, useState } from 'react'
import { DEFAULT_AMSTERDAM_LAYERS } from '../constants'

type Props = {
  baseLayer?: string
  options?: TileLayerOptions
}

const BaseLayer: React.FC<Props> = ({
  baseLayer = DEFAULT_AMSTERDAM_LAYERS[0].urlTemplate,
  options = {
    subdomains: ['t1', 't2', 't3', 't4'],
    tms: true,
  },
}) => {
  const [baseLayerInstance, setBaseLayerInstance] = useState<TileLayerType>()

  useEffect(() => {
    if (baseLayer && baseLayerInstance) {
      baseLayerInstance.setUrl(baseLayer)
    }
  }, [baseLayer, baseLayerInstance])

  return (
    <TileLayer
      setInstance={setBaseLayerInstance}
      args={[baseLayer]}
      options={options}
    />
  )
}

export default BaseLayer
