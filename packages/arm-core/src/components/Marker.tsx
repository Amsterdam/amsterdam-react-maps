import { Marker as MarkerComponent } from '@amsterdam/react-maps'
import {
  LatLngExpression,
  LeafletEventHandlerFn,
  Marker as MarkerType,
  MarkerOptions,
} from 'leaflet'
import React, { useEffect, useState } from 'react'
import { defaultIcon } from '../icons'

type Props = {
  latLng: LatLngExpression
  events?: { [key: string]: LeafletEventHandlerFn }
  options?: MarkerOptions
  setInstance?: (markerInstance?: MarkerType) => void
}

const Marker: React.FC<Props> = ({ latLng, events, options, setInstance }) => {
  const [markerInstance, setMarkerInstance] = useState<MarkerType>()

  useEffect(() => {
    if (markerInstance) {
      markerInstance.setLatLng(latLng)
    }
  }, [latLng])

  useEffect(() => {
    if (!setInstance || !markerInstance) {
      return undefined
    }

    setInstance(markerInstance)

    return () => {
      setInstance(undefined)
    }
  }, [markerInstance, setInstance])

  return (
    <MarkerComponent
      setInstance={setMarkerInstance}
      args={[latLng]}
      events={events}
      options={{
        icon: defaultIcon,
        ...options,
      }}
    />
  )
}

export default Marker
