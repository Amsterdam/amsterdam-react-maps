import L, { LatLng, LatLngTuple, Polygon } from 'leaflet'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ViewerContainer } from '@datapunt/asc-ui'
import { BaseLayer, Map, useStateRef } from '@datapunt/arm-core'
import { MarkerClusterGroup } from '@datapunt/arm-cluster'
import { DrawTool, ExtendedLayer } from '@datapunt/arm-draw'
import getDataSelection from './api/getDataSelection'

const StyledViewerContainer = styled(ViewerContainer)`
  z-index: 400;
`

type MarkerGroup = {
  id: string
  markers: LatLngTuple[]
}

const DATA_SELECTION_ENDPOINT =
  'https://api.data.amsterdam.nl/dataselectie/bag/geolocation/'

const DrawToolWithMarkerClusterGroup: React.FC = () => {
  const [showDrawTool, setShowDrawTool] = useState(true)
  const [mapInstance, setMapInstance] = useState<L.Map>()
  const [markerGroups, setMarkerGroups, markerGroupsRef] = useStateRef<
    MarkerGroup[]
  >([])

  const fetchData = async (latLngs: LatLng[][]) =>
    getDataSelection(DATA_SELECTION_ENDPOINT, {
      shape: JSON.stringify(latLngs[0].map(({ lat, lng }) => [lng, lat])),
    })

  const getMarkerGroup = async (layer: ExtendedLayer): Promise<null | void> => {
    if (!(layer instanceof Polygon)) {
      return null
    }
    try {
      const latLngs = layer.getLatLngs() as LatLng[][]
      const res = await fetchData(latLngs)

      if (markerGroupsRef.current) {
        setMarkerGroups([
          ...markerGroupsRef.current.filter(({ id }) => id !== layer.id),
          {
            id: layer.id,
            markers: res.markers,
          },
        ])
      }
    } catch (e) {
      // Handle error
      // eslint-disable-next-line no-console
      console.warn(e)
    }
  }

  const editVertex = async (e: L.DrawEvents.EditVertex) => {
    await getMarkerGroup(e.poly as ExtendedLayer)
  }

  const getTotalDistance = (latLngs: LatLng[]) => {
    return latLngs.reduce(
      (total, latlng, i) => {
        if (i > 0) {
          const dist = latlng.distanceTo(latLngs[i - 1])
          return total + dist
        }
        return total
      },
      latLngs.length > 2
        ? latLngs[0].distanceTo(latLngs[latLngs.length - 1])
        : 0,
    )
  }

  const bindDistanceAndAreaToTooltip = (layer: ExtendedLayer) => {
    const latLngs = layer.getLatLngs().flat().flat()
    const distance = getTotalDistance(latLngs)

    let toolTipText: string

    if (distance >= 1000) {
      toolTipText = `${L.GeometryUtil.formattedNumber(
        `${distance / 1000}`,
        2,
      )} km`
    } else {
      toolTipText = `${L.GeometryUtil.formattedNumber(`${distance}`, 2)} m`
    }

    if (layer instanceof Polygon) {
      toolTipText = `${L.GeometryUtil.readableArea(
        L.GeometryUtil.geodesicArea(latLngs),
        true,
        {
          m: 1,
        },
      )}, ${toolTipText}`
    }
    if (toolTipText) {
      layer.bindTooltip(toolTipText, { direction: 'bottom' }).openTooltip()
    }
  }

  useEffect(() => {
    if (mapInstance) {
      // @ts-ignore
      mapInstance.on(L.Draw.Event.EDITVERTEX, editVertex)
    }

    return () => {
      if (mapInstance) {
        // @ts-ignore
        mapInstance.off(L.Draw.Event.EDITVERTEX, editVertex)
      }
    }
  }, [mapInstance])

  return (
    <Map setInstance={setMapInstance} fullScreen>
      {showDrawTool &&
        markerGroups.map(({ markers, id }) => (
          <MarkerClusterGroup key={id} markers={markers} />
        ))}
      <BaseLayer />
      <StyledViewerContainer
        topRight={
          <DrawTool
            onDrawEnd={async (layer: ExtendedLayer) => {
              await getMarkerGroup(layer)
              bindDistanceAndAreaToTooltip(layer)
            }}
            onDelete={(layersInEditMode) => {
              const editLayerIds = layersInEditMode.map(({ id }) => id)

              // remove the markerGroups.
              if (markerGroupsRef.current) {
                setMarkerGroups(
                  markerGroupsRef.current.filter(
                    ({ id }) => !editLayerIds.includes(id),
                  ),
                )
              }
            }}
            isOpen={showDrawTool}
            onToggle={setShowDrawTool}
          />
        }
      />
    </Map>
  )
}

export default DrawToolWithMarkerClusterGroup
