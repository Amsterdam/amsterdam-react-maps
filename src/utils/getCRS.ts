import L, { Bounds, BoundsLiteral } from 'leaflet'
import 'proj4'
import 'proj4leaflet'

const CRS_CONFIG = {
  RD: {
    code: 'EPSG:28992',
    projection: `+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs'`,
    transformation: {
      resolutions: [
        3440.64,
        1720.32,
        860.16,
        430.08,
        215.04,
        107.52,
        53.76,
        26.88,
        13.44,
        6.72,
        3.36,
        1.68,
        0.84,
        0.42,
        0.21,
        0.105,
        0.0525,
      ],
      bounds: [
        [-285401.92, 22598.08],
        [595301.9199999999, 903301.9199999999],
      ] as BoundsLiteral,
      origin: [-285401.92, 22598.08],
    },
  },
  WGS84: {
    code: 'EPSG:4326',
    projection: '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs',
  },
  EARTH_RADIUS: 6378137, // The radius in meters
}

export default () => {
  const rdSettings = CRS_CONFIG.RD
  rdSettings.transformation.bounds = L.bounds.apply<
    null,
    BoundsLiteral,
    Bounds
  >(null, CRS_CONFIG.RD.transformation.bounds)
  const crs = new L.Proj.CRS(
    rdSettings.code,
    rdSettings.projection,
    rdSettings.transformation,
  )

  crs.distance = L.CRS.Earth.distance
  crs.R = CRS_CONFIG.EARTH_RADIUS

  return crs
}
