import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { Button, svgFill, themeColor } from '@datapunt/asc-ui'
import { Close } from '@datapunt/asc-assets'
// @ts-ignore
import { ReactComponent as Measure } from '../../assets/icons/measure.svg'
// @ts-ignore
import { ReactComponent as Pencil } from '../../assets/icons/pencil.svg'
// @ts-ignore
import { ReactComponent as Polygon } from '../../assets/icons/polygon.svg'
// @ts-ignore
import { ReactComponent as Bin } from '../../assets/icons/bin.svg'
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

const ToolButton = styled(DrawToolButton)<{ isOpen: boolean }>`
  ${({ isOpen }) =>
    isOpen &&
    css`
      background-color: ${themeColor('secondary')};
      ${svgFill('tint', 'level1')}

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

type Props = {
  orientation: Orientation
  onStartPolygon: () => void
  onStartPolyline: () => void
  onRemove: () => void
  inEditMode: boolean
  inDrawMode: boolean
  onToggle?: (value: boolean) => void
  show?: boolean
  selectedLayer?: any
}

const DrawToolBare: React.FC<Props> = ({
  onStartPolygon,
  onStartPolyline,
  inEditMode,
  inDrawMode,
  show,
  onRemove,
  onToggle,
  orientation,
}) => {
  const [isOpen, setIsOpen] = useState(show || false)

  useEffect(() => {
    if (onToggle) {
      onToggle(isOpen)
    }
  }, [isOpen])

  return (
    <DrawToolStyle orientation={orientation}>
      <ToolButton
        title={TOGGLE_BUTTON_TITLE}
        size={44}
        disabled={inDrawMode}
        variant="blank"
        iconSize={isOpen ? 30 : 44}
        icon={isOpen ? <Close /> : <Pencil />}
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <DrawToolPanel>
          <DrawToolButton
            title={POLYLINE_BUTTON_TITLE}
            size={44}
            disabled={inDrawMode}
            variant="blank"
            iconSize={35}
            icon={<Measure />}
            onClick={onStartPolyline}
          />
          <DrawToolButton
            title={POLYGON_BUTTON_TITLE}
            size={44}
            disabled={inDrawMode}
            variant="blank"
            iconSize={35}
            icon={<Polygon />}
            onClick={onStartPolygon}
          />
          {inEditMode && (
            <RemoveButton
              title={REMOVE_BUTTON_TITLE}
              size={44}
              variant="blank"
              iconSize={35}
              icon={<Bin />}
              onClick={onRemove}
            />
          )}
        </DrawToolPanel>
      )}
    </DrawToolStyle>
  )
}

export default DrawToolBare
