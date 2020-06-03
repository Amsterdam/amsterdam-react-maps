import { useEffect, useState } from 'react'
import { useMapInstance } from '@datapunt/react-maps'
import { ascDefaultTheme, themeColor } from '@datapunt/asc-ui'
import L, { GeoJSON, GeoJSONOptions } from 'leaflet'
import proj4 from 'proj4'
import 'proj4leaflet'
import { GeoJsonProperties, Geometry } from 'geojson'
import { CRS_CONFIG } from '../utils/getCrsRd'

type Props = {
  geometry: Geometry
  properties?: GeoJsonProperties
  options?: GeoJSONOptions
}

export const defaultStyle = {
  color: themeColor('support', 'invalid')({ theme: ascDefaultTheme }),
  fillColor: themeColor('support', 'invalid')({ theme: ascDefaultTheme }),
  weight: 2,
  opacity: 1.6,
  fillOpacity: 0.2,
}

proj4.defs(CRS_CONFIG.RD.code, CRS_CONFIG.RD.projection)

const RDGeoJSON: React.FC<Props> = ({
  geometry,
  properties = null,
  options = { style: defaultStyle },
}) => {
  const mapInstance = useMapInstance()
  const [geoJSON, setGeoJSON] = useState<GeoJSON>()
  useEffect(() => {
    if (!mapInstance) {
      return
    }
    ;(async () => {
      if (geoJSON) {
        return
      }
      const geo = L.Proj.geoJson(
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
      )
      geo.addTo(mapInstance)
      setGeoJSON(geo)
    })()

    return () => {
      if (geoJSON && mapInstance) {
        geoJSON.removeFrom(mapInstance)
      }
    }
  }, [geoJSON, mapInstance])

  return null
}

export default RDGeoJSON
