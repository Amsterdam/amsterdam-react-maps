import { Map, BaseLayer } from '@amsterdam/arm-core'
import { DEFAULT_AMSTERDAM_LAYERS } from '@amsterdam/arm-core/src/constants'

export default {
  title: 'UI/BaseLayer',
  component: BaseLayer,
}

export const Default = {
  render: () => (
    <Map fullScreen>
      <BaseLayer />
    </Map>
  ),

  name: 'Default',
}

export const Normal = {
  render: () => (
    <Map fullScreen>
      <BaseLayer baseLayer={DEFAULT_AMSTERDAM_LAYERS[0].urlTemplate} />
    </Map>
  ),

  name: 'Normal',
}

export const Light = {
  render: () => (
    <Map fullScreen>
      <BaseLayer baseLayer={DEFAULT_AMSTERDAM_LAYERS[1].urlTemplate} />
    </Map>
  ),

  name: 'Light',
}

export const BlackAndWhite = {
  render: () => (
    <Map fullScreen>
      <BaseLayer baseLayer={DEFAULT_AMSTERDAM_LAYERS[2].urlTemplate} />
    </Map>
  ),

  name: 'Black and white',
}
