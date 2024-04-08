import { Map, ViewerContainer, BaseLayer } from '@amsterdam/arm-core'
import PointClickResults from '../examples/PointClickResults'

export default {
  title: 'Other/Click and Search Nearby',
}

export const Default = {
  render: () => (
    <Map fullScreen>
      <ViewerContainer topRight={<PointClickResults />} />
      <BaseLayer />
    </Map>
  ),

  name: 'Default',
}
