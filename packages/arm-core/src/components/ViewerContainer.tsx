import { themeSpacing } from '@amsterdam/asc-ui'
import styled, { css } from 'styled-components'

type Props = {
  topLeft?: React.ReactNode
  topRight?: React.ReactNode
  bottomLeft?: React.ReactNode
  bottomRight?: React.ReactNode
  metaData?: Array<string>
}

const OFFSET_UNIT = 4

const ViewerContainerWrapper = styled.div`
  bottom: 0;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 400;
`

type ViewerContainerItemProps = {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

export const ViewerContainerItem = styled.div<ViewerContainerItemProps>`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  pointer-events: all;
  position: absolute;

  & > * + * {
    margin-top: ${themeSpacing(OFFSET_UNIT)};
  }

  ${({ position }) => {
    switch (position) {
      case 'top-left':
        return css`
          left: ${themeSpacing(OFFSET_UNIT)};
          top: ${themeSpacing(OFFSET_UNIT)};
        `
      case 'top-right':
        return css`
          right: ${themeSpacing(OFFSET_UNIT)};
          top: ${themeSpacing(OFFSET_UNIT)};
        `
      case 'bottom-right':
        return css`
          bottom: ${themeSpacing(OFFSET_UNIT)};
          padding-right: ${themeSpacing(OFFSET_UNIT)};
          right: 0;
        `
      case 'bottom-left':
        return css`
          bottom: ${themeSpacing(OFFSET_UNIT)};
          left: ${themeSpacing(OFFSET_UNIT)};
        `
      default:
        return ''
    }
  }}
`
const ViewerContainer: React.FC<Props> = ({
  bottomLeft,
  topLeft,
  topRight,
  bottomRight,
  metaData,
  ...otherProps
}) => {
  return (
    <ViewerContainerWrapper {...otherProps}>
      <ViewerContainerItem position="top-left">{topLeft}</ViewerContainerItem>
      <ViewerContainerItem position="top-right">{topRight}</ViewerContainerItem>
      <ViewerContainerItem position="bottom-left">
        {bottomLeft}
      </ViewerContainerItem>
      <ViewerContainerItem position="bottom-right">
        {bottomRight}
        {metaData && (
          <div>
            {metaData.map(
              (string) =>
                string && (
                  <div key={string}>
                    <span>{string}</span>
                  </div>
                ),
            )}
          </div>
        )}
      </ViewerContainerItem>
    </ViewerContainerWrapper>
  )
}

export default ViewerContainer
