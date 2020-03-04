import React, { useEffect, useState } from 'react'
import { TileLayer } from '@datapunt/react-maps'
import { TileLayer as TileLayerType } from 'leaflet'
import { DEFAULT_AMSTERDAM_LAYERS } from '../constants'

type Props = {
  baseLayer?: string
}

const BaseLayer: React.FC<Props> = ({ baseLayer }) => {
  const [baseLayerInstance, setBaseLayerInstance] = useState<TileLayerType>()

  useEffect(() => {
    if (baseLayer && baseLayerInstance) {
      baseLayerInstance.setUrl(baseLayer)
    }
  }, [baseLayer, baseLayerInstance])

  return baseLayer ? (
    <TileLayer
      setInstance={setBaseLayerInstance}
      args={[baseLayer]}
      options={{
        subdomains: ['1', '2', '3', '4'],
        tms: true,
      }}
    />
  ) : null
}

BaseLayer.defaultProps = {
  baseLayer: DEFAULT_AMSTERDAM_LAYERS[0].urlTemplate,
}

export default BaseLayer
