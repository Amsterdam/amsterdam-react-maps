import { Checkbox, Label, themeColor, themeSpacing } from '@amsterdam/asc-ui'
import L, { LatLngTuple, Marker } from 'leaflet'
import React, {
  FunctionComponent,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react'
import styled, { createGlobalStyle } from 'styled-components'

const UnstyledOl = styled.ol`
  margin: 0;
  padding: 0;
  list-style-type: none;
`

const Panel = styled.div`
  background-color: ${themeColor('tint', 'level2')};
  padding: ${themeSpacing(3)};
  box-shadow: 0 0 0 ${themeSpacing(1)} rgba(0, 0, 0, 0.1);
`

const setCount = 6

const MarkerStyles = createGlobalStyle`
  .custom-marker {
    background-color: ${themeColor('primary')};
    border-radius: 50%;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: zoom-in;
    text-transform: uppercase;
  }
`

function createDatasetMarkers(datasetId: string, coordinates: LatLngTuple[]) {
  return coordinates.map(([lat, lng]) => {
    const html = `<span aria-label="Marker uit dataset ${datasetId} op location lat: ${lat} lng: ${lng}">${datasetId}</span>`
    const markerObject = L.marker(new L.LatLng(lat, lng), {
      icon: L.divIcon({
        html,
        className: `custom-marker custom-marker--${datasetId}`,
        iconSize: L.point(20, 20),
        iconAnchor: L.point(10, 10),
      }),
    })
    return markerObject
  })
}

interface MarkerFiltersProps {
  markersSource: L.LatLngTuple[]
  clusterComponent: (markers: L.Marker[]) => ReactNode
}

const MarkerFilters: FunctionComponent<MarkerFiltersProps> = ({
  markersSource,
  clusterComponent,
}) => {
  const [activeDatasets, setActiveDataset] = useState(['a', 'b', 'c'])

  // Create some fake datasets from the source makers
  const markerSets = useMemo(() => {
    const datasets = []
    const setLen = markersSource.length / setCount

    for (let i = 0; i < setCount; i += 1) {
      // Divide the markerSource into $setCount parts
      const start = i * setLen
      const id = String.fromCharCode(97 + i)
      datasets.push({
        id,
        title: `Dataset ${id}`,
        markers: createDatasetMarkers(
          id,
          markersSource.slice(start, start + setLen),
        ),
      })
    }
    return datasets
  }, [markersSource])

  // Concat the markers from the filtered datasets
  const markersFiltered = useMemo(() => {
    // eslint-disable-next-line no-shadow
    const markers: Marker[] = []

    for (let i = 0; i < activeDatasets.length; i += 1) {
      const markerSet = markerSets.find(({ id }) => id === activeDatasets[i])
      if (markerSet) {
        markers.push(...markerSet.markers)
      }
    }
    return markers
  }, [markerSets, activeDatasets])

  // Update the active datasets state
  const onChange = useCallback(
    (markerSetId: string) => {
      const updatedDatasets = activeDatasets.includes(markerSetId)
        ? activeDatasets.filter((id) => id !== markerSetId)
        : activeDatasets.concat(markerSetId)
      setActiveDataset(updatedDatasets)
    },
    [activeDatasets, setActiveDataset],
  )

  return (
    <Panel>
      Total: {markersFiltered.length}
      <UnstyledOl>
        {markerSets.map((markerSet) => (
          <li key={markerSet.title}>
            <Label htmlFor={markerSet.title} label={markerSet.title}>
              <Checkbox
                id={markerSet.title}
                checked={activeDatasets.includes(markerSet.id)}
                onChange={() => onChange(markerSet.id)}
              />
            </Label>
          </li>
        ))}
      </UnstyledOl>
      <MarkerStyles />
      {clusterComponent(markersFiltered)}
    </Panel>
  )
}

export default MarkerFilters
