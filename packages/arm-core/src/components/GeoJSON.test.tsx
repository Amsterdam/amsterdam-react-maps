import { render } from '@testing-library/react'
import { GeoJSONOptions } from 'leaflet'
import { GeoJSON as GeoJSONType } from 'geojson'
import Map from './Map'
import { GeoJSON } from '../index'

describe('GeoJSON', () => {
  const geojsonFeature: GeoJSONType = {
    type: 'Feature',
    properties: {
      name: 'Amsterdam',
    },
    geometry: {
      type: 'Point',
      coordinates: [52, 4],
    },
  }

  const mockOptions: GeoJSONOptions = {}

  it('should render correctly', () => {
    const { container } = render(
      <Map>
        <GeoJSON args={[geojsonFeature]} options={mockOptions} />
      </Map>,
    )

    expect(container.querySelectorAll(' .leaflet-map-pane').length).toBe(1)
  })
})
