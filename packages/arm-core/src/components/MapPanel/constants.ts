// Position of the drawer when it's at the bottom
export const PANEL_HANDLE_HEIGHT = 50
export const PANEL_HANDLE_PADDING = 50
export const SNAP_OFFSET = 0.5 // 0 - 1, increase this to snap quicker to bottom or top, instead of middle
export const PANEL_HANDLE_PEEK = 20

export enum Overlay {
  Results,
  Legend,
  None,
}

export enum SnapPoint {
  Full,
  Halfway,
  Closed,
}

export type PositionPerSnapPoint = {
  [SnapPoint.Full]: string
  [SnapPoint.Halfway]: string
  [SnapPoint.Closed]: string
}

export const MAP_PANEL_DRAWER_SNAP_POSITIONS: PositionPerSnapPoint = {
  [SnapPoint.Full]: '0',
  [SnapPoint.Halfway]: '50%',
  [SnapPoint.Closed]: `calc(100% - ${
    PANEL_HANDLE_HEIGHT + PANEL_HANDLE_PEEK
  }px)`,
}

export const MAP_PANEL_SNAP_POSITIONS: PositionPerSnapPoint = {
  [SnapPoint.Full]: '480px',
  [SnapPoint.Halfway]: '480px',
  [SnapPoint.Closed]: '30px',
}

export const OPEN_LEGEND_TITLE = 'Open legenda'
