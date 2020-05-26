import React, { useState } from 'react'
import styled from 'styled-components'
import { Select, ViewerContainer } from '@datapunt/asc-ui'
import Controls from '../../../src/components/Zoom'
import BaseLayer from '../../../src/components/BaseLayer'
import Map from '../../../src/components/Map'
import {
  MapLayer,
  DEFAULT_AMSTERDAM_LAYERS,
  AERIAL_AMSTERDAM_LAYERS,
} from '../../../src/constants'
import BaseLayerToggle, {
  BaseLayerType,
} from '../../../src/components/BaseLayerToggle'

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
    <Map fullScreen>
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
    </Map>
  )
}

export default MapBaseLayers
