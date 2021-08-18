import { icons } from '@amsterdam/arm-core'
import { themeColor } from '@amsterdam/asc-ui'
import { useMapInstance } from '@amsterdam/react-maps'
import L, {
  LatLngTuple,
  LeafletEventHandlerFnMap,
  Marker,
  MarkerClusterGroupOptions,
} from 'leaflet'
import 'leaflet.markercluster'
import { useEffect, useMemo } from 'react'
import { createGlobalStyle } from 'styled-components'

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

interface CreateClusterMarkersOptions {
  markers: LatLngTuple[]
  events?: LeafletEventHandlerFnMap
}

// The default function simply uses an array of LatLngTuples with the default marker icon
export function createClusterMarkers({
  markers,
  events,
}: CreateClusterMarkersOptions): Marker[] {
  return markers.map(([lat, lng]) => {
    const marker = L.marker(new L.LatLng(lat, lng), {
      icon: icons.defaultIcon,
    })

    if (events) {
      marker.on(events)
    }

    return marker
  })
}

type MarkerClusterGroupProps = {
  markers: Marker[]
  optionsOverrides?: MarkerClusterGroupOptions
  events?: LeafletEventHandlerFnMap
  setInstance?: (clusterLayer: L.MarkerClusterGroup | undefined) => void
}

const MarkerClusterGroup: React.FC<MarkerClusterGroupProps> = ({
  markers,
  optionsOverrides,
  events,
  setInstance,
}) => {
  const mapInstance = useMapInstance()

  // Create the markerClusterGroup instance
  const markerClusterGroup = useMemo(() => {
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
  }, [optionsOverrides])

  // Call back with the markerClusterGroup
  useEffect(() => {
    if (!setInstance || !markerClusterGroup) {
      return undefined
    }

    setInstance(markerClusterGroup)

    return () => {
      setInstance(undefined)
    }
  }, [setInstance, markerClusterGroup])

  // Add the layer events to markerClusterGroup
  useEffect(() => {
    if (!markerClusterGroup || !events) {
      return undefined
    }

    Object.entries(events).forEach(([event, eventHandler]) => {
      markerClusterGroup.on(event, eventHandler)
    })

    return () => {
      Object.entries(events).forEach(([event, eventHandler]) => {
        markerClusterGroup.off(event, eventHandler)
      })
    }
  }, [events, markerClusterGroup])

  // Add / Remove Markers to the markerClusterGroup
  useEffect(() => {
    if (!markerClusterGroup) {
      return undefined
    }

    // Bulk remove all the existing layers
    markerClusterGroup.clearLayers()
    markerClusterGroup.addLayers(markers)

    if (!mapInstance.hasLayer(markerClusterGroup)) {
      mapInstance.addLayer(markerClusterGroup)
    }

    return () => {
      mapInstance.removeLayer(markerClusterGroup)
    }
  }, [markerClusterGroup, markers, mapInstance])

  return <Styles />
}

export default MarkerClusterGroup
