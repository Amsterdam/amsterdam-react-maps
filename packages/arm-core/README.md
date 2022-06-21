# ARM Core

Part of Amsterdam React Maps library.

[This is the link to the story book demo site with examples](https://amsterdam.github.io/amsterdam-react-maps)

### Installation
Add this package to your project by running:
```bash
npm install --save @amsterdam/arm-core
```
### Usage

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

### Exports components
- Map: props options?, fullScreen?, setInstance?
- BaseLayerToggle
- ControlButton: extends Button
- MapPanel
- Scale: props options
- ViewerContainer: props bottomLeft?, topLeft?, topRight?, bottomRight?
- Marker: props latLng, options?, setInstance?
- Zoom: props tabIndexIn?, tabIndexOut?

### Exports leaflet layers
- BaseLayer: props baseLayer?, options?, setInstance?
- GeoJSON: props args, options?, setInstance?
- GeoJSONLayer: props url, options, setInstance?
- RDGeoJSON: props geometry, properties?, options?, setInstance?
- WfsLayer: props url, options, zoomLevel, setInstance?

### Exports hooks
- useMapInstance()
- useMapEvents(events?)
- useEvents(instance, events?)
- useGetAddressFromLatLng()
- usePanToLatLng()
- useStateRef()

### Exports services
- fetchWithAbort()
- getBBox(mapInstance)
- getCrsRd()

### Exports constants
- AMSTERDAM_MAPS_OPTIONS
- AMSTERDAM_LAYERS
- AERIAL_AMSTERDAM_LAYERS
- MIN_ZOOM_LEVEL
- MAX_ZOOM_LEVEL

