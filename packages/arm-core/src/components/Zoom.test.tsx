import { render, fireEvent, screen } from '@testing-library/react'
import { useMapInstance } from '@amsterdam/react-maps'

import Zoom from './Zoom'

jest.mock('@amsterdam/react-maps')

describe('Zoom', () => {
  let setZoom: jest.Mock

  beforeEach(() => {
    setZoom = jest.fn()
    // @ts-ignore
    useMapInstance.mockImplementation(() => ({
      getZoom: () => 10,
      setZoom,
    }))
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    //@ts-ignore
    render(<Zoom />)

    expect(screen.queryByTestId('zoom')).toBeInTheDocument()
    expect(screen.queryByTestId('zoomIn')).toBeInTheDocument()
    expect(screen.queryByTestId('zoomOut')).toBeInTheDocument()
  })

  it('should handle click zoomIn', () => {
    //@ts-ignore
    render(<Zoom />)

    fireEvent.click(screen.getByTestId('zoomIn'))

    expect(setZoom).toHaveBeenCalledWith(11)
  })

  it('should handle click zoomOut', () => {
    //@ts-ignore
    render(<Zoom />)

    fireEvent.click(screen.getByTestId('zoomOut'))

    expect(setZoom).toHaveBeenCalledWith(9)
  })
})
