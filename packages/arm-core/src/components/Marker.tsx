import { Marker as MarkerComponent } from '@datapunt/react-maps'
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
}

const Marker: React.FC<Props> = ({ latLng, events, options }) => {
  const [markerInstance, setMarkerInstance] = useState<MarkerType>()

  useEffect(() => {
    if (markerInstance) {
      markerInstance.setLatLng(latLng)
    }
  }, [latLng])

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
