// import { withKnobs, number, color, text } from '@storybook/addon-knobs'
import {
  Map,
  BaseLayer,
  WfsLayer,
  RDGeoJSON,
  constants,
} from '@amsterdam/arm-core'
import { DomEvent } from 'leaflet'
import { NonTiledLayer } from '@amsterdam/arm-nontiled'
import { GeoJSON } from '@amsterdam/react-maps'
import geoJSONStub from '../stubs/geoJSON.json'
import RDGeoJSONStub from '../stubs/rdGeoJSON.json'

export default {
  title: 'Other/Layers',
  // decorators: [withKnobs],
}

export const Wfs = {
  render: () => (
    <Map
      fullScreen
      options={{
        ...constants.DEFAULT_AMSTERDAM_MAPS_OPTIONS,
        zoom: 13,
        center: [52.3711013, 4.8893335],
      }}
    >
      <WfsLayer
        url="https://map.data.amsterdam.nl/maps/bag?REQUEST=Getfeature&VERSION=1.1.0&SERVICE=wfs&TYPENAME=ms:pand&srsName=EPSG:4326&outputformat=geojson"
        options={{
          onEachFeature: (feature, layer) => {
            layer.bindPopup(
              `<p>Id: ${feature.properties.id}</p><p>Display: ${feature.properties.display}</p>`,
            )

            layer.on('click', (e) => {
              DomEvent.stopPropagation(e)
              layer.openPopup()
            })
          },
        }}
        zoomLevel={{
          max: 13,
        }}
      />
      <BaseLayer />
    </Map>
  ),

  name: 'WFS',
}

export const GeoJsonRd = {
  render: () => (
    <Map fullScreen>
      <RDGeoJSON
        geometry={RDGeoJSONStub}
        options={{
          onEachFeature: (feature, layer) => {
            const popupContent = 'Layer popup text (set in onEachFeature)'
            layer.bindPopup(popupContent)
          },

          style: {
            color: '#ff0000',
            fillColor: '#ff00ff',

            weight: 2,

            opacity: 0.6,

            fillOpacity: 0.2,
          },
        }}
      />
      <BaseLayer />
    </Map>
  ),

  name: 'GeoJSON (RD)',
}

export const NonTiled = {
  render: () => (
    <Map fullScreen>
      <NonTiledLayer
        url="https://map.data.amsterdam.nl/maps/aardgasvrij?service=WMS&request=GetMap&version=1.1.1&layers=buurten%2Cbuurtinitiatieven%2Cbuurten_kookgas"
        options={{
          identify: false,
          format: 'image/png',
          transparent: true,
          layers: ['buurten', 'buurtinitiatieven', 'buurten_kookgas'],
        }}
      />
      <BaseLayer />
    </Map>
  ),

  name: 'NonTiled',
}

export const GeoJson = {
  render: () => (
    <Map
      fullScreen
      options={{
        ...constants.DEFAULT_AMSTERDAM_MAPS_OPTIONS,
        zoom: 14,
        center: [52.3711013, 4.8893335],
      }}
    >
      <GeoJSON
        args={[geoJSONStub]}
        options={{
          onEachFeature: (feature, layer) => {
            layer.bindPopup(
              `<p>Stadsdeel: ${feature.properties.stadsdeel}</p><p>Straatnaam: ${feature.properties.straatnaam}</p>`,
            )

            layer.on('click', (e) => {
              DomEvent.stopPropagation(e)
              layer.openPopup()
            })
          },
        }}
      />
      <BaseLayer />
    </Map>
  ),

  name: 'GeoJSON',
}
