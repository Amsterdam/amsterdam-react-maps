import React, { useEffect, useState } from 'react'
import { LatLngLiteral, Marker as MarkerType } from 'leaflet'
import { Map, TileLayer, Marker } from '@datapunt/react-maps'
import styled from '@datapunt/asc-core'
import { ViewerContainer, SearchBar } from '@datapunt/asc-ui'
import Controls from '../components/Zoom'
import { constants } from '../../../src'
import DefaultMarkerIcon from '../components/DefaultMarkerIcon'
import NonTiledLayer from '../components/NonTiledLayer'

const StyledMap = styled(Map)`
  width: 100%;
  height: 100vh;
`

const StyledViewerContainer = styled(ViewerContainer)`
  z-index: 400;
`

const BasicMap: React.FC = () => {
  const [marker, setMarker] = useState<MarkerType>()
  const [markerPosition, setMarkerPosition] = useState<LatLngLiteral>({
    lat: 52.3731081,
    lng: 4.8932945,
  })

  const [markerPositions, setMarkerPositions] = useState<LatLngLiteral[]>([])

  function moveMarker() {
    const { lat, lng } = markerPosition
    setMarkerPosition({
      lat: lat + 0.0001,
      lng: lng + 0.0001,
    })
  }

  const addMarker = (latlng: LatLngLiteral) => {
    setMarkerPositions((c: LatLngLiteral[]) => [...c, latlng])
  }

  useEffect(() => {
    if (marker !== undefined) {
      marker.setLatLng(markerPosition)
    }
  }, [marker, markerPosition])

  return (
    <StyledMap
      events={{
        click: e => {
          addMarker(e.latlng)
        },
      }}
      options={constants.DEFAULT_AMSTERDAM_MAPS_OPTIONS}
    >
      <StyledViewerContainer
        topLeft={<SearchBar />}
        bottomRight={<Controls />}
        bottomLeft={
          <button type="button" onClick={moveMarker}>
            Move marker
          </button>
        }
      />
      <Marker
        setInstance={setMarker}
        args={[markerPosition]}
        options={{
          icon: DefaultMarkerIcon,
        }}
      />
      {markerPositions.map(latlng => (
        <Marker
          key={String(latlng)}
          args={[latlng]}
          options={{
            icon: DefaultMarkerIcon,
          }}
        />
      ))}
      <TileLayer
        args={[constants.DEFAULT_AMSTERDAM_LAYERS.normal]}
        options={{
          subdomains: ['1', '2', '3', '4'],
          tms: true,
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }}
      />
      <NonTiledLayer
        url="https://acc.map.data.amsterdam.nl/maps/brk"
        options={{
          id: 'kgem',
          format: 'image/png',
          transparent: true,
          layers: 'kadastrale_gemeente',
        }}
      />
    </StyledMap>
  )
}

export default BasicMap
