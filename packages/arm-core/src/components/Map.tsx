import {
  Map as ReactMap,
  MapProps as ReactMapProps,
} from '@amsterdam/react-maps'
import { FunctionComponent } from 'react'
import styled, { css } from 'styled-components'
import { DEFAULT_AMSTERDAM_MAPS_OPTIONS } from '../constants'

export interface MapProps extends ReactMapProps {
  fullScreen?: boolean
  children?: React.ReactNode
}

const Map = styled<FunctionComponent<MapProps>>(
  ({
    children,
    options = DEFAULT_AMSTERDAM_MAPS_OPTIONS,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fullScreen,
    ...otherProps
  }) => (
    <ReactMap options={options} {...otherProps}>
      {children}
    </ReactMap>
  ),
)`
  ${({ fullScreen }) =>
    fullScreen &&
    css`
      width: 100%;
      height: 100%;
    `}
`

export default Map
