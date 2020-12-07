import { MapLayers } from '@amsterdam/asc-assets'
import { Button } from '@amsterdam/asc-ui'
import styled from 'styled-components'
import React from 'react'
import Control from './Control'

export interface LegendControlProps {
  showDesktopVariant: boolean
  active: boolean
  onToggle: (active: boolean) => void
}

const StyledButton = styled(Button)`
  min-width: inherit;
`

const LegendControl: React.FC<LegendControlProps> = ({
  showDesktopVariant,
  active,
  onToggle,
}) => {
  const iconProps = showDesktopVariant
    ? { iconLeft: <MapLayers /> }
    : { icon: <MapLayers />, size: 32 }

  return (
    <Control>
      <StyledButton
        type="button"
        variant={active ? 'tertiary' : 'blank'}
        title="Legenda"
        iconSize={20}
        onClick={() => onToggle(!active)}
        {...iconProps}
      >
        Legenda
      </StyledButton>
    </Control>
  )
}

export default LegendControl
