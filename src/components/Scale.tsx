import React, { useEffect } from 'react'
import { useMapInstance } from '@datapunt/react-maps'
import { Control, control } from 'leaflet'

type Props = {
  options?: Control.ScaleOptions
}

// Todo: Move this to react-maps
const Scale: React.FC<Props> = ({ options }) => {
  const mapInstance = useMapInstance()
  useEffect(() => {
    if (mapInstance) {
      control.scale(options).addTo(mapInstance)
    }

    return () => {
      if (mapInstance) {
        control.scale().remove()
      }
    }
  }, [mapInstance])
  return null
}

export default Scale
