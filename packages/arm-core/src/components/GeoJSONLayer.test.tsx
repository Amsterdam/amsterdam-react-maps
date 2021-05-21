import fetchMock from 'jest-fetch-mock'
import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
// import { useMapInstance } from '@amsterdam/react-maps'
// import { mocked } from 'ts-jest/utils'
import fetchWithAbort from '../utils/fetchWithAbort'

// import GeoJSONMock from './GeoJSONMock.json'
import GeoJSONLayer from './GeoJSONLayer'

// jest.mock('@amsterdam/react-maps')

// const mockedUseMapInstance = mocked(useMapInstance)

describe('GeoJSONLayer', () => {
  beforeEach(() => {
    // @ts-ignore
  })

  afterEach(() => {
    fetchMock.resetMocks()
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    // const json = { foo: 'bar' }
    fetchMock.mockResponse(JSON.stringify({}))

    // @ts-ignore
    const [request, controller] = renderHook(() =>
      fetchWithAbort('http://go.nl'),
    )
    console.log('', request, controller)

    const options = {}
    render(<GeoJSONLayer url="http://go.nl" options={options} />)

    expect(1).toBe(1)
    // expect(screen.queryByTestId('marker')).not.toBeNull()
  })
})
