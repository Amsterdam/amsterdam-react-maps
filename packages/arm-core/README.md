# Amsterdam React Maps Core

[This is the link to the story book demo site with examples](https://amsterdam.github.io/amsterdam-react-maps)

### Installation
Add this package to your project by running:
- `npm install --save @amsterdam/arm-core`

### Exports components
- Map: props fullScreen, setInstance
- BaseLayerToggle
- ControlButton: extends Button
- MapPanel
- Scale: props options
- ViewerContainer: props bottomLeft, topLeft, topRight, bottomRight
- Marker: latLng, options, setInstance
- Zoom: props tabIndexInl, tabIndexOut

### Exports leaflet layers
- BaseLayer: props baseLayer, options, setInstance
- GeoJSON: props args, options, setInstance
- GeoJSONLayer: props url, options, setInstance
- RDGeoJSON: props geometry, properties, options, setInstance
- WfsLayer: props url, options, zoomLevel, setInstance

### Exports hooks
- useMapInstance
- useMapEvents
- useEvents
- useGetAddressFromLatLng
- usePanToLatLng
- useStateRef

### Exports services
- fetchWithAbort
- getBBox
- getCrsRd

### Exports constants
- AMSTERDAM_MAPS_OPTIONS
- AMSTERDAM_LAYERS,
- AERIAL_AMSTERDAM_LAYERS
- MIN_ZOOM_LEVEL
- MAX_ZOOM_LEVEL

