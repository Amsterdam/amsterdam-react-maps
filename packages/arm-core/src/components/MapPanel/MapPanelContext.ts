import { createContext } from 'react'
import { SnapPoint } from './constants'

export type Variant = 'panel' | 'drawer'

type MapPanelContextProps = {
  setDrawerPosition: (position: number) => void
  topOffset: number
  drawerPosition: string
  draggable: boolean
  setDraggable: (draggable: boolean) => void
  matchPositionWithSnapPoint: (snapPoint: SnapPoint) => boolean
  setPositionFromSnapPoint: (snapPoint: SnapPoint) => void
  variant: Variant
}

export default createContext<MapPanelContextProps>({
  setDrawerPosition: () => {},
  drawerPosition: '0',
  draggable: false,
  setDraggable: () => {},
  matchPositionWithSnapPoint: () => false,
  setPositionFromSnapPoint: () => {},
  variant: 'panel',
  topOffset: 0,
})
