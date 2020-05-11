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
import BaseLayerToggle, {
  BaseLayerType,
} from '../../../src/components/BaseLayerToggle'

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
  const [toggleBaseLayerType, setToggleBaseLayerType] = useState(
    BaseLayerType.Aerial,
  )

  const [panelOpen, setPanelOpen] = useState(false)

  const handleChange = (
    e: React.FormEvent<HTMLSelectElement>,
    layers: MapLayer[],
    type: BaseLayerType,
  ) => {
    const { value } = e.currentTarget

    const layer = layers.find(({ id }) => id === value)

    if (layer) {
      setBaseLayer(layer.urlTemplate)
      // The opposite base layer will be set as type for the BaseLayerToggle
      setToggleBaseLayerType(
        type === BaseLayerType.Aerial
          ? BaseLayerType.Topo
          : BaseLayerType.Aerial,
      )
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
          panelOpen ? (
            <>
              <Select
                id="varianten"
                label="Varianten"
                onChange={(e) =>
                  handleChange(e, DEFAULT_AMSTERDAM_LAYERS, BaseLayerType.Topo)
                }
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
                onChange={(e) =>
                  handleChange(e, AERIAL_AMSTERDAM_LAYERS, BaseLayerType.Aerial)
                }
              >
                {AERIAL_AMSTERDAM_LAYERS.map(({ id, label }) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </Select>
            </>
          ) : null
        }
        bottomLeft={
          <BaseLayerToggle
            type={toggleBaseLayerType}
            open={panelOpen}
            onClick={setPanelOpen}
          />
        }
        bottomRight={<Controls />}
      />
      <BaseLayer baseLayer={baseLayer} />
    </StyledMap>
  )
}

export default MapBaseLayers
