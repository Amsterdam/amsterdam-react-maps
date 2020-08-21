import { Close } from '@datapunt/asc-assets'
import {
  breakpoint,
  Button,
  Heading,
  themeColor,
  themeSpacing,
} from '@datapunt/asc-ui'
import React, { useContext } from 'react'
import styled, { css, keyframes } from 'styled-components'
import {
  PANEL_HANDLE_HEIGHT,
  PANEL_HANDLE_PADDING,
  SnapPoint,
} from './constants'
import MapDrawerContext, { Variant } from './MapPanelContext'

export interface MapPanelContentProps {
  title?: string
  subTitle?: string
  onClose?: () => void
  stackOrder?: number
  variant?: Variant
  animate?: boolean
}

const Header = styled.header`
  padding: ${themeSpacing(4)};
  padding-bottom: 0;
`

const SubTitleHeading = styled(Heading)`
  margin: 0 0 ${themeSpacing(1)} 0;
  font-size: 22px;
  line-height: 22px;
  color: ${themeColor('secondary', 'main')};
`

const CloseButton = styled(Button)`
  float: right;
`

const StyledContainer = styled.div<{ containerHeight: '50vh' | '100vh' }>`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${themeColor('tint', 'level1')};
  width: 100%;
  height: 100%;
  align-content: flex-start;
  touch-action: none;

  @media screen and ${breakpoint('min-width', 'tabletM')} {
    pointer-events: all;
  }

  @media screen and ${breakpoint('max-width', 'tabletM')} {
    top: ${PANEL_HANDLE_PADDING * -1}px;
    height: calc(
      ${({ containerHeight }) => containerHeight} - ${PANEL_HANDLE_HEIGHT}px
    );
  }
`

const slideFromBottom = keyframes`
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0%);
  }
`

const slideFromLeft = keyframes`
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
`

const MapDrawerContentStyle = styled.div<{
  stackOrder?: number
  variant?: Variant
  animate?: boolean
}>`
  position: absolute;
  bottom: 0;
  top: 0;
  width: 100%;
  background-color: ${themeColor('tint', 'level1')};
  z-index: 0;
  ${({ stackOrder }) =>
    stackOrder &&
    stackOrder > 0 &&
    css`
      box-shadow: 1px 1px 5px 0 #00000042;
      z-index: ${stackOrder * 10};
      width: calc(100% - ${stackOrder > 2 ? stackOrder * 5 : 0}px);
    `}
  ${({ animate, variant }) =>
    animate &&
    css`
      animation: ${variant === 'panel' ? slideFromLeft : slideFromBottom} 0.3s
        ease-in-out;
    `}
`

const Content = styled.div`
  width: 100%;
  padding: ${themeSpacing(4, 4, 0, 4)};
  overflow: auto;
  pointer-events: all;

  /* Firefox does not support padding on the bottom when scrolling, so we need to work around this (see: https://bugzilla.mozilla.org/show_bug.cgi?id=748518). */
  ::after {
    content: '';
    display: block;
    width: 100%;
    height: ${themeSpacing(4)};
  }

  @media screen and ${breakpoint('max-width', 'tabletM')} {
    padding-bottom: ${themeSpacing(
      30,
    )}; // extra padding due to iOS' navigation bar
  }

  background: linear-gradient(white 30%, rgba(255, 255, 255, 0)),
    linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 100%,
    radial-gradient(50% 0, farthest-side, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)),
    radial-gradient(
        50% 100%,
        farthest-side,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      )
      0 100%;
  background: linear-gradient(white 30%, rgba(255, 255, 255, 0)),
    linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 100%,
    radial-gradient(
      farthest-side at 50% 0,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0)
    ),
    radial-gradient(
        farthest-side at 50% 100%,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      )
      0 100%;
  background-repeat: no-repeat;
  background-color: white;
  background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px;
  background-attachment: local, local, scroll, scroll;
`

const MapPanelContent: React.FC<MapPanelContentProps> = ({
  title,
  subTitle,
  animate,
  stackOrder,
  children,
  onClose,
  ...otherProps
}) => {
  const { matchPositionWithSnapPoint, variant } = useContext(MapDrawerContext)
  const showHeader = !!(title || onClose || subTitle)
  return (
    <MapDrawerContentStyle {...{ variant, stackOrder, animate }}>
      <StyledContainer
        containerHeight={
          matchPositionWithSnapPoint(SnapPoint.Halfway) ? '50vh' : '100vh'
        }
      >
        {showHeader && (
          <Header>
            {onClose && (
              <CloseButton
                variant="blank"
                title="Sluit"
                type="button"
                size={30}
                onClick={onClose}
                icon={<Close />}
              />
            )}
            {subTitle && <SubTitleHeading as="h3">{subTitle}</SubTitleHeading>}
            {title && (
              <Heading as="h4" styleAs="h1">
                {title}
              </Heading>
            )}
          </Header>
        )}
        <Content {...otherProps}>{children}</Content>
      </StyledContainer>
    </MapDrawerContentStyle>
  )
}

export default MapPanelContent
