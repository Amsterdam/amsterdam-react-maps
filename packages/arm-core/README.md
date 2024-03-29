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

```js
AMSTERDAM_MAPS_OPTIONS = {
  center: [52.3731081, 4.8932945],
  zoom: 10,
  maxZoom: 16,
  minZoom: 3,
  zoomControl: false,
  crs: getCrsRd(),
  maxBounds: [
    [52.25168, 4.64034],
    [52.50536, 5.10737],
  ],
}

AMSTERDAM_LAYERS =  [
  {
    id: 'normal',
    label: 'Normaal',
    urlTemplate: `${MAP_SERVER_ROOT}/topo_rd/{z}/{x}/{y}.png`,
  },
  {
    id: 'light',
    label: 'Licht',
    urlTemplate: `${MAP_SERVER_ROOT}/topo_rd_light/{z}/{x}/{y}.png`,
  },
  {
    id: 'blackwhite',
    label: 'Zwart / Wit',
    urlTemplate: `${MAP_SERVER_ROOT}/topo_rd_zw/{z}/{x}/{y}.png`,
  },
]
```
