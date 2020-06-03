import React, { useEffect, useState } from 'react'
import { Feature, Geometry, GeometryObject } from 'geojson'
import { Layer } from 'leaflet'
import styled from 'styled-components'
import { Button, ViewerContainer } from '@datapunt/asc-ui'
import {
  Map,
  BaseLayer,
  RDGeoJSON,
  rdGeoJSONDefaultStyle,
} from '@datapunt/arm-core'

type APIResult = {
  geometrie: Geometry
  pandnaam: string
}

const StyledViewerContainer = styled(ViewerContainer)`
  z-index: 400;
`

const MapWithRDGeoJSON: React.FC = () => {
  const [geoJSON, setGeoJSON] = useState<APIResult>()
  const fetchRDGeoJSON = async (url: string) =>
    fetch(url).then((res) => res.json())

  useEffect(() => {
    ;(async () => {
      const resTwo = await fetchRDGeoJSON(
        // Stopera
        'https://api.data.amsterdam.nl/bag/v1.1/pand/0363100012186092/',
      )
      setGeoJSON(resTwo)
    })()
  }, [])

  const onEachFeature = (
    feature: Feature<GeometryObject, any>,
    layer: Layer,
  ) => {
    if (feature.properties && feature.properties.tooltipContent) {
      layer.bindPopup(feature.properties.tooltipContent)
    }
  }

  const onRemove = () => {
    setGeoJSON(undefined)
  }

  return (
    <Map fullScreen>
      <StyledViewerContainer
        bottomRight={
          <Button type="button" onClick={onRemove}>
            Remove RD GeoJSON
          </Button>
        }
      />
      {geoJSON && (
        <RDGeoJSON
          geometry={geoJSON.geometrie}
          properties={{
            tooltipContent: geoJSON.pandnaam,
          }}
          options={{ style: rdGeoJSONDefaultStyle, onEachFeature }}
        />
      )}
      <BaseLayer />
    </Map>
  )
}

export default MapWithRDGeoJSON
