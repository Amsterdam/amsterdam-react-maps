import React, { useEffect, useState } from 'react'
import { Marker as MarkerComponent } from '@datapunt/react-maps'
import L, { LatLng, Marker as MarkerType, MarkerOptions } from 'leaflet'

type Props = {
  latLng: LatLng
  options?: MarkerOptions
}

const Marker: React.FC<Props> = ({ latLng, options }) => {
  const [markerInstance, setMarkerInstance] = useState<MarkerType>()

  useEffect(() => {
    if (markerInstance) {
      markerInstance.setLatLng(latLng)
    }
  }, [latLng])

  const icon = L.icon({
    iconUrl: 'https://map.data.amsterdam.nl/dist/images/svg/marker.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 39],
  })

  return (
    <MarkerComponent
      setInstance={setMarkerInstance}
      args={[latLng]}
      options={{
        icon,
        ...options,
      }}
    />
  )
}

export default Marker
