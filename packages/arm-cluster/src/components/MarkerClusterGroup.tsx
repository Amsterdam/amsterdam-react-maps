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
import { icons } from '@datapunt/arm-core'

const { defaultIcon } = icons

const Styles = createGlobalStyle`
  .arm__icon--clustergroup-default {
    background-image: url("data:image/svg+xml,%3Csvg width='39' height='39' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3Ccircle id='a' cx='17' cy='17' r='16'/%3E%3Ccircle id='b' cx='16' cy='16' r='16'/%3E%3Cmask id='c' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='-3' y='-3' width='38' height='38'%3E%3Cpath fill='%23fff' d='M-2-2h38v38H-2z'/%3E%3Cuse xlink:href='%23a'/%3E%3C/mask%3E%3Cmask id='d' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='-3' y='-3' width='38' height='38'%3E%3Cpath fill='%23fff' d='M-3-3h38v38H-3z'/%3E%3Cuse xlink:href='%23b'/%3E%3C/mask%3E%3C/defs%3E%3Cg transform='translate(3 3)' fill='none' fill-rule='evenodd'%3E%3Cuse stroke='%23666' mask='url(%23c)' stroke-width='6' xlink:href='%23a'/%3E%3Cuse stroke='%23FFF' mask='url(%23d)' stroke-width='6' xlink:href='%23b'/%3E%3Ccircle fill='%23EC0000' cx='16' cy='16' r='16'/%3E%3C/g%3E%3C/svg%3E");
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
