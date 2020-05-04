import React from 'react'
import styled, { css } from 'styled-components'
import { Button, themeColor, themeSpacing, breakpoint } from '@datapunt/asc-ui'

const AerialBackground = require('../assets/aerial-background.png').default
const AerialBackgroundRetina = require('../assets/aerial-background@2.png')
  .default
const TopoBackground = require('../assets/topo-background.png').default
const TopoBackgroundRetina = require('../assets/topo-background@2.png').default

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

type Props = {
  open: boolean
  type: BaseLayerType
  onClick: Function
}

type InnerImageProps = {
  type: BaseLayerType
}

type InnerSpanProps = {
  open: boolean
}

const StyledButton = styled(Button)`
  outline: 2px solid rgb(0, 0, 0, 0.1);
  padding: 0px;
  display: flex;
`

const InnerBackground = styled.span<InnerImageProps>`
  padding: ${themeSpacing(3, 4)};
  height: inherit;
  text-align: left;
  background: ${({ type }) => `url(${BASE_LAYER_STYLE[type].background[0]})`};
  text-transform: capitalize;

  ${({ type }) => css`
    color: ${BASE_LAYER_STYLE[type].color};
    width: 120px;

    @media screen and ${breakpoint('max-width', 'mobileL')} {
      color: transparent;
      width: 44px;
    }
  `};

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    background: ${({
      type,
    }) => `url(${BASE_LAYER_STYLE[type].background[1]}) no-repeat top left /
      120px 44px`};
  }
`

const InnerSpan = styled.span<InnerSpanProps>`
  padding: ${themeSpacing(3, 4)};
  display: inline;

  ${({ open, theme }) => {
    return open
      ? `
          background-color: ${themeColor('secondary')({ theme })};
          color: ${themeColor('tint', 'level1')({ theme })};
        `
      : ``
  }}
`

const BaseLayerToggle: React.FC<Props> = ({ open, type, onClick }) => (
  <StyledButton variant="blank" onClick={() => onClick && onClick(!open)}>
    <InnerBackground type={type}>{type?.toString()}</InnerBackground>
    <InnerSpan open={open}>&hellip;</InnerSpan>
  </StyledButton>
)

export default BaseLayerToggle
