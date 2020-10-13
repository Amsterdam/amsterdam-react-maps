import styled from 'styled-components'
import Map from './Map'

const MapContainer = styled.div`
  position: relative;
  height: 100%;
  z-index: 0;
  overflow: hidden;

  ${Map} {
    z-index: 0;
  }
`

export default MapContainer
