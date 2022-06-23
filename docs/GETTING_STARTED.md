# Getting started

The instructions below cover how to use Amsterdam React Maps (ARM) in a React application.

To simply render a Map in your application, this would be the bare minimum setup:

1. Install the core package: `npm install @amsterdam/arm-core`

2. Make sure you have the following peer dependencies installed:
`npm install @amsterdam/asc-assets @amsterdam/asc-ui leaflet styled-components`

If you want to install other packages, make sure you have the peer-dependencies installed as well. For example:
`arm-cluster` has an extra peer-dependency of `leaflet.markercluster`, so make sure you have that installed.

3. Add the following code to your application where you want to render the map, so it will look a bit like this:

```js
import 'leaflet/dist/leaflet.css' // make sure this is always included!
import { Map, BaseLayer, GeoJSON, ViewerContainer, Zoom } from '@amsterdam/arm-core'

const json = {
    type: 'Feature',
    properties: {
      name: 'Amsterdam',
    },
    geometry: {
      type: 'Point',
      coordinates: [52, 4],
    },
  }

const MyComponent = () => (
  <Map fullScreen>
    <GeoJSON args={[json]} />
    <ViewerContainer bottomRight={<Zoom />} />
    <BaseLayer />
  </Map>
)

export default MyComponent
```
And when you want to use mapInstance in a different component:

```js
...
import { useMapInstance } from '@amsterdam/arm-core';

const Search = () => (
    const mapInstance = useMapInstance();
    
    useEffect(() => {
      mapInstance.flyTo(x,y)
    }, [mapInstance])
)

export default Search
```
Check out more examples in [storybook](https://amsterdam.github.io/amsterdam-react-maps/#/) or [stories directory](https://github.com/Amsterdam/amsterdam-react-maps/tree/master/stories)
