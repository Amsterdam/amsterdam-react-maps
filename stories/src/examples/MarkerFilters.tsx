import React, { ReactNode, useMemo, useState } from 'react'
import { Label, Checkbox, themeColor } from '@datapunt/asc-ui'
import styled from 'styled-components'

interface MarkerFiltersProps {
  markers: Array<[number, number]>
  clusterComponent: (markers: any) => ReactNode
}

const UnstyledOl = styled.ol`
  margin: 0;
  padding: 0;
  list-style-type: none;
`

const Panel = styled.div`
  background-color: ${themeColor('tint', 'level2')};
  padding: 10px;
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.1);
`

const setCount = 6

export default function MarkerFilters({
  markers,
  clusterComponent,
}: MarkerFiltersProps) {
  const [activeDatasets, setActiveDataset] = useState([0, 1, 2])

  const markerSets = useMemo(() => {
    const datasets = []

    for (let i = 0; i < setCount; i += 1) {
      datasets.push({
        id: i,
        title: `Dataset ${i + 1}`,
        markers,
        isActive: false,
      })
    }
    return datasets
  }, [markers])

  const markersFiltered = useMemo(() => {
    // eslint-disable-next-line no-shadow
    let markersFiltered: any[] = []
    const setLen = markers.length / setCount
    for (let i = 0; i < activeDatasets.length; i += 1) {
      const start = activeDatasets[i] * setLen
      markersFiltered = markersFiltered.concat(
        markers.slice(start, start + setLen),
      )
    }
    return markersFiltered
  }, [markers, activeDatasets])

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
                onChange={() => {
                  const updatedDatasets = activeDatasets.includes(markerSet.id)
                    ? activeDatasets.filter((id) => id !== markerSet.id)
                    : activeDatasets.concat(markerSet.id)
                  setActiveDataset(updatedDatasets)
                }}
              />
            </Label>
          </li>
        ))}
      </UnstyledOl>
      {clusterComponent(markersFiltered)}
    </Panel>
  )
}
