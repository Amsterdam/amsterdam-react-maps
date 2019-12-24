import React, {memo} from 'react'
import { Button } from '@datapunt/asc-ui'
import { Minimise, Enlarge } from '@datapunt/asc-assets'
import { useMapInstance } from '@datapunt/react-maps'

const Zoom = () => {
  const { mapInstance } = useMapInstance()
  if (mapInstance) {
    mapInstance.removeControl(mapInstance.zoomControl);
  }
  return (
    <div>
      <Button
        type="button"
        variant="blank"
        title="Inzoomen"
        size={32}
        iconSize={12}
        onClick={() => {
          mapInstance.setZoom(mapInstance.getZoom() + 1)
        }}
        icon={<Enlarge />}
      />
      <Button
        type="button"
        variant="blank"
        title="Inzoomen"
        size={32}
        iconSize={12}
        onClick={() => {
          mapInstance.setZoom(mapInstance.getZoom() - 1)
        }}
        icon={<Minimise />}
      />
    </div>
  )
}

export default memo(Zoom)
