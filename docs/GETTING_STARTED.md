# Getting started

The instructions below cover how to use Amsterdam React Maps (ARM) in a React application.

To simply render a Map in your application, this would be the bare minimum setup:

1. Make sure you have the following dependencies installed:
`yarn add @datapunt/asc-assets @datapunt/asc-ui @datapunt/react-maps leaflet styled-components`

2. Add the following code to your application where you want to render the map, so it will look a bit like this:

```js
import 'leaflet/dist/leaflet.css' // make sure this is always included!
import { Map, BaseLayer } from '@datapunt/arm-core'

const MyComponent = () => {
  <Map fullScreen>
    <BaseLayer />
  </Map>
}

export default MyComponent
```

And that's it! Of course you want to add some interactions or components to the Map. For example, 
you want to add a toggle button that would switch the map "base layer" (the actual map):

```js
...
import { Map, ViewerContainer, BaseLayerToggle } from '@datapunt/arm-core'

const MyComponent = () => {
  <Map fullScreen>
    <ViewerContainer bottomLeft={<BaseLayerToggle />} />
  </Map>
}

...
```

Check out more examples in [storybook](https://amsterdam.github.io/amsterdam-react-maps/#/) or [stories directory](https://github.com/Amsterdam/amsterdam-react-maps/tree/master/stories)
