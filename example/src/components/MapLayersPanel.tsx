import React, { useState } from 'react'
import styled from 'styled-components'
import { Checkbox, Heading, Label } from '@datapunt/asc-ui'
import { DomEvent, FeatureGroup, LeafletMouseEvent } from 'leaflet'
import {
  GEO_JSON_LAYER_EXAMPLES,
  NON_TILED_LAYERS_EXAMPLES,
} from '../../config'
import NonTiledLayer from '../../../src/components/NonTiledLayer'
import GeoJSONLayer from '../../../src/components/GeoJSONLayer'

const MapLayersPanelStyle = styled.div`
  width: 400px;
  background-color: #fff;
  flex-direction: column;
  padding: 10px;
`

const MapLayersPanel: React.FC = () => {
  const [activeLayers, setActiveLayers] = useState<string[]>([])
  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, checked } = event.currentTarget

    setActiveLayers(current =>
      checked ? [...current, value] : current.filter(id => value !== id),
    )
  }

  return (
    <>
      <MapLayersPanelStyle>
        <Heading element="h4">Kaartlagen</Heading>
        {[...NON_TILED_LAYERS_EXAMPLES, ...GEO_JSON_LAYER_EXAMPLES].map(
          ({ id, title }) => (
            <Label htmlFor={id} key={id} label={title}>
              {/*
              // @ts-ignore */}
              <Checkbox id={id} value={id} onChange={handleOnChange} />
            </Label>
          ),
        )}
      </MapLayersPanelStyle>
      {GEO_JSON_LAYER_EXAMPLES.filter(({ id }) =>
        activeLayers.includes(id),
      ).map(({ id, url, style, activeStyle }) => (
        <GeoJSONLayer
          key={id}
          url={url}
          options={{
            style,
            onEachFeature: (feature, layer) => {
              layer.bindPopup(
                `<p>Stadsdeel: ${feature.properties.stadsdeel}</p><p>Straatnaam: ${feature.properties.straatnaam}</p>`,
              )
              layer.on('click', (e: LeafletMouseEvent) => {
                DomEvent.stopPropagation(e)
                layer.openPopup()
                if (activeStyle) {
                  ;(e.target as FeatureGroup).setStyle(activeStyle)
                }
              })
            },
          }}
        />
      ))}
      {NON_TILED_LAYERS_EXAMPLES.filter(({ id }) =>
        activeLayers.includes(id),
      ).map(({ url, options, id }) => (
        <NonTiledLayer key={id} url={url} options={options} />
      ))}
    </>
  )
}

export default MapLayersPanel
