import { render, screen } from '@testing-library/react'
import Map from './Map'

describe('Map', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    const { container } = render(<Map>map content</Map>)

    screen.debug()

    expect(
      container.querySelector('.leaflet-container .leaflet-map-pane'),
    ).toBeInTheDocument()
  })
})
