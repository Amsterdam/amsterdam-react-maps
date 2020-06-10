import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import MapPanelContext from './MapPanelContext'
import { OPEN_LEGEND_TITLE, SnapPoint } from './constants'
import MapPanel from './MapPanel'

describe('MapPanel', () => {
  it('should toggle when clicking on the handle', () => {
    const setPositionFromSnapPointMock = jest.fn()
    const { getByTitle, rerender } = render(
      <MapPanelContext.Provider
        value={{
          matchPositionWithSnapPoint: jest.fn(() => false),
          setPositionFromSnapPoint: setPositionFromSnapPointMock,
          setDrawerPosition: jest.fn(),
          drawerPosition: '0',
          draggable: true,
          setDraggable: jest.fn(),
          variant: 'panel',
          topOffset: 0,
        }}
      >
        <MapPanel>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error nobis
          nulla odio?
        </MapPanel>
      </MapPanelContext.Provider>,
    )

    const handle = getByTitle(OPEN_LEGEND_TITLE)

    fireEvent.click(handle)
    expect(setPositionFromSnapPointMock).toHaveBeenCalledWith(SnapPoint.Halfway)

    rerender(
      <MapPanelContext.Provider
        // @ts-ignore
        value={{
          matchPositionWithSnapPoint: jest.fn(() => true),
          setPositionFromSnapPoint: setPositionFromSnapPointMock,
          setDrawerPosition: jest.fn(),
          drawerPosition: '0',
          draggable: true,
          setDraggable: jest.fn(),
          variant: 'panel',
          topOffset: 0,
        }}
      >
        <MapPanel>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error nobis
          nulla odio?
        </MapPanel>
      </MapPanelContext.Provider>,
    )

    fireEvent.click(handle)
    expect(setPositionFromSnapPointMock).toHaveBeenCalledWith(SnapPoint.Closed)
  })
})
