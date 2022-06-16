import { Enlarge, Minimise } from '@amsterdam/asc-assets'
import { themeSpacing } from '@amsterdam/asc-ui'
import { useMapInstance } from '@amsterdam/react-maps'
import { memo } from 'react'
import styled from 'styled-components'
import ControlButton from './ControlButton'

const ZoomBar = styled.div`
  margin-bottom: ${themeSpacing(1)};
`

interface Props {
  tabIndexIn?: number
  tabIndexOut?: number
}

const Zoom: React.FC<Props> = ({ tabIndexIn, tabIndexOut }) => {
  const mapInstance = useMapInstance()

  const handleZoom = (out = false) => {
    mapInstance.setZoom(mapInstance.getZoom() + (out ? -1 : 1))
  }

  return (
    <ZoomBar data-testid="zoom">
      <ControlButton
        type="button"
        variant="blank"
        title="Inzoomen"
        size={44}
        iconSize={20}
        data-testid="zoomIn"
        tabIndex={tabIndexIn || 1}
        onClick={() => {
          handleZoom()
        }}
        icon={<Enlarge />}
      />
      <ControlButton
        type="button"
        variant="blank"
        title="Uitzoomen"
        size={44}
        iconSize={20}
        data-testid="zoomOut"
        tabIndex={tabIndexOut || 2}
        onClick={() => {
          handleZoom(true)
        }}
        icon={<Minimise />}
      />
    </ZoomBar>
  )
}

export default memo(Zoom)
