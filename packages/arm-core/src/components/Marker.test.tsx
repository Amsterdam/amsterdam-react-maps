import { render, screen } from '@testing-library/react'
import { useMapInstance } from '@amsterdam/react-maps'
import { mocked } from 'ts-jest/utils'

import Marker from './Marker'

jest.mock('@amsterdam/react-maps')

const mockedUseMapInstance = mocked(useMapInstance)

describe('Marker', () => {
  beforeEach(() => {
    // @ts-ignore
    mockedUseMapInstance.mockImplementation(() => ({}))
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    render(
      <div>
        <Marker latLng={{ lat: 52, lng: 4 }} />
      </div>,
    )
    // screen.debug()

    expect(screen.queryByTestId('marker')).toBeInTheDocument()
  })
})
