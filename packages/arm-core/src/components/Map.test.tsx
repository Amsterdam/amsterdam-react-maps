// @ts-nocheck
import { render, screen } from '@testing-library/react'
import Map from './Map'

describe('Map', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render default', () => {
    const { container } = render(<Map>map content</Map>)

    expect(screen.queryByText('map content')).toBeInTheDocument()

    expect(
      container.querySelector('.leaflet-container .leaflet-map-pane'),
    ).toBeInTheDocument()
  })

  it('should render fullScreen', () => {
    const { container } = render(<Map fullScreen>map content</Map>)

    expect(container.firstChild).toHaveStyleRule('width', '100%')
    expect(container.firstChild).toHaveStyleRule('height', '100%')
  })
})
