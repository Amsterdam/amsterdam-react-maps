import { useMapInstance } from '@datapunt/react-maps'
import { LatLngLiteral } from 'leaflet'

const usePanToLatLng = () => {
  const mapInstance = useMapInstance()
  /**
   * Pan to a position on the map
   * @param latLng Latitude Longitude { lat: number, lng: number }
   * @param offsetDirection In case you for example need to show a panel, you probably want to give a slight offset to the position you want to center, this can be either horizontal or vertical
   * @param offset The offset in percentage
   */
  const pan = (
    latLng: LatLngLiteral,
    offsetDirection?: 'horizontal' | 'vertical',
    offset?: number,
  ) => {
    if (mapInstance) {
      const {
        // @ts-ignore
        _southWest: { lat: swLat, lng: swLng },
        // @ts-ignore
        _northEast: { lat: neLat, lng: neLng },
      } = mapInstance.getBounds()

      if (offsetDirection === 'vertical') {
        const extraLat = (swLat - neLat) * (offset ? offset / 100 : 0)
        const { lat: markerLat, lng } = latLng
        const lat = markerLat + extraLat
        mapInstance.panTo({
          lng,
          lat,
        })
      } else {
        const extraLng = (swLng - neLng) * (offset ? offset / 100 : 0)
        const { lat, lng: markerLng } = latLng
        const lng = markerLng + extraLng
        mapInstance.panTo({
          lng,
          lat,
        })
      }
    }
  }
  return {
    pan,
  }
}

export default usePanToLatLng
