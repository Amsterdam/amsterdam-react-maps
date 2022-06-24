# ARM Cluster

Part of Amsterdam React Maps library.

[This is the link to the story book demo site with examples](https://amsterdam.github.io/amsterdam-react-maps)

### Installation
Add this package to your project by running:

```
npm install --save @amsterdam/arm-cluster
```

### Usage
```js
import 'leaflet/dist/leaflet.css' // make sure this is always included!
import { Map, BaseLayer, MarkerClusterGroup, ViewerContainer, Zoom } from '@amsterdam/arm-core'

const markers = []

const MyComponent = () => (
  <Map fullScreen>
    <MarkerClusterGroup markers={markers} />
    <ViewerContainer bottomRight={<Zoom />} />
    <BaseLayer />
  </Map>
)

export default MyComponent
```

### Exports component
- MarkerClusterGroup: props
  - markers
  - optionsOverrides?
  - events?
  - setInstance?

### Exports service
- createClusterMarkers(markers, events)
