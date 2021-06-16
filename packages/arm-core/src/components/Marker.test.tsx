import { render } from '@testing-library/react'
import { Map } from '@amsterdam/arm-core'
import Marker from './Marker'

describe('Marker', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    const { container } = render(
      <Map>
        <Marker latLng={{ lat: 52, lng: 4 }} />
      </Map>,
    )

    expect(
      container.querySelector('.leaflet-marker-pane .leaflet-marker-icon'),
    ).toBeInTheDocument()
  })
})
