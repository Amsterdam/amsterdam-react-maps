import { renderHook } from '@testing-library/react-hooks'
import { Map } from 'leaflet'
import { FunctionComponent } from 'react'
import MapContext from './MapContext'
import { useMapInstance } from '../index'

describe('useMapInstance', () => {
  it.skip('should use the map instance', () => {
    const mockInstance = { foo: 'bar' } as unknown as Map
    const wrapper: FunctionComponent = ({ children }) => (
      <MapContext.Provider
        value={{
          mapInstance: mockInstance,
        }}
      >
        {children}
      </MapContext.Provider>
    )

    const { result } = renderHook(() => useMapInstance(), { wrapper })
    expect(result.current).toEqual(mockInstance)
  })

  it.skip("should throw an exception if the provider doesn't exist", () => {
    const { result } = renderHook(() => useMapInstance())
    expect(result.error).toBeDefined()
  })
})
