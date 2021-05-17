import { render, fireEvent, screen } from '@testing-library/react'
import { useMapInstance } from '@amsterdam/react-maps'
import { mocked } from 'ts-jest/utils'

import Zoom from './Zoom'

jest.mock('@amsterdam/react-maps')

const mockedUseMapInstance = mocked(useMapInstance)

describe('Zoom', () => {
  let setZoom: jest.Mock

  beforeEach(() => {
    setZoom = jest.fn()
    // @ts-ignore
    mockedUseMapInstance.mockImplementation(() => ({
      getZoom: () => 10,
      setZoom,
    }))
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render correctly', () => {
    render(<Zoom />)

    expect(screen.queryByTestId('zoom')).not.toBeNull()
    expect(screen.queryByTestId('zoomIn')).not.toBeNull()
    expect(screen.queryByTestId('zoomOut')).not.toBeNull()
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
