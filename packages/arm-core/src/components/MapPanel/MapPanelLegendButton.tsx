import { MapLayers } from '@amsterdam/asc-assets'
import { useContext } from 'react'
import ControlButton from '../ControlButton'
import { Overlay, SnapPoint } from './constants'
import MapPanelContext from './MapPanelContext'

type Props = {
  currentOverlay: Overlay
  setCurrentOverlay: (overlay: Overlay) => void
  showDesktopVariant: boolean
}

const MapPanelLegendButton: React.FC<Props> = ({
  showDesktopVariant,
  currentOverlay,
  setCurrentOverlay,
}) => {
  const { matchPositionWithSnapPoint, setPositionFromSnapPoint } = useContext(
    MapPanelContext,
  )
  const extraProps = showDesktopVariant
    ? { iconLeft: <MapLayers /> }
    : { icon: <MapLayers />, size: 32 }

  const handleClick = () => {
    if (matchPositionWithSnapPoint(SnapPoint.Closed)) {
      setPositionFromSnapPoint(SnapPoint.Halfway)
    } else if (currentOverlay === Overlay.Results) {
      setCurrentOverlay(Overlay.Legend)
    } else {
      setPositionFromSnapPoint(SnapPoint.Closed)
    }
  }

  return (
    <ControlButton
      type="button"
      variant={
        !matchPositionWithSnapPoint(SnapPoint.Closed) &&
        currentOverlay !== Overlay.Results
          ? 'secondary'
          : 'blank'
      }
      title="Legenda"
      iconSize={20}
      onClick={handleClick}
      {...extraProps}
    >
      Legenda
    </ControlButton>
  )
}

export default MapPanelLegendButton
