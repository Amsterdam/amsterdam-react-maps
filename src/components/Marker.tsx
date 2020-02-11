/* eslint-disable global-require */
import React, { useEffect, useState } from 'react'
import { Marker as MarkerComponent } from '@datapunt/react-maps'
import L, { LatLng, Marker as MarkerType } from 'leaflet'

type Props = { latLng: LatLng }

const Marker: React.FC<Props> = ({ latLng }) => {
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
      options={{
        icon: L.icon({
          iconUrl: require('leaflet/dist/images/marker-icon.png').default,
          iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png')
            .default,
          shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowSize: [41, 41],
        }),
      }}
    />
  )
}

export default Marker
