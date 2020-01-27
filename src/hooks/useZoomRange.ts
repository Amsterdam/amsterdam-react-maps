import { useState, useEffect, useCallback } from 'react'
import { MinMax } from '../types'

const useZoomRange = (zoomLevel: Partial<MinMax>) => {
  const [zoomRange, setZoomRange] = useState<MinMax>({
    min: 0,
    max: 23,
  })

  useEffect(() => {
    if (zoomLevel) {
      setZoomRange({ ...zoomRange, ...zoomLevel })
    }
  }, [zoomLevel])

  const isVisible = useCallback(
    currentZoom => {
      const { min, max } = zoomRange
      return min <= currentZoom && max >= currentZoom
    },
    [zoomRange],
  )
  return { isVisible }
}

export default useZoomRange
