import { Close } from '@amsterdam/asc-assets'
import { Button, svgFill, themeColor } from '@amsterdam/asc-ui'
import { FunctionComponent } from 'react'
import styled, { css } from 'styled-components'
import {
  POLYGON_BUTTON_TITLE,
  POLYLINE_BUTTON_TITLE,
  REMOVE_BUTTON_TITLE,
  TOGGLE_BUTTON_TITLE,
} from './config'

const DrawToolButton = styled(Button)`
  border-bottom: 2px solid rgb(0, 0, 0, 0.1);
  &:last-child {
    border-bottom: none;
  }
`

export const ToolButton = styled(DrawToolButton)<{ isOpen: boolean }>`
  ${({ isOpen }) =>
    isOpen &&
    css`
      background-color: ${themeColor('secondary')};
      ${svgFill(themeColor('tint', 'level1'))}

      &:hover {
        background-color: ${themeColor('secondary')};
      }
    `}
`

const DrawToolPanel = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0;
`

const DrawToolStyle = styled.div<{ orientation?: Orientation }>`
  display: flex;
  flex-direction: column;
  border: 2px solid rgb(0, 0, 0, 0.1);
  ${({ orientation }) => {
    switch (orientation) {
      case 'vertical-bottom':
        return css`
          ${ToolButton} {
            order: 1;
          }
        `

      case 'horizontal-left':
        return css`
          flex-direction: row;

          ${DrawToolPanel} {
            flex-direction: row;
          }
        `

      case 'horizontal-right':
        return css`
          flex-direction: row;
          ${ToolButton} {
            order: 1;
          }

          ${DrawToolPanel} {
            flex-direction: row;
          }
        `

      default:
        return null
    }
  }}
`

const RemoveButton = styled(Button)`
  width: 100%;
`

type Orientation =
  | 'vertical-bottom'
  | 'vertical-top'
  | 'horizontal-left'
  | 'horizontal-right'

export interface DrawToolControlsProps {
  orientation: Orientation
  onStartPolygon: () => void
  onStartPolyline: () => void
  onRemove: () => void
  inEditMode: boolean
  inDrawMode: boolean
  onClose?: () => void
  disablePolygonButton?: boolean
  disablePolylineButton?: boolean
}

const DrawToolControls: FunctionComponent<DrawToolControlsProps> = ({
  onStartPolygon,
  onStartPolyline,
  inEditMode,
  inDrawMode,
  onRemove,
  orientation,
  onClose,
  disablePolygonButton,
  disablePolylineButton,
  ...otherProps
}) => (
  <DrawToolStyle orientation={orientation} {...otherProps}>
    <ToolButton
      title={TOGGLE_BUTTON_TITLE}
      size={44}
      disabled={inDrawMode}
      variant="blank"
      iconSize={30}
      icon={<Close />}
      isOpen
      onClick={onClose}
    />

    <DrawToolPanel>
      <DrawToolButton
        title={POLYLINE_BUTTON_TITLE}
        size={44}
        disabled={disablePolylineButton || inDrawMode}
        variant="blank"
        iconSize={35}
        icon={
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="#020202"
              d="M731.8 321l22.6-22.7 69.3 69.3 49.5-49.4-169.7-169.7-554.4 554.3 169.7 169.8 50.1-50.1-69.3-69.3 22.6-22.6 69.3 69.3 49.4-49.4-41-41 22.6-22.7 41 41.1 49.6-49.7-69.3-69.3 22.7-22.6 69.3 69.3 49.4-49.4-41-41 22.6-22.6 41 41 48.8-48.8-69.3-69.3 22.6-22.6 69.3 69.3 49.4-49.4-41-41 22.6-22.7 41 41.1 49.9-49.9z"
            />
          </svg>
        }
        onClick={onStartPolyline}
      />
      <DrawToolButton
        title={POLYGON_BUTTON_TITLE}
        size={44}
        disabled={disablePolygonButton || inDrawMode}
        variant="blank"
        iconSize={35}
        icon={
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            viewBox="0 0 1024 1024"
          >
            <path d="M815.6 713.9l-88.7-266.8h40.8v-184h-184v37.5l-269.1-92.1v-95.8h-184v184h72v417.2h-72v184h184v-72h414.1v72h184v-184h-97.1zm-86.9 72H314.6v-72h-72V296.7h72v-45.9l269.1 92.1v104.2h101.1l88.7 266.8h-44.7v72z" />
          </svg>
        }
        onClick={onStartPolygon}
      />
      {inEditMode && (
        <RemoveButton
          title={REMOVE_BUTTON_TITLE}
          size={44}
          variant="blank"
          iconSize={35}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
              <path d="M641.5 203.8v-85.2H383v85.2H229.2v48h43v652.7h480V251.8h43v-48H641.5zM415 150.7h194.4v53.2H415v-53.2zm3.2 609h-40V350.4h40v409.3zm113.9 0h-40V350.4h40v409.3zm114.3-409.3v409.3h-40V350.4" />
            </svg>
          }
          onClick={onRemove}
        />
      )}
    </DrawToolPanel>
  </DrawToolStyle>
)

export default DrawToolControls
