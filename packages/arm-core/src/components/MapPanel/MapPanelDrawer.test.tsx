import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import * as MapPanelDrawer from './MapPanelDrawer'
import MapPanelContext from './MapPanelContext'
import {
  MAP_PANEL_DRAWER_SNAP_POSITIONS,
  OPEN_LEGEND_TITLE,
  SnapPoint,
} from './constants'

const MapDrawer = MapPanelDrawer.default

describe('MapDrawer', () => {
  it('should open halfway when clicking on the handle in a closed state', () => {
    const setDrawerPositionMock = jest.fn()
    const setPositionFromSnapPointMock = jest.fn()
    const { getByTitle } = render(
      <MapPanelContext.Provider
        value={{
          setDrawerPosition: setDrawerPositionMock,
          drawerPosition: '0',
          draggable: true,
          setDraggable: jest.fn(),
          // @ts-ignore
          matchPositionWithSnapPoint: jest.fn(
            () => MAP_PANEL_DRAWER_SNAP_POSITIONS[SnapPoint.Closed],
          ),
          setPositionFromSnapPoint: setPositionFromSnapPointMock,
          variant: 'drawer',
          topOffset: 0,
        }}
      >
        <MapDrawer>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error nobis
          nulla odio?
        </MapDrawer>
      </MapPanelContext.Provider>,
    )

    const handle = getByTitle(OPEN_LEGEND_TITLE)

    fireEvent.click(handle)
    expect(setPositionFromSnapPointMock).toHaveBeenNthCalledWith(
      1,
      SnapPoint.Halfway,
    )
  })

  it('should handle touch events', () => {
    const setDrawerPositionMock = jest.fn()
    const setPositionFromSnapPointMock = jest.fn()
    const setDraggableMock = jest.fn()
    const { getByTitle, container } = render(
      <MapPanelContext.Provider
        value={{
          setDrawerPosition: setDrawerPositionMock,
          drawerPosition: '0',
          draggable: true,
          setDraggable: setDraggableMock,
          matchPositionWithSnapPoint: jest.fn(),
          setPositionFromSnapPoint: setPositionFromSnapPointMock,
          variant: 'drawer',
          topOffset: 0,
        }}
      >
        <MapDrawer>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error nobis
          nulla odio?
        </MapDrawer>
      </MapPanelContext.Provider>,
    )

    const handle = getByTitle(OPEN_LEGEND_TITLE)

    fireEvent.touchStart(handle, {
      touches: [{ clientY: 0 }],
    })
    expect(setDraggableMock).toHaveBeenNthCalledWith(1, true)

    // @ts-ignore
    fireEvent.touchMove(container.firstChild, {
      touches: [{ clientY: 800 }],
    })

    expect(setDrawerPositionMock).toHaveBeenNthCalledWith(1, 800)

    fireEvent.touchEnd(handle)
    expect(setDraggableMock).toHaveBeenNthCalledWith(2, false)
    expect(setPositionFromSnapPointMock).toHaveBeenNthCalledWith(
      1,
      SnapPoint.Full,
    )
  })

  it('should handle snapping to top', () => {
    const getBoundingClientRectMock = jest.spyOn(
      MapPanelDrawer,
      'getBoundingClientRect',
    )
    let top = 193
    getBoundingClientRectMock.mockImplementation(
      () =>
        ({
          top,
        } as DOMRect),
    )

    const setPositionFromSnapPointMock = jest.fn()
    const { getByTitle } = render(
      <MapPanelContext.Provider
        value={{
          setDrawerPosition: jest.fn(),
          drawerPosition: '0',
          draggable: true,
          setDraggable: jest.fn(),
          matchPositionWithSnapPoint: jest.fn(),
          setPositionFromSnapPoint: setPositionFromSnapPointMock,
          variant: 'drawer',
          topOffset: 0,
        }}
      >
        <MapDrawer>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error nobis
          nulla odio?
        </MapDrawer>
      </MapPanelContext.Provider>,
    )

    const handle = getByTitle(OPEN_LEGEND_TITLE)
    fireEvent.touchEnd(handle)
    expect(setPositionFromSnapPointMock).toHaveBeenCalledWith(SnapPoint.Halfway)

    top = 191
    fireEvent.touchEnd(handle)
    expect(setPositionFromSnapPointMock).toHaveBeenCalledWith(SnapPoint.Full)

    top = 577
    fireEvent.touchEnd(handle)
    expect(setPositionFromSnapPointMock).toHaveBeenCalledWith(SnapPoint.Closed)
  })
})
