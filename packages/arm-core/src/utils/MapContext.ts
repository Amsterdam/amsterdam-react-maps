import { createContext } from 'react'
import { Map } from 'leaflet'

const MapContext = createContext<{ mapInstance: Map | null }>({
  mapInstance: null,
})

export default MapContext
