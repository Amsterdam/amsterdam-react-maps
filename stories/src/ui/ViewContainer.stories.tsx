import { Button, SearchBar } from '@amsterdam/asc-ui'
import { Map, BaseLayer, Zoom, ViewerContainer } from '@amsterdam/arm-core'

export default {
  title: 'UI/ViewerContainer',
  component: ViewerContainer,
}

export const Default = {
  render: () => (
    <Map fullScreen>
      <ViewerContainer
        bottomRight={<Zoom />}
        bottomLeft="Even some text is allowed"
        topLeft={<Button>I'm a random button</Button>}
        topRight={<SearchBar />}
      />
      <BaseLayer />
    </Map>
  ),

  name: 'Default',
}
