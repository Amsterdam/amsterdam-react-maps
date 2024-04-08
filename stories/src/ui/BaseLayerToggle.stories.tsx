import {
  Map,
  ViewerContainer,
  BaseLayerToggle,
  constants,
} from '@amsterdam/arm-core'

export default {
  title: 'UI/BaseLayerToggle',
  component: BaseLayerToggle,
}

export const Default = {
  render: () => (
    <Map fullScreen>
      <ViewerContainer bottomLeft={<BaseLayerToggle />} />
    </Map>
  ),

  name: 'Default',
}

export const DualLayerToggle = {
  render: () => (
    <Map fullScreen>
      <ViewerContainer
        bottomLeft={
          <BaseLayerToggle
            aerialLayers={[constants.AERIAL_AMSTERDAM_LAYERS[0]]}
            topoLayers={[constants.DEFAULT_AMSTERDAM_LAYERS[0]]}
          />
        }
      />
    </Map>
  ),

  name: 'Dual layer toggle',
}
