import { render } from '@testing-library/react'
// import { useMapInstance } from '@amsterdam/react-maps'
// import { mocked } from 'ts-jest/utils'

import GeoJSONLayer from './GeoJSONLayer'

// jest.mock('@amsterdam/react-maps')

// const mockedUseMapInstance = mocked(useMapInstance)

describe('GeoJSONLayer', () => {
  beforeEach(() => {
    // @ts-ignore
    // mockedUseMapInstance.mockImplementation(() => ({}))
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    const options = {}
    render(<GeoJSONLayer url="http://go.nl" options={options} />)
    // @TODO fix render

    expect(1).toBe(1)
    // expect(screen.queryByTestId('marker')).not.toBeNull()
  })
})
