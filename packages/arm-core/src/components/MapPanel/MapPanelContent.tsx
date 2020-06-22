import React, { useContext } from 'react'
import {
  breakpoint,
  Button,
  Heading,
  themeColor,
  themeSpacing,
} from '@datapunt/asc-ui'
import styled, { css, keyframes } from 'styled-components'
import { Close } from '@datapunt/asc-assets'
import MapDrawerContext, { Variant } from './MapPanelContext'
import {
  PANEL_HANDLE_HEIGHT,
  PANEL_HANDLE_PADDING,
  SnapPoint,
} from './constants'

type StyleProps = {
  stackOrder?: number
  variant?: Variant
  animate?: boolean
}

type Props = {
  title: string
  onClose?: () => void
} & StyleProps

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-self: flex-start;
  width: 100%;
  padding-bottom: ${themeSpacing(5)};
`

const StyledButton = styled(Button)`
  position: relative;
  z-index: 2; // Make sure the button is on not beneath the MapDrawer's Handle
`

const StyledContainer = styled.div<{ containerHeight: '50vh' | '100vh' }>`
  position: relative;
  background-color: ${themeColor('tint', 'level1')};
  height: 100%;
  align-content: flex-start;
  touch-action: none;
  padding: ${themeSpacing(0, 2)};

  @media screen and ${breakpoint('min-width', 'tabletM')} {
    margin: ${themeSpacing(5, 0)};
    pointer-events: all;
    height: calc(100% - ${themeSpacing(5)});
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

const MapDrawerContentStyle = styled.div<StyleProps>`
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
  max-height: calc(100% - 50px);
  overflow: auto;
  pointer-events: all;
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

const MapPanelContent: React.FC<Props> = ({
  title,
  animate,
  stackOrder,
  children,
  onClose,
  ...otherProps
}) => {
  const { matchPositionWithSnapPoint, variant } = useContext(MapDrawerContext)

  return (
    <MapDrawerContentStyle {...{ variant, stackOrder, animate }}>
      <StyledContainer
        containerHeight={
          matchPositionWithSnapPoint(SnapPoint.Halfway) ? '50vh' : '100vh'
        }
      >
        <Header>
          <Heading as="h4" styleAs="h1">
            {title}
          </Heading>
          {onClose && (
            <StyledButton
              variant="blank"
              title="Sluit"
              type="button"
              size={30}
              onClick={onClose}
              icon={<Close />}
            />
          )}
        </Header>
        <Content {...otherProps}>{children}</Content>
      </StyledContainer>
    </MapDrawerContentStyle>
  )
}

export default MapPanelContent
