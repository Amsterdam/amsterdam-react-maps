# Getting started

The instructions below cover how to use Amsterdam React Maps (ARM) in a React application.

To simply render a Map in your application, this would be the bare minimum setup:

1. Install the core package: `npm install @amsterdam/arm-core`

2. Make sure you have the following peer dependencies installed:
`npm install @amsterdam/asc-assets @amsterdam/asc-ui @amsterdam/react-maps leaflet styled-components`

If you want to install other packages, make sure you have the peer-dependencies installed as well. For example:
`arm-draw` has an extra peer-dependency of `leaflet-draw`, so make sure you have that installed.

3. Add the following code to your application where you want to render the map, so it will look a bit like this:

```js
import 'leaflet/dist/leaflet.css' // make sure this is always included!
import { Map, BaseLayer } from '@amsterdam/arm-core'

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
import { Map, ViewerContainer, BaseLayerToggle } from '@amsterdam/arm-core'

const MyComponent = () => {
  <Map fullScreen>
    <ViewerContainer bottomLeft={<BaseLayerToggle />} />
  </Map>
}

...
```

Check out more examples in [storybook](https://amsterdam.github.io/amsterdam-react-maps/#/) or [stories directory](https://github.com/Amsterdam/amsterdam-react-maps/tree/master/stories)
