import React, { useEffect } from 'react'
import { useMapInstance } from '@datapunt/react-maps'
import L, {
  Icon,
  LatLngTuple,
  LeafletEventHandlerFnMap,
  MarkerClusterGroupOptions,
} from 'leaflet'
import 'leaflet.markercluster'
import { createGlobalStyle } from 'styled-components'
import { defaultIcon } from '../icons'
// @ts-ignore
import clusterIcon from '../assets/icons/cluster-icon.svg'

const Styles = createGlobalStyle`
  .arm__icon--clustergroup-default {
    background-image: url(${clusterIcon});
    background-size: 100%;
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

type Props = {
  markers: LatLngTuple[]
  events?: LeafletEventHandlerFnMap
  markerIcon?: Icon
  optionsOverrides?: MarkerClusterGroupOptions
}

const MarkerClusterGroup: React.FC<Props> = ({
  markers,
  markerIcon = defaultIcon,
  events,
  optionsOverrides = {},
}) => {
  const mapInstance = useMapInstance()

  useEffect(() => {
    let markerClusterGroup: L.MarkerClusterGroup
    if (mapInstance && markers) {
      markerClusterGroup = L.markerClusterGroup({
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
        ...optionsOverrides,
      })

      markers.forEach(([lat, lng]) => {
        const icon = markerIcon
        const marker = L.marker(new L.LatLng(lat, lng), { icon })
        if (events) {
          marker.on(events)
        }
        markerClusterGroup.addLayer(marker)
      })

      mapInstance.addLayer(markerClusterGroup)
    }

    return () => {
      if (mapInstance && markerClusterGroup) {
        mapInstance.removeLayer(markerClusterGroup)
      }
    }
  }, [mapInstance, markers])

  return <Styles />
}

export default MarkerClusterGroup
