import { themeSpacing } from '@amsterdam/asc-ui'
import styled, { css } from 'styled-components'

type Props = {
  topLeft?: React.ReactNode
  topRight?: React.ReactNode
  bottomLeft?: React.ReactNode
  bottomRight?: React.ReactNode
  tabIndexTopLeft?: number
  tabIndexTopRight?: number
  tabIndexBottomLeft?: number
  tabIndexBottomRight?: number
  metaData?: Array<string>
}

const OFFSET_UNIT = 4

const ViewerContainerWrapper = styled.div`
  pointer-events: none;
  position: relative;
  width: 100%;
  height: 100%;
  top: -100%;
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
  tabIndexTopLeft,
  tabIndexTopRight,
  tabIndexBottomLeft,
  tabIndexBottomRight,
  metaData,
  ...otherProps
}) => {
  return (
    <ViewerContainerWrapper {...otherProps} data-testid="container">
      <ViewerContainerItem position="top-left" tabIndex={tabIndexTopLeft || 1} data-testid="topLeft">
        {topLeft}
      </ViewerContainerItem>
      <ViewerContainerItem position="top-right" tabIndex={tabIndexTopRight || 2} data-testid="topRight">
        {topRight}
      </ViewerContainerItem>
      <ViewerContainerItem position="bottom-left" tabIndex={tabIndexBottomLeft || 3} data-testid="bottomLeft">
        {bottomLeft}
      </ViewerContainerItem>
      <ViewerContainerItem position="bottom-right" tabIndex={tabIndexBottomRight || 4} data-testid="bottomRight">
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
