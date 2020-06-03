import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { useMapInstance } from '@datapunt/react-maps'
import DrawTool from './DrawTool'
import {
  POLYGON_BUTTON_TITLE,
  POLYLINE_BUTTON_TITLE,
  TOGGLE_BUTTON_TITLE,
} from './config'

jest.mock('@datapunt/react-maps')

describe('DrawTool', () => {
  let onMock: jest.Mock
  let offMock: jest.Mock
  let addLayerMock: jest.Mock
  let removeLayerMock: jest.Mock
  let hasLayerMock: jest.Mock
  beforeEach(() => {
    onMock = jest.fn()
    offMock = jest.fn()
    addLayerMock = jest.fn()
    removeLayerMock = jest.fn()
    hasLayerMock = jest.fn(() => true)
    // @ts-ignore
    useMapInstance.mockImplementation(() => ({
      addLayer: addLayerMock,
      removeLayer: removeLayerMock,
      on: onMock,
      off: offMock,
      hasLayer: hasLayerMock,
    }))
  })
  describe('Toggle button', () => {
    it('should toggle the draw buttons', () => {
      const { getByTitle, queryByTitle } = render(<DrawTool />)
      const toggleButton = getByTitle(TOGGLE_BUTTON_TITLE)
      const polylineButton = queryByTitle(POLYLINE_BUTTON_TITLE)
      const polygonButton = queryByTitle(POLYGON_BUTTON_TITLE)
      expect(toggleButton).toBeDefined()

      expect(polylineButton).toBeNull()
      expect(polygonButton).toBeNull()

      fireEvent.click(toggleButton)

      expect(polylineButton).toBeDefined()
      expect(polygonButton).toBeDefined()

      fireEvent.click(toggleButton)

      expect(polylineButton).toBeNull()
      expect(polygonButton).toBeNull()
    })

    it('should toggle drawings on the map', () => {
      hasLayerMock = jest.fn(() => false)
      const onToggleMock = jest.fn()
      const { getByTitle } = render(<DrawTool onToggle={onToggleMock} />)
      const toggleButton = getByTitle(TOGGLE_BUTTON_TITLE)
      expect(onToggleMock).toHaveBeenCalledTimes(1)
      expect(addLayerMock).toHaveBeenCalledTimes(0)
      expect(removeLayerMock).toHaveBeenCalledTimes(0)
      // Open
      fireEvent.click(toggleButton)
      hasLayerMock = jest.fn(() => true)
      expect(onToggleMock).toHaveBeenCalledTimes(2)
      expect(addLayerMock).toHaveBeenCalledTimes(1)
      expect(removeLayerMock).toHaveBeenCalledTimes(0)

      // Close
      fireEvent.click(toggleButton)
      expect(onToggleMock).toHaveBeenCalledTimes(3)
      expect(addLayerMock).toHaveBeenCalledTimes(1)
      expect(removeLayerMock).toHaveBeenCalledTimes(1)
    })
  })
})
