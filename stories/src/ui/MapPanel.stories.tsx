import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { Map } from '@amsterdam/arm-core'
import MapPanelExample from '../examples/MapPanelExample'

export default {
  title: 'UI/Map Panel',
}

export const Default = {
  render: () => (
    <Map fullScreen>
      <MapPanelExample panelTitle="Legenda" panelSubTitle="Een kaartpaneel" />
    </Map>
  ),

  name: 'Default',
}

export const Mobile = {
  render: () => (
    <Map fullScreen>
      <MapPanelExample panelTitle="Legenda" panelSubTitle="Een kaartpaneel" />
    </Map>
  ),

  name: 'Mobile',

  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6',
    },
  },
}

export const WithoutHeader = {
  render: () => (
    <Map fullScreen>
      <MapPanelExample />
    </Map>
  ),

  name: 'Without header',
}
