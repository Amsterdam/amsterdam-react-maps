import { render } from '@testing-library/react'
import { Map } from '@amsterdam/arm-core'
import BaseLayer from './BaseLayer'

describe('BaseLayer', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    const { container } = render(
      <Map>
        <BaseLayer baseLayer="https://{s}.data.amsterdam.nl/topo_rd_zw/{z}/{x}/{y}.png" />
      </Map>,
    )

    // check for base layer image tile
    expect(
      container.querySelector(
        'img.leaflet-tile[src="https://t4.data.amsterdam.nl/topo_rd_zw/10/472/540.png"]',
      ),
    ).toBeInTheDocument()
  })
})
