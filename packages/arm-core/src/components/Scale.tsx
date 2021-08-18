import { useMapInstance } from '@amsterdam/react-maps'
import { Control, control } from 'leaflet'
import { useEffect } from 'react'

type Props = {
  options?: Control.ScaleOptions
}

// Todo: Move this to react-maps
const Scale: React.FC<Props> = ({ options }) => {
  const mapInstance = useMapInstance()

  useEffect(() => {
    control.scale(options).addTo(mapInstance)

    return () => {
      control.scale().remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapInstance])

  return null
}

export default Scale
