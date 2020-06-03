/* eslint-disable global-require */
import React, { useCallback, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
import {
  breakpoint,
  Button,
  ContextMenu,
  ContextMenuItem,
  ContextMenuSelect,
  Icon,
  themeColor,
  themeSpacing,
} from '@datapunt/asc-ui'
import { Checkmark, Ellipsis } from '@datapunt/asc-assets'
import {
  AERIAL_AMSTERDAM_LAYERS,
  DEFAULT_AMSTERDAM_LAYERS,
  MapLayer,
} from '../constants'
import BaseLayer from './BaseLayer'

const AerialBackground = require('../assets/aerial-background.png')
  .default as string
const AerialBackgroundRetina = require('../assets/aerial-background@2.png')
  .default as string
const TopoBackground = require('../assets/topo-background.png')
  .default as string
const TopoBackgroundRetina = require('../assets/topo-background@2.png')
  .default as string

export enum BaseLayerType {
  Aerial = 'luchtfoto',
  Topo = 'topografie',
}

const BASE_LAYERS = {
  [BaseLayerType.Aerial]: AERIAL_AMSTERDAM_LAYERS,
  [BaseLayerType.Topo]: DEFAULT_AMSTERDAM_LAYERS,
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

const StyledButton = styled.div`
  outline: 2px solid rgb(0, 0, 0, 0.1);
  padding: 0;
  display: flex;
`

const ToggleButton = styled(Button)<ToggleButtonProps>`
  padding: ${themeSpacing(3, 4)};
  height: inherit;
  align-self: self-start;
  text-align: left;
  background: ${({ layerType }) =>
    `url(${BASE_LAYER_STYLE[layerType as BaseLayerType].background[0]})`};
  text-transform: capitalize;

  ${({ layerType }) => css`
    color: ${BASE_LAYER_STYLE[layerType as BaseLayerType].color};
    width: 120px;

    @media screen and ${breakpoint('max-width', 'mobileL')} {
      color: transparent;
      overflow: hidden;
      width: 44px;
    }
  `};

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    background: ${({ layerType }) => `url(${
      BASE_LAYER_STYLE[layerType as BaseLayerType].background[1]
    }) no-repeat top left /
      120px 44px`};
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

const BaseLayerToggle: React.FC = () => {
  const [toggleBaseLayerType, setToggleBaseLayerType] = useState(
    BaseLayerType.Topo,
  )
  const [selectedLayer, setSelectedLayer] = useState({
    [BaseLayerType.Aerial]: AERIAL_AMSTERDAM_LAYERS[0].urlTemplate,
    [BaseLayerType.Topo]: DEFAULT_AMSTERDAM_LAYERS[0].urlTemplate,
  })

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

  return (
    <StyledButton>
      <ToggleButton
        variant="blank"
        title="Wissel tussen luchtfoto's of een topografische kaarten"
        onClick={handleToggle}
        layerType={layerTypeForButton}
      >
        {layerTypeForButton?.toString()}
      </ToggleButton>
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
              onChange={(e) => handleChange(e, DEFAULT_AMSTERDAM_LAYERS)}
            >
              {BASE_LAYERS[toggleBaseLayerType].map(({ id, label }) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </ContextMenuSelect>
          </>
        }
        position="bottom"
      >
        {BASE_LAYERS[toggleBaseLayerType].map(({ id, label, urlTemplate }) => (
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
        ))}
      </Menu>
      <BaseLayer baseLayer={selectedLayer[toggleBaseLayerType]} />
    </StyledButton>
  )
}

export default BaseLayerToggle
