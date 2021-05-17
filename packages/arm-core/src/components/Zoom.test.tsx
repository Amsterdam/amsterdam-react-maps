import { render, fireEvent, screen } from '@testing-library/react'
import { useMapInstance } from '@amsterdam/react-maps'
import { mocked } from 'ts-jest/utils'

import Zoom from './Zoom'

jest.mock('@amsterdam/react-maps')

const mockedUseMapInstance = mocked(useMapInstance)

describe('Zoom', () => {
  //   let getZoom: jest.Mock
  let setZoom: jest.Mock

  beforeEach(() => {
    // getZoom = jest.fn()
    setZoom = jest.fn()
    // @ts-ignore
    mockedUseMapInstance.mockImplementation(() => ({
      getZoom: () => 10,
      setZoom,
    }))
  })

  it('should render correctly', () => {
    render(<Zoom />)

    expect(screen.queryByTestId('zoom')).not.toBeNull()
    expect(screen.queryByTestId('zoomIn')).not.toBeNull()
    expect(screen.queryByTestId('zoomOut')).not.toBeNull()

    fireEvent.click(screen.getByTestId('zoomIn'))

    expect(setZoom).toHaveBeenCalledWith(11)

    fireEvent.click(screen.getByTestId('zoomOut'))

    expect(setZoom).toHaveBeenCalledWith(9)
  })
})
