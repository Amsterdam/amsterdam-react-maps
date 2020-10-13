import { MapLayers } from '@amsterdam/asc-assets'
import { Button } from '@amsterdam/asc-ui'
import React from 'react'
import Control from './Control'

export interface LegendControlProps {
  showDesktopVariant: boolean
  active: boolean
  onToggle: (active: boolean) => void
}

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
      <Button
        type="button"
        variant={active ? 'secondary' : 'blank'}
        title="Legenda"
        iconSize={20}
        onClick={() => onToggle(!active)}
        {...iconProps}
      >
        Legenda
      </Button>
    </Control>
  )
}

export default LegendControl
