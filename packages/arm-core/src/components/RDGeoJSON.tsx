import { ascDefaultTheme, themeColor } from '@amsterdam/asc-ui'
import { useMapInstance } from '@amsterdam/react-maps'
import { GeoJsonProperties, Geometry } from 'geojson'
import L, { GeoJSONOptions } from 'leaflet'
import proj4 from 'proj4'
import 'proj4leaflet'
import { FunctionComponent, useEffect, useMemo } from 'react'
import { CRS_CONFIG } from '../utils/getCrsRd'

export const defaultStyle = {
  color: themeColor('support', 'invalid')({ theme: ascDefaultTheme }),
  fillColor: themeColor('support', 'invalid')({ theme: ascDefaultTheme }),
  weight: 2,
  opacity: 1.6,
  fillOpacity: 0.2,
}

proj4.defs(CRS_CONFIG.RD.code, CRS_CONFIG.RD.projection)

export interface RDGeoJSONProps {
  geometry: Geometry
  properties?: GeoJsonProperties
  options?: GeoJSONOptions
}

const RDGeoJSON: FunctionComponent<RDGeoJSONProps> = ({
  geometry,
  properties = null,
  options = { style: defaultStyle },
}) => {
  const mapInstance = useMapInstance()
  const geoJSON = useMemo(
    () =>
      L.Proj.geoJson(
        {
          type: 'Feature',
          geometry,
          properties,
          crs: {
            type: 'name',
            properties: {
              name: CRS_CONFIG.RD.code,
            },
          },
        },
        options,
      ),
    [geometry, properties, options],
  )

  useEffect(() => {
    geoJSON.addTo(mapInstance)

    return () => {
      geoJSON.removeFrom(mapInstance)
    }
  }, [geoJSON])

  return null
}

export default RDGeoJSON
