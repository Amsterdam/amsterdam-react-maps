import { Polygon, Polyline } from 'leaflet'

type extraLayerTypes = {
  id: string
  editing: { _enabled: boolean; disable: () => void }
}

export type PolygonType = extraLayerTypes & Polygon
export type PolylineType = extraLayerTypes & Polyline

export type ExtendedLayer = PolygonType | PolylineType
