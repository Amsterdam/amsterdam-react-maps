import { Map as ReactMap } from '@amsterdam/react-maps'
import { LeafletEventHandlerFnMap, MapOptions } from 'leaflet'
import React from 'react'
import styled, { css } from 'styled-components'
import { DEFAULT_AMSTERDAM_MAPS_OPTIONS } from '../constants'

type StyleProps = {
  fullScreen?: boolean
}

export type Props = {
  events?: LeafletEventHandlerFnMap
  options?: MapOptions
  setInstance?: (instance: L.Map) => void
} & StyleProps

const StyledMap = styled((
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { fullScreen, ...otherProps }, // make sure we don't pass the StyleProps to the ReactMap component
) => <ReactMap {...otherProps} />)<StyleProps>`
  ${({ fullScreen }) =>
    fullScreen &&
    css`
      width: 100%;
      height: 100%;
    `}
`

const Map: React.FC<Props> = ({
  children,
  options = DEFAULT_AMSTERDAM_MAPS_OPTIONS,
  ...otherProps
}) => <StyledMap {...{ options, ...otherProps }}>{children}</StyledMap>

export default Map
