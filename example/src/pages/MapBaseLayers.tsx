import React, { useState } from 'react'
import styled from 'styled-components'
import { Select, ViewerContainer } from '@datapunt/asc-ui'
import { Map } from '@datapunt/react-maps'
import Controls from '../../../src/components/Zoom'
import BaseLayer from '../../../src/components/BaseLayer'
import Scale from '../../../src/components/Scale'
import {
  MapLayer,
  DEFAULT_AMSTERDAM_LAYERS,
  DEFAULT_AMSTERDAM_MAPS_OPTIONS,
  AERIAL_AMSTERDAM_LAYERS,
} from '../../../src/constants'

const StyledMap = styled(Map)`
  width: 100%;
  height: 100vh;
`

const StyledViewerContainer = styled(ViewerContainer)`
  z-index: 400;
`

const MapBaseLayers: React.FC = () => {
  const [baseLayer, setBaseLayer] = useState(
    DEFAULT_AMSTERDAM_LAYERS[0].urlTemplate,
  )
  const handleChange = (
    e: React.FormEvent<HTMLSelectElement>,
    layers: MapLayer[],
  ) => {
    const { value } = e.currentTarget

    const layer = layers.find(({ id }) => id === value)

    if (layer) {
      setBaseLayer(layer.urlTemplate)
    }
  }

  return (
    <StyledMap options={DEFAULT_AMSTERDAM_MAPS_OPTIONS}>
      <Scale
        options={{
          position: 'bottomright',
          metric: true,
          imperial: false,
        }}
      />
      <StyledViewerContainer
        topLeft={
          <>
            <Select
              id="varianten"
              label="Varianten"
              onChange={e => handleChange(e, DEFAULT_AMSTERDAM_LAYERS)}
            >
              {DEFAULT_AMSTERDAM_LAYERS.map(({ id, label }) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </Select>
            <Select
              id="luchtfotos"
              label="Luchtfoto's"
              onChange={e => handleChange(e, AERIAL_AMSTERDAM_LAYERS)}
            >
              {AERIAL_AMSTERDAM_LAYERS.map(({ id, label }) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </Select>
          </>
        }
        bottomRight={<Controls />}
      />
      <BaseLayer baseLayer={baseLayer} />
    </StyledMap>
  )
}

export default MapBaseLayers
