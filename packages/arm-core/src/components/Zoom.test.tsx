// @ts-nocheck
import { render, fireEvent, screen } from '@testing-library/react'
import { useMapInstance } from '@amsterdam/react-maps'

import Zoom from './Zoom'

jest.mock('@amsterdam/react-maps')

describe('Zoom', () => {
  let setZoom: jest.Mock

  beforeEach(() => {
    setZoom = jest.fn()
    useMapInstance.mockImplementation(() => ({
      getZoom: () => 10,
      setZoom,
    }))
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    render(<Zoom />)

    expect(screen.queryByTestId('zoom')).toBeInTheDocument()
    expect(screen.queryByTestId('zoomIn')).toBeInTheDocument()
    expect(screen.queryByTestId('zoomOut')).toBeInTheDocument()
  })

  it('should handle click zoomIn', () => {
    render(<Zoom />)

    fireEvent.click(screen.getByTestId('zoomIn'))

    expect(setZoom).toHaveBeenCalledWith(11)
  })

  it('should handle click zoomOut', () => {
    render(<Zoom />)

    fireEvent.click(screen.getByTestId('zoomOut'))

    expect(setZoom).toHaveBeenCalledWith(9)
  })
})
