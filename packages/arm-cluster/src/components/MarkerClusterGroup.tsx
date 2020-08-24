import React, { useEffect, useMemo } from 'react'
import { useMapInstance } from '@datapunt/react-maps'
import L, {
  MarkerClusterGroupOptions,
  Marker,
  LatLngTuple,
  LeafletEventHandlerFnMap,
} from 'leaflet'
import 'leaflet.markercluster'
import { createGlobalStyle } from 'styled-components'
import { icons } from '@datapunt/arm-core'
import { themeColor } from '@datapunt/asc-ui'

const Styles = createGlobalStyle`
  .arm__icon--clustergroup-default {
    background-color: ${themeColor('secondary')};
    background-size: 100%;
    border-radius: 50%;
    border: 3px solid;
    box-shadow: 1px 1px 2px black;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: zoom-in;
    
    .arm__icon-text {
      text-align:center;
    }
  }
`

type CreateClusterMarkersFnProps = {
  markers: LatLngTuple[]
  events?: LeafletEventHandlerFnMap
}

// The default function simply uses an array of LatLngTuples with the default marker icon
export function createClusterMarkers({
  markers,
  events,
}: CreateClusterMarkersFnProps) {
  const markerObjects: Marker[] = []

  for (let i = 0; i < markers.length; i += 1) {
    const [lat, lng] = markers[i]
    const marker = L.marker(new L.LatLng(lat, lng), {
      icon: icons.defaultIcon,
    })
    if (events) {
      marker.on(events)
    }
    markerObjects.push(marker)
  }

  return markerObjects
}

type MarkerClusterGroupProps = {
  markers: Marker[]
  optionsOverrides?: MarkerClusterGroupOptions
}

const MarkerClusterGroup: React.FC<MarkerClusterGroupProps> = ({
  markers,
  optionsOverrides,
}) => {
  const mapInstance = useMapInstance()

  const markerClusterGroup = useMemo(() => {
    if (mapInstance) {
      return L.markerClusterGroup({
        spiderfyOnMaxZoom: false,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        maxClusterRadius: 50,
        chunkedLoading: true,
        disableClusteringAtZoom: 16,
        iconCreateFunction: (marker) =>
          L.divIcon({
            html: `
            <div
              class="arm__icon-text"
              aria-label="Cluster met ${marker.getChildCount()} onderdelen"
            >
              ${marker.getChildCount()}
            </div>
            `,
            className: 'arm__icon--clustergroup-default',
            iconSize: L.point(39, 39),
            iconAnchor: L.point(19, 19),
          }),
        ...(optionsOverrides || {}),
      })
    }
    return null
  }, [mapInstance, optionsOverrides])

  useEffect(() => {
    if (mapInstance && markerClusterGroup) {
      // Bulk remove all the existing layers
      markerClusterGroup.clearLayers()
      markerClusterGroup.addLayers(markers)
      if (!mapInstance.hasLayer(markerClusterGroup)) {
        mapInstance.addLayer(markerClusterGroup)
      }
    }
    return () => {
      if (mapInstance && markerClusterGroup) {
        mapInstance.removeLayer(markerClusterGroup)
      }
    }
  }, [mapInstance, markerClusterGroup, markers])

  return <Styles />
}

export default MarkerClusterGroup
