import L, { Map } from 'leaflet'

/**
 * Returns the bbox query string parameter for the current map extent.
 */
const getBBox = (mapInstance: Map) => {
  return `&${L.Util.getParamString({
    bbox: mapInstance.getBounds().toBBoxString(),
  }).substring(1)}`
}

export default getBBox
