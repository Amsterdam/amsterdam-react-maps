import React from 'react'
import { Map as LeafletMap } from '@datapunt/react-maps'
import { LeafletEventHandlerFnMap, MapOptions } from 'leaflet'
import { DEFAULT_AMSTERDAM_MAPS_OPTIONS } from '../constants'

export interface Props {
  events?: LeafletEventHandlerFnMap
  options?: MapOptions
  setInstance?: (instance: L.Map) => void
}

const Map: React.FC<Props> = ({
  children,
  options = DEFAULT_AMSTERDAM_MAPS_OPTIONS,
  events,
  setInstance,
  ...otherProps
}) => (
  <LeafletMap {...{ options, setInstance, events, ...otherProps }}>
    {children}
  </LeafletMap>
)

export default Map
