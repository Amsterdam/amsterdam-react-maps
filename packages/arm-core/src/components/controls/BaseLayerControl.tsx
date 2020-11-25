/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { Checkmark, Ellipsis } from '@amsterdam/asc-assets'
import {
  Button,
  ContextMenu,
  ContextMenuItem,
  ContextMenuSelect,
  Icon,
  themeColor,
  themeSpacing,
} from '@amsterdam/asc-ui'
import { TileLayerOptions } from 'leaflet'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import {
  AERIAL_AMSTERDAM_LAYERS,
  DEFAULT_AMSTERDAM_LAYERS,
  MapLayer,
} from '../../constants'
import BaseLayer from '../BaseLayer'
import Control from './Control'

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const AerialBackground: string = require('../../../static/aerial-background.png')
const AerialBackgroundRetina: string = require('../../../static/aerial-background@2.png')
const TopoBackground: string = require('../../../static/topo-background.png')
const TopoBackgroundRetina: string = require('../../../static/topo-background@2.png')
/* eslint-enable @typescript-eslint/no-unsafe-assignment */

export enum BaseLayerType {
  Aerial = 'luchtfoto',
  Topo = 'topografie',
}

const BASE_LAYER_STYLE = {
  [BaseLayerType.Aerial]: {
    background: [AerialBackground, AerialBackgroundRetina],
    color: 'white',
  },
  [BaseLayerType.Topo]: {
    background: [TopoBackground, TopoBackgroundRetina],
    color: 'black',
  },
}

type ToggleButtonProps = {
  layerType: BaseLayerType
}

const Wrapper = styled.div`
  padding: 0;
  display: flex;
`

const ToggleButton = styled(Button)<ToggleButtonProps>`
  padding: ${themeSpacing(3, 4)};
  align-self: self-start;
  text-align: left;
  background: ${({ layerType }) =>
    `url(${BASE_LAYER_STYLE[layerType].background[0]})`};
  text-transform: capitalize;
  width: 44px;
  margin-right: 2px;

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    background: ${({
      layerType,
    }) => `url(${BASE_LAYER_STYLE[layerType].background[1]}) no-repeat top left /
      120px 44px`};
  }

  &:focus {
    z-index: 2;
  }
`
const Menu = styled(ContextMenu)`
  & > button {
    border: none;
    height: 44px;
    min-width: 44px;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background-color: ${themeColor('tint', 'level3')};
    }
  }
  div[role='menu'] {
    max-height: 270px;
    overflow: auto;
    justify-content: flex-start;
    white-space: nowrap;
  }
`

const CheckmarkIcon = styled(Icon)`
  padding-left: ${themeSpacing(3)};
`

const StyledContextMenuItem = styled(ContextMenuItem)`
  justify-content: flex-start;
  padding-left: ${themeSpacing(6)};
  & > span:first-of-type {
    padding-left: 0;
    margin: ${themeSpacing(1, 1, 1, -4)};
  }
`

export interface BaseLayerControlProps {
  onChangeLayer?: (id: string, type: BaseLayerType) => void
  aerialLayers?: MapLayer[]
  topoLayers?: MapLayer[]
  aerialDefaultIndex?: number
  topoDefaultIndex?: number
  activeLayer?: BaseLayerType
  options?: TileLayerOptions
}

const BaseLayerControl: React.FC<BaseLayerControlProps> = ({
  onChangeLayer,
  aerialLayers = AERIAL_AMSTERDAM_LAYERS,
  topoLayers = DEFAULT_AMSTERDAM_LAYERS,
  aerialDefaultIndex = 0,
  topoDefaultIndex = 0,
  activeLayer = BaseLayerType.Topo,
  options,
}) => {
  const didMount = useRef(false)
  const [toggleBaseLayerType, setToggleBaseLayerType] = useState(activeLayer)

  const baseLayers = useMemo(() => {
    return {
      [BaseLayerType.Aerial]: aerialLayers,
      [BaseLayerType.Topo]: topoLayers,
    }
  }, [aerialLayers, topoLayers])

  const [selectedLayer, setSelectedLayer] = useState({
    [BaseLayerType.Aerial]: aerialLayers[aerialDefaultIndex].urlTemplate,
    [BaseLayerType.Topo]: topoLayers[topoDefaultIndex].urlTemplate,
  })

  const currentAmsterdamLayers =
    toggleBaseLayerType === BaseLayerType.Topo ? topoLayers : aerialLayers

  const handleToggle = useCallback(() => {
    setToggleBaseLayerType(
      toggleBaseLayerType === BaseLayerType.Aerial
        ? BaseLayerType.Topo
        : BaseLayerType.Aerial,
    )
  }, [toggleBaseLayerType])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLSelectElement>, layers: MapLayer[]) => {
      const { value } = e.currentTarget

      const layer = layers.find(({ id }) => id === value)

      if (layer) {
        setSelectedLayer({
          ...selectedLayer,
          [toggleBaseLayerType]: layer.urlTemplate,
        })
      }
    },
    [toggleBaseLayerType],
  )

  const layerTypeForButton = useMemo(
    () =>
      toggleBaseLayerType === BaseLayerType.Topo
        ? BaseLayerType.Aerial
        : BaseLayerType.Topo,
    [toggleBaseLayerType],
  )

  useEffect(() => {
    const id = currentAmsterdamLayers.find(
      ({ urlTemplate }) => urlTemplate === selectedLayer[toggleBaseLayerType],
    )?.id
    if (didMount.current && onChangeLayer && id) {
      onChangeLayer(id, toggleBaseLayerType)
    }
    didMount.current = true
  }, [toggleBaseLayerType, selectedLayer])

  return (
    <Control>
      <Wrapper>
        <ToggleButton
          variant="blank"
          title="Wissel tussen luchtfoto's en topografische kaarten"
          onClick={handleToggle}
          layerType={layerTypeForButton}
        />
        {baseLayers[toggleBaseLayerType].length > 1 && (
          <Menu
            data-test="context-menu"
            title="Actiemenu"
            arrowIcon={<Ellipsis />}
            selectElementForTouchScreen={
              <>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label
                  style={{ display: 'none' }}
                  htmlFor="arm-baselayer-toggle-select"
                >
                  Open menu
                </label>
                <ContextMenuSelect
                  name="context-menu"
                  id="arm-baselayer-toggle-select"
                  onChange={(e) => handleChange(e, currentAmsterdamLayers)}
                >
                  {baseLayers[toggleBaseLayerType].map(({ id, label }) => (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  ))}
                </ContextMenuSelect>
              </>
            }
            position="bottom"
          >
            {baseLayers[toggleBaseLayerType].map(
              ({ id, label, urlTemplate }) => (
                <StyledContextMenuItem
                  key={id}
                  onClick={(e) => {
                    setSelectedLayer({
                      ...selectedLayer,
                      [toggleBaseLayerType]: urlTemplate,
                    })
                    e.currentTarget.blur()
                  }}
                  icon={
                    urlTemplate === selectedLayer[toggleBaseLayerType] ? (
                      <CheckmarkIcon inline size={12}>
                        <Checkmark />
                      </CheckmarkIcon>
                    ) : null
                  }
                >
                  {label}
                </StyledContextMenuItem>
              ),
            )}
          </Menu>
        )}
        <BaseLayer
          options={options}
          baseLayer={selectedLayer[toggleBaseLayerType]}
        />
      </Wrapper>
    </Control>
  )
}

export default BaseLayerControl
