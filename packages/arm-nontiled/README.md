# ARM Nontiled

Part of Amsterdam React Maps library.

[This is the link to the story book demo site with examples](https://amsterdam.github.io/amsterdam-react-maps)


### Installation
Add this package to your project by running:
```
npm install --save @amsterdam/arm-nontiled
```

### Usage
```js
import 'leaflet/dist/leaflet.css' // make sure this is always included!
import { Map, BaseLayer, ViewerContainer, Zoom } from '@amsterdam/arm-core'
import { NonTiledLayer } from '@amsterdam/arm-nontiled'

const url = "https://map.data.amsterdam.nl/maps/aardgasvrij?service=WMS&request=GetMap&version=1.1.1&layers=buurten%2Cbuurtinitiatieven%2Cbuurten_kookgas"

const MyComponent = () => (
  <Map fullScreen>
    <NonTiledLayer url={url} options={{
      identify: false,
      format: 'image/png',
      transparent: true,
      layers: ['buurten', 'buurtinitiatieven', 'buurten_kookgas']
    }} />
    <ViewerContainer bottomRight={<Zoom />} />
    <BaseLayer />
  </Map>
)

export default MyComponent
```

### Exports components
- NonTiledLayer: props
  - url
  - options
  - params?
  
